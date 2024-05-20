import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import ContainedBtn from '../../components/ContainedBtn';
import Input from '../../components/Input';
import {
  danger,
  dark,
  dark_light_l1,
  info,
  light,
  success,
  theme_primary,
  white
} from '../../styles/colors';
import { validateWages } from '../../utils/formValidator';
import { defaultSnackbarOptions, getCurrentNepaliDate } from '../../utils/helpers';
import BottomMenu from '../../components/BottomMenu';
import OutlinedBtn from '../../components/OutlinedBtn';
import { checkAttendanceForToday } from '../../redux/actions/monthlyRecordAction';
import Snackbar from 'react-native-snackbar';
import MyAlert from '../../components/MyAlert';

const response = {
  prevWages: 10000,
  prevAdvance: 0,
  newCurrentWages: 20000,
  newCurrentAdvance: 1000,
  showForAdjustment: true,
  calculatedWages: 20000,
  calculatedAdvance: 1000,
  amount: 29000,
};

const todayDate = getCurrentNepaliDate().dayDate;

const SettlementSummary = ({route, navigation}) => {
  const {name, wId, recordId, records} = route.params;
  const [loading, setLoading] = useState(false);
  const [adjustLoading, setAdjustLoading] = useState(false);
  const [isSettled, setIsSettled] = useState(records.lastSettlementDate === todayDate);
  const [adjustmentAmount, setAdjustmentAmount] = useState('');
  const [adjustmentAmountError, setAdjustmentAmountError] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [toDateVal, setToDateVal] = useState({date:todayDate, error:""});
  const [toDate, setToDate] = useState(todayDate);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({});

  const handleAdjustAmount = () => {
    const checkAmount = validateWages(adjustmentAmount, 'Amount');
    if (!checkAmount.isValid) {
      setAdjustmentAmountError(checkAmount.errorText);
      return;
    }
    setAdjustmentAmountError('');
    console.log('All ok, Proceed to adjust');
  };

  const handleInputChange = (keyName, text) => {
    setToDateVal({...toDateVal, [keyName]: text});
  }
  const handleSetDate = () => {
    //using validateWages because it can also validate whether it is a number or not
    const checkToDate = validateWages(toDateVal.date, 'To-Date');
    if(!checkToDate.isValid){
      setToDateVal({...toDateVal, error:checkToDate.errorText});
      return;
    }
    if(Number(toDateVal.date) < records.lastSettlementDate+1 || Number(toDateVal.date) > todayDate){
      setToDateVal({...toDateVal, error:'Invalid date range given'});
      return;
    }
    setToDateVal({...toDateVal, error:''});
    setToDate(toDateVal.date);
    setModalVisible(false);
  }

  const performSettlement = async() => {
    setLoading(true);
    if(toDate === todayDate){
      const response = await checkAttendanceForToday(recordId);
      setLoading(false);
      if(response === "error") return;
      if(response === false){
        setAlertVisible(true);
        setAlertData({
          title: 'Warning',
          message: 'No attendance marked for today, mark it or settle upto previous date',
          icon: 'alert-circle-outline',
          cancellable: false,
          buttons: [
            {
              text: 'Reduce Date',
              onPress: () => {
                setModalVisible(true);
              },
            },
            {
              text: 'Mark Attendance',
              onPress: () => {
                navigation.navigate("Attendance");
              },
            },
          ],
        });
        return;
      }
    }

    //TODO: Perform settlement and show relevant information
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <StatusBar backgroundColor={theme_primary} barStyle={white} />
      <BottomMenu title='Set Date' visible={modalVisible} setVisible={setModalVisible}>
        <View style={{padding: moderateScale(15), paddingBottom: verticalScale(30)}}>
          <Input
            value={toDateVal.date.toString()}
            errorText={toDateVal.error}
            label='Date'
            placeholder={`from ${records.lastSettlementDate+1} to ${todayDate}`}
            keyboardType='numeric'
            onChangeText={(text) => handleInputChange("date", text)}
          />
          <ContainedBtn style={{marginTop: verticalScale(10)}} title='Set Date' handler={handleSetDate} />
        </View>
      </BottomMenu>
      <MyAlert visible={alertVisible} setVisible={setAlertVisible} {...alertData} />
      <View style={styles.topView}>
        <Text style={styles.topText}>{name}</Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
          paddingVertical: verticalScale(10),
          paddingHorizontal: scale(15),
          marginBottom: verticalScale(10),
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.settlementDateCont}>
          <Text
            style={{
              textAlign: 'center',
              color: dark_light_l1,
              fontSize: moderateScale(20),
            }}>{`Settlement (From - To)`}</Text>
          <View style={styles.dateStepperCont}>
            <View style={styles.line} />
            <Text style={styles.dateText}>{records.lastSettlementDate === 0 ? records.lastSettlementDate+1 : records.lastSettlementDate}</Text>
            <Text style={[styles.dateText, {right: 0}]}>{toDate}</Text>
          </View>
        </View>

        <StatusWithArrow
          valueBgColor={isSettled ? success : theme_primary}
          label="Status"
          value={isSettled ? 'Settled' : 'Not Settled'}
        />

        {!isSettled && (
          <View style={{marginTop: verticalScale(40)}}>
            <OutlinedBtn
              title='Change to date'
              handler={() => setModalVisible(true)}
              disabled={loading}
            />
            <ContainedBtn
              style={{marginTop: verticalScale(10)}}
              title="Settle Account"
              disabled={loading}
              handler={performSettlement}
            />
          </View>
        )}

        {loading ? (
          <ActivityIndicator size={moderateScale(60)} color={theme_primary} style={{marginTop:verticalScale(100)}}/>
        ) : (
          isSettled && (
            <View style={styles.container}>
              <PaymentStatus amount={response.amount} />

              <Section
                title={'Previous Details'}
                data={[
                  {heading: 'previous wages', amount: response.prevWages},
                  {heading: 'previous advance', amount: response.prevAdvance},
                ]}
              />
              <Section
                title={'Calculated Details'}
                data={[
                  {heading: 'current wages', amount: response.calculatedWages},
                  {
                    heading: 'current advance',
                    amount: response.calculatedWages,
                  },
                ]}
              />
              <Section
                title={'New Details'}
                data={[
                  {
                    heading: 'new current wages',
                    amount: response.newCurrentWages,
                  },
                  {
                    heading: 'new current advance',
                    amount: response.newCurrentAdvance,
                  },
                ]}
              />

              <View style={styles.section}>
                <Text style={styles.title}>Adjustment</Text>
                {response.showForAdjustment && (
                  <View style={styles.adjustmentSection}>
                    <Input
                      value={adjustmentAmount}
                      onChangeText={txt => setAdjustmentAmount(txt)}
                      errorText={adjustmentAmountError}
                      keyboardType="number-pad"
                      disabled={adjustLoading}
                      label="Given Amount"
                      placeholder="Amount given on settlement"
                    />
                    <ContainedBtn
                      style={{marginTop: verticalScale(5)}}
                      title="Adjust Amount"
                      loading={adjustLoading}
                      handler={handleAdjustAmount}
                    />
                  </View>
                )}
              </View>
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const StatusWithArrow = ({
  label = '',
  value = '',
  icon = 'greater-than',
  valueBgColor,
}) => {
  return (
    <View style={styles.arrowView}>
      <Text style={styles.txt}>{label}</Text>
      <Avatar.Icon
        icon={icon}
        color={theme_primary}
        size={moderateScale(30)}
        style={styles.avatar}
      />
      <Text style={[styles.arrowText, {backgroundColor: valueBgColor}]}>
        {value}
      </Text>
    </View>
  );
};

const PaymentStatus = ({amount}) => {
  const renderContent = () => {
    if (amount > 0) {
      return (
        <View style={[styles.paymentContainer, {backgroundColor: info}]}>
          <Text style={styles.paymentTitle}>Wages Remaining to Give</Text>
          <Text style={styles.amount}>Rs.{amount}</Text>
        </View>
      );
    } else if (amount < 0) {
      return (
        <View style={[styles.paymentContainer, {backgroundColor: danger}]}>
          <Text style={[styles.paymentTitle, {color: white}]}>
            Advance Occurred
          </Text>
          <Text style={[styles.amount, {color: white}]}>
            Rs.{Math.abs(amount)}
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={[styles.paymentContainer, {backgroundColor: theme_primary}]}>
          <Text style={[styles.paymentTitle, {color: white}]}>
            Account Settled
          </Text>
        </View>
      );
    }
  };

  return renderContent();
};

const Section = ({title, data = []}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <View style={{padding: moderateScale(10)}}>
        {data.map(d => (
          <View key={d.heading} style={styles.amountView}>
            <Text style={styles.amountHeading}>{d.heading}</Text>
            <Text style={styles.amount}>{d.amount}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SettlementSummary;

const styles = StyleSheet.create({
  topView: {
    backgroundColor: theme_primary,
    minHeight: verticalScale(30),
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    shadowColor: '#000',
    shadowOpacity: 0.32,
    shadowRadius: 15,
    elevation: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
  },
  topText: {
    color: light,
    fontSize: moderateScale(20),
  },
  settlementDateCont: {
    // backgroundColor:"green",
  },
  dateStepperCont: {
    position: 'relative',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: verticalScale(45),
  },
  dateText: {
    position: 'absolute',
    backgroundColor: '#ff0060',
    fontSize: moderateScale(17),
    paddingVertical: verticalScale(7),
    width: '20%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: white,
    borderRadius: moderateScale(5),
  },
  line: {
    height: 2,
    backgroundColor: theme_primary,
    width: '100%',
  },

  // ************ArrowView
  arrowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: moderateScale(20),
    textTransform: 'capitalize',
    color: dark_light_l1,
    textTransform: 'uppercase',
  },
  avatar: {
    backgroundColor: white,
    marginHorizontal: scale(2),
  },
  arrowText: {
    fontSize: moderateScale(20),
    textTransform: 'uppercase',
    backgroundColor: theme_primary,
    color: white,
    paddingHorizontal: scale(5),
    borderRadius: 3,
  },

  //*************************************************************
  container: {
    marginTop: verticalScale(10),
    paddingVertical: verticalScale(10),
    width: '100%',
  },
  section: {
    marginVertical: verticalScale(10),
    width: '100%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: theme_primary,
    borderRadius: moderateScale(5),
    borderTopWidth: 0,
  },
  amountView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountHeading: {
    fontSize: moderateScale(15),
    color: dark,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: moderateScale(18),
    color: light,
    alignSelf: 'center',
    textTransform: 'capitalize',
    backgroundColor: theme_primary,
    width: '100.5%',
    textAlign: 'center',
    borderTopLeftRadius: moderateScale(5),
    borderTopRightRadius: moderateScale(5),
    paddingVertical: verticalScale(3),
  },
  adjustmentSection: {
    padding: moderateScale(10),
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  amountTextStyle: {
    color: theme_primary,
  },

  ///Payment Status************************************************************* */
  paymentContainer: {
    padding: moderateScale(10),
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  paymentTitle: {
    fontSize: moderateScale(17),
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
    color: theme_primary,
  },
  amount: {
    fontSize: moderateScale(20),
    color: theme_primary,
  },
});
