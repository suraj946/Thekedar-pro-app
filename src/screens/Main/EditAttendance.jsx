import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {danger, theme_primary, white} from '../../styles/colors';
import Header from '../../components/Header';
import {useCurrentDate} from '../../utils/hooks';
import {CONNECTION_ERROR, MONTH} from '../../utils/constants';
import {Button, Icon} from 'react-native-paper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import SelectAttendanceStatus from '../../components/SelectAttendanceStatus';
import {sharedStyles} from '../../styles/styles';
import OutlinedBtn from '../../components/OutlinedBtn';
import Input from '../../components/Input';
import ContainedBtn from '../../components/ContainedBtn';
import {validateWages} from '../../utils/formValidator';
import instance from '../../utils/axiosInstance';
import Snackbar from 'react-native-snackbar';
import { defaultSnackbarOptions } from '../../utils/helpers';
import { useDispatch } from 'react-redux';
import { getMonthEvents } from '../../redux/actions/monthlyRecordAction';
import MyAlert from '../../components/MyAlert';

const EditAttendance = ({route, navigation}) => {
  const {monthIndex} = useCurrentDate();
  const {
    dayDate,
    day,
    presence,
    recordId,
    wagesOfDay: prevWages,
    advance,
    workerId,
  } = route.params;

  const [visible, setVisible] = useState(false);
  const [presenceStatus, setPresenceStatus] = useState(presence);
  const [loading, setLoading] = useState(false);
  const [wagesOfDay, setWagesOfDay] = useState(prevWages.toString());
  const [advanceAmount, setAdvanceAmount] = useState(
    advance ? advance.amount.toString() : '',
  );
  const [purposeOfAdvance, setPurposeOfAdvance] = useState(
    advance ? advance.purpose : '',
  );

  const [wagesError, setWagesError] = useState('');
  const [advanceError, setAdvanceError] = useState('');

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({});

  const dispatch = useDispatch();

  const validateInputs = () => {
    const wagesCheck = validateWages(wagesOfDay);
    if (wagesCheck.isValid) {
      setWagesError('');
    } else {
      setWagesError(wagesCheck.errorText);
    }

    let forAdvance = true;
    if (advanceAmount?.trim() !== '') {
      const advanceCheck = validateWages(advanceAmount);
      if (advanceCheck.isValid) {
        setAdvanceError('');
      } else {
        setAdvanceError(advanceCheck.errorText);
        forAdvance = false;
      }
    }
    return wagesCheck.isValid && forAdvance;
  };

  const updateAttendance = async () => {
    if (!validateInputs()) return;
    try {
      setLoading(true);
      const {data} = await instance.put(`/record/attendence/${recordId}`, {
        dayDate,
        presence: presenceStatus,
        wagesOfDay: Number(wagesOfDay),
        advanceAmount: Number(advanceAmount),
        advancePurpose: purposeOfAdvance,
      });
      if(data.success) {
        Snackbar.show(
          defaultSnackbarOptions(data.message),
        );
        dispatch(getMonthEvents(workerId, monthIndex));
        navigation.goBack();
      }
    } catch (error) {
      if (error.errorType !== CONNECTION_ERROR) {
        Snackbar.show(
          defaultSnackbarOptions(error.response?.data?.message, danger),
        );
      }
    }finally {
      setLoading(false);
    }
  };

  const deleteHandler = () => {
    setAlertVisible(true);
    setAlertData({
      title: 'Delete Attendance',
      message: 'Are you sure you want to delete this attendance?',
      icon: 'delete',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: async() => {
            try {
              setLoading(true);
              const {data} = await instance.delete(`/record/attendence/${recordId}?dayDate=${dayDate}`); 
              if(data.success) {
                Snackbar.show(
                  defaultSnackbarOptions(data.message),
                );
                dispatch(getMonthEvents(workerId, monthIndex));
                navigation.goBack();
              }
            } catch (error) {
              Snackbar.show(
                defaultSnackbarOptions(error.response?.data?.message, danger),
              );
            }finally {
              setLoading(false);
            }
          },
        },
      ],
    })
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <Header headingText="Edit Attendance"/>
      <MyAlert visible={alertVisible} setVisible={setAlertVisible} {...alertData}/>
      <View style={styles.container}>
        <View style={sharedStyles.dateView}>
          <Text
            style={
              sharedStyles.dateTxt
            }>{`${day}, ${dayDate} ${MONTH[monthIndex]}`}</Text>
          <Icon
            source={'calendar-month-outline'}
            size={moderateScale(25)}
            color={theme_primary}
          />
        </View>
        <View style={sharedStyles.attendanceStatusView}>
          <SelectAttendanceStatus
            setValue={setPresenceStatus}
            value={presenceStatus}
            visible={visible}
            setVisible={setVisible}
          />
          <Text style={sharedStyles.statusTxt}>{presenceStatus}</Text>
          <OutlinedBtn
            disabled={loading}
            title="Change"
            handler={() => setVisible(true)}
            style={{
              width: '50%',
              borderWidth: 0,
              borderLeftWidth: moderateScale(1.5),
              borderRadius: 0,
            }}
          />
        </View>
        <View style={{width: '90%', marginTop: verticalScale(20)}}>
          <Input
            label="Wages"
            placeholder="Wages of the day"
            keyboardType="number-pad"
            value={wagesOfDay}
            onChangeText={txt => setWagesOfDay(txt)}
            errorText={wagesError}
            disabled={loading}
          />
          <Input
            label="Advance"
            placeholder="Advance amount if taken"
            keyboardType="number-pad"
            value={advanceAmount}
            onChangeText={txt => setAdvanceAmount(txt)}
            errorText={advanceError}
            disabled={loading}
          />
          <Input
            label="Purpose"
            placeholder="Purpose of the advance"
            value={purposeOfAdvance}
            onChangeText={txt => setPurposeOfAdvance(txt)}
            disabled={loading}
          />

          <ContainedBtn
            title={`Mark ${presenceStatus}`}
            handler={updateAttendance}
            style={{marginTop: verticalScale(10)}}
            loading={loading}
          />

          <Button 
            mode='contained-tonal' 
            textColor={danger} 
            style={styles.deleteBtn}  
            onPress={deleteHandler}
          >Delete</Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditAttendance;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(5),
  },
  deleteBtn: {
    marginTop: verticalScale(50),
    width: "50%",
    alignSelf: "center",
  }
});
