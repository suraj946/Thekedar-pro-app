import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-paper';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Snackbar from 'react-native-snackbar';
import { useDispatch } from 'react-redux';
import ContainedBtn from '../../components/ContainedBtn';
import Header from '../../components/Header';
import Input from '../../components/Input';
import MyAlert from '../../components/MyAlert';
import OutlinedBtn from '../../components/OutlinedBtn';
import SelectAttendanceStatus from '../../components/SelectAttendanceStatus';
import { getMonthEvents } from '../../redux/actions/monthlyRecordAction';
import { danger, theme_primary, white } from '../../styles/colors';
import { sharedStyles } from '../../styles/styles';
import instance from '../../utils/axiosInstance';
import { CONNECTION_ERROR, MONTH } from '../../utils/constants';
import { validateWages } from '../../utils/formValidator';
import { defaultSnackbarOptions } from '../../utils/helpers';
import { useCurrentDate } from '../../utils/hooks';

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
    wagesPerDay
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
    setWagesError(wagesCheck.errorText);

    let forAdvance = true;
    if (advanceAmount?.trim() !== '') {
      const advanceCheck = validateWages(advanceAmount);
      setAdvanceError(advanceCheck.errorText);
      forAdvance = advanceCheck.isValid;
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

  useEffect(() => {
    setWagesOfDay(prev => {
      let toSet;
      if (presenceStatus === 'present') toSet = Number(wagesPerDay);
      else if (presenceStatus === 'half') toSet = Number(wagesPerDay) * 0.5;
      else if (presenceStatus === 'absent') toSet = 0;
      else toSet = Number(wagesPerDay) * 1.5;

      return toSet.toString();
    });
  }, [presenceStatus]);

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
