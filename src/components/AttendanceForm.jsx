import React, { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { addAttendance } from '../redux/actions/monthlyRecordAction';
import { info, theme_primary, white } from '../styles/colors';
import { DAYS, DEFAULT_ATTENDANCE_STATUS, FILTER_WORKER_FOR_ATTENDANCE, MONTH } from '../utils/constants';
import { validateWages } from '../utils/formValidator';
import { getCurrentNepaliDate } from '../utils/helpers';
import ContainedBtn from './ContainedBtn';
import Input from './Input';
import OutlinedBtn from './OutlinedBtn';
import SelectAttendanceStatus from './SelectAttendanceStatus';

const {dayDate, dayIndex, monthIndex} = getCurrentNepaliDate();
const wHeignt = Dimensions.get('window').height;

const AttendanceForm = ({
  visible = false,
  setVisible,
  workerId = '',
  workerName = '',
  recordId = '',
  wagesPerDay = '',
}) => {
  const [attendanceStatusModal, setAttendanceStatusModal] = useState(false);
  const [presenceStatus, setPresenceStatus] = useState(
    DEFAULT_ATTENDANCE_STATUS,
  );

  const [wagesOfDay, setWagesOfDay] = useState(wagesPerDay.toString());
  const [advanceAmount, setAdvanceAmount] = useState('');
  const [purposeOfAdvance, setPurposeOfAdvance] = useState('');
  const [wagesError, setWagesError] = useState('');
  const [advanceError, setAdvanceError] = useState('');

  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    setWagesOfDay(wagesPerDay.toString());
  }, [wagesPerDay]);

  useEffect(() => {
    setWagesOfDay(prev => {
      let toSet;
      if (presenceStatus === 'present') toSet = wagesPerDay;
      else if (presenceStatus === 'half') toSet = wagesPerDay * 0.5;
      else if (presenceStatus === 'absent') toSet = 0;
      else toSet = wagesPerDay * 1.5;

      return toSet.toString();
    });
  }, [presenceStatus]);

  const doAttendance = async() => {
    const isAllOk = validateInputs();
    if (!isAllOk) {
      return;
    }

    const wData = {
      workersData: [
        {
          workerName,
          workerId,
          recordId,
          wagesOfDay,
          advanceAmount,
          purposeOfAdvance,
        },
      ],
      presence: presenceStatus,
      dayDate,
    };

    setLoading(true);
    const response = await addAttendance(wData);
    setLoading(false);
    if(response === false) return;
    if(response[0].status === "rejected"){
      Alert.alert("Rejected", response[0].reason);
      return;
    }

    dispatch({type:FILTER_WORKER_FOR_ATTENDANCE, payload:workerId});
    dismissHandler();
  };

  const bottom = useSharedValue(0);
  const bottomStyle = useAnimatedStyle(() => ({
    bottom: withTiming(bottom.value, {duration: 250}),
  }));

  const dismissHandler = () => {
    if (loading) return;
    setVisible(false);
    setAdvanceAmount('');
    setAdvanceError('');
    setWagesError('');
    // setWagesOfDay("");
    setPurposeOfAdvance('');
    setPresenceStatus('present');
  };

  useEffect(() => {
    if (visible) {
      bottom.value = 0;
    } else {
      bottom.value = -wHeignt;
    }
  }, [visible]);

  useEffect(() => {
    const backAction = () => {
      if(visible) {
        if(!loading) {
          dismissHandler();
        }
        return true;
      }
    }
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [visible, loading]);

  return (
    <Animated.View style={[styles.container, bottomStyle]}>
      <TouchableOpacity
        onPress={dismissHandler}
        activeOpacity={0.9}
        style={{
          height: '20%',
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      />
      <View style={{height: '80%', width: '100%', backgroundColor: white}}>
        <View style={styles.dateView}>
          <Text
            style={
              styles.dateTxt
            }>{`${DAYS[dayIndex]}, ${dayDate} ${MONTH[monthIndex]}`}</Text>
          <Icon
            source={'calendar-month-outline'}
            size={moderateScale(25)}
            color={theme_primary}
          />
        </View>

        <View>
          <View style={styles.formView}>
            <View style={styles.attendanceStatusView}>
              <SelectAttendanceStatus
                visible={attendanceStatusModal}
                setVisible={setAttendanceStatusModal}
                value={presenceStatus}
                setValue={setPresenceStatus}
              />
              <Text style={styles.statusTxt}>{presenceStatus}</Text>
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
    </Animated.View>
  );
};

export default AttendanceForm;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
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
  dateView: {
    marginTop: verticalScale(20),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: white,
    borderRadius: moderateScale(40),
    elevation: 10,
    width: '90%',
    alignSelf: 'center',
  },
  dateTxt: {
    fontSize: moderateScale(23),
    textTransform: 'capitalize',
    color: theme_primary,
  },
  attendanceStatusView: {
    marginTop: verticalScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme_primary,
    width: '90%',
    alignSelf: 'center',
    borderRadius: moderateScale(10),
  },
  statusTxt: {
    fontSize: moderateScale(17),
    color: info,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    width: '50%',
    textAlign: 'center',
  },
  formView: {
    width: '100%',
    marginTop: verticalScale(10),
  },
});
