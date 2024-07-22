import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Snackbar from 'react-native-snackbar';
import { useDispatch } from 'react-redux';
import ContainedBtn from '../../components/ContainedBtn';
import Header from '../../components/Header';
import Input from '../../components/Input';
import OutlinedBtn from '../../components/OutlinedBtn';
import SelectAttendanceStatus from '../../components/SelectAttendanceStatus';
import { addAttendance } from '../../redux/actions/monthlyRecordAction';
import { danger, info, theme_primary, white } from '../../styles/colors';
import instance from '../../utils/axiosInstance';
import {
  CONNECTION_ERROR,
  DAYS,
  DEFAULT_ATTENDANCE_STATUS,
  MONTH,
  UPDATE_AFTER_ATTENDANCE,
} from '../../utils/constants';
import { validateWages } from '../../utils/formValidator';
import { defaultSnackbarOptions, getDayIndex } from '../../utils/helpers';
import { useCurrentDate } from '../../utils/hooks';
import { sharedStyles } from '../../styles/styles';

const AttendanceForm = ({route, navigation}) => {
  const {
    workerId,
    workerName,
    recordId,
    numberOfDays,
    lastSettlementDate,
    wagesPerDay,
    selectedTab,
  } = route.params;
  const tabValue = 'for-left';

  const [attendanceStatusModal, setAttendanceStatusModal] = useState(false);
  const [presenceStatus, setPresenceStatus] = useState(
    DEFAULT_ATTENDANCE_STATUS,
  );

  const [wagesOfDay, setWagesOfDay] = useState(wagesPerDay.toString());
  const [advanceAmount, setAdvanceAmount] = useState('');
  const [purposeOfAdvance, setPurposeOfAdvance] = useState('');
  const [wagesError, setWagesError] = useState('');
  const [advanceError, setAdvanceError] = useState('');

  const [dayDateLeft, setDayDateLeft] = useState(
    (lastSettlementDate + 1).toString(),
  );
  const [dayDateLeftError, setDayDateLeftError] = useState('');

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {dayDate, monthIndex, dayIndex} = useCurrentDate();
  const [leftDayIndex, setLeftDayIndex] = useState(
    getDayIndex(dayDate, dayIndex, Number(dayDateLeft)),
  );

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

  const addLeftAttendance = async () => {
    if (!dayDateLeft) {
      setDayDateLeftError('Date is required');
      return;
    }
    if (isNaN(dayDateLeft)) {
      setDayDateLeftError('Invalid date');
      return;
    }
    const dayDate = Number(dayDateLeft);
    if (dayDate <= lastSettlementDate || dayDate > numberOfDays) {
      setDayDateLeftError(
        `Invalid date it should be between or equal ${
          lastSettlementDate + 1
        } and ${numberOfDays}`,
      );
      return;
    }
    setDayDateLeftError('');
    try {
      setLoading(true);
      const {data} = await instance.post(`/record/attendence/${recordId}`, {
        dayDate,
        presence: presenceStatus,
        wagesOfDay: Number(wagesOfDay),
        advanceAmount: Number(advanceAmount),
        purposeOfAdvance,
      });

      if (data.success) {
        Snackbar.show(defaultSnackbarOptions(data.message));
      }
    } catch (error) {
      if (error.errorType !== CONNECTION_ERROR) {
        Snackbar.show(
          defaultSnackbarOptions(error.response?.data?.message, danger),
        );
      }
    } finally {
      setLoading(false);
    }
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

  const doAttendance = async () => {
    const isAllOk = validateInputs();
    if (!isAllOk) {
      return;
    }

    if (selectedTab === tabValue) {
      await addLeftAttendance();
      return;
    }

    const wData = {
      workersData: [
        {
          workerName,
          workerId,
          recordId,
          wagesOfDay: Number(wagesOfDay),
          advanceAmount: Number(advanceAmount),
          purposeOfAdvance,
        },
      ],
      presence: presenceStatus,
    };

    setLoading(true);
    const response = await addAttendance(wData);
    setLoading(false);
    if (response === false) return;
    if (response[0].status === 'rejected') {
      Alert.alert('Rejected', response[0].reason);
      return;
    }
    dispatch({type: UPDATE_AFTER_ATTENDANCE, payload: [workerId]});
    navigation.goBack();
  };

  useEffect(() => {
    const backAction = () => {
      return loading;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [loading]);

  useEffect(() => {
    const date = Number(dayDateLeft);
    if(date <= lastSettlementDate || date > numberOfDays){
      setLeftDayIndex(-1);
      return;
    }
    const timeOut = setTimeout(() => {
      setLeftDayIndex(getDayIndex(dayDate, dayIndex, date));
    }, 100);
    return () => clearTimeout(timeOut);
  }, [dayDateLeft])
  
  return (
    <View style={styles.container}>
      <Header headingText={workerName} disableBack={loading} />
      <View style={{height: '80%', width: '100%', backgroundColor: white}}>
        <View style={sharedStyles.dateView}>
          {selectedTab === tabValue ? (
            <Text
              style={
                sharedStyles.dateTxt
              }>{`${leftDayIndex < 0 ? "__" : DAYS[leftDayIndex]}, ${dayDateLeft} ${MONTH[monthIndex]}`}</Text>
          ) : (
            <Text
              style={
                sharedStyles.dateTxt
              }>{`${DAYS[dayIndex]}, ${dayDate} ${MONTH[monthIndex]}`}</Text>
          )}
          <Icon
            source={'calendar-month-outline'}
            size={moderateScale(25)}
            color={theme_primary}
          />
        </View>

        <View>
          <View style={sharedStyles.formView}>
            <View style={sharedStyles.attendanceStatusView}>
              <SelectAttendanceStatus
                visible={attendanceStatusModal}
                setVisible={setAttendanceStatusModal}
                value={presenceStatus}
                setValue={setPresenceStatus}
              />
              <Text style={sharedStyles.statusTxt}>{presenceStatus}</Text>
              <OutlinedBtn
                disabled={loading}
                title="Change"
                handler={() => setAttendanceStatusModal(true)}
                style={{
                  width: '50%',
                  borderWidth: 0,
                  borderLeftWidth: moderateScale(1.5),
                  borderRadius: 0,
                }}
              />
            </View>

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                marginTop: verticalScale(20),
              }}>
              {selectedTab === tabValue && (
                <Input
                  label="Date"
                  placeholder="Enter date of the day"
                  keyboardType="number-pad"
                  value={dayDateLeft}
                  onChangeText={txt => setDayDateLeft(txt)}
                  errorText={dayDateLeftError}
                  disabled={loading}
                />
              )}
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
                handler={doAttendance}
                style={{marginTop: verticalScale(10)}}
                loading={loading}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AttendanceForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  headView: {
    width: '100%',
    height: verticalScale(50),
    backgroundColor: theme_primary,
    padding: moderateScale(10),
    borderBottomLeftRadius: moderateScale(25),
    borderBottomRightRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameStyle: {
    fontSize: moderateScale(25),
    color: white,
    fontWeight: 'bold',
  },
});
