import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Icon } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { dark_light_l2, info, theme_primary, white } from '../styles/colors';
import { DAYS, DEFAULT_ATTENDANCE_STATUS, MONTH } from '../utils/constants';
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
  name = '',
  recordId = '',
}) => {
  const [attendanceStatusModal, setAttendanceStatusModal] = useState(false);
  const [presenceStatus, setPresenceStatus] = useState(
    DEFAULT_ATTENDANCE_STATUS,
  );

  const [isAlreadyDone, setIsAlreadyDone] = useState(false);

  const [wagesOfDay, setWagesOfDay] = useState('');
  const [advanceAmount, setAdvanceAmount] = useState('');
  const [purposeOfAdvance, setPurposeOfAdvance] = useState('');

  const [wagesError, setWagesError] = useState('');
  const [advanceError, setAdvanceError] = useState('');

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

  const doAttendance = () => {
    const isAllOk = validateInputs();
    if (isAllOk) {
      console.log('All good');
    }
  };

  const bottom = useSharedValue(0);
  const bottomStyle = useAnimatedStyle(() => ({
    bottom: withTiming(bottom.value, {duration: 250}),
  }));

  const dismissHandler = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (visible) {
      bottom.value = 0;
    } else {
      bottom.value = -wHeignt;
    }
  }, [visible]);

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

        {isAlreadyDone ? (
          <View
            style={{
              width: '100%',
              height: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Avatar.Icon icon={'check-bold'} size={moderateScale(100)} />
            <Text
              style={{
                color: dark_light_l2,
                fontSize: moderateScale(20),
                marginTop: verticalScale(12),
              }}>
              Attendance has been done for today
            </Text>
          </View>
        ) : (
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
                />
                <Input
                  label="Advance"
                  placeholder="Advance amount if taken"
                  keyboardType="number-pad"
                  value={advanceAmount}
                  onChangeText={txt => setAdvanceAmount(txt)}
                  errorText={advanceError}
                />
                <Input
                  label="Purpose"
                  placeholder="Purpose of the advance"
                  value={purposeOfAdvance}
                  onChangeText={txt => setPurposeOfAdvance(txt)}
                />

                <ContainedBtn
                  title={`Mark ${presenceStatus}`}
                  handler={doAttendance}
                  style={{marginTop: verticalScale(10)}}
                />
              </View>
            </View>
          </View>
        )}
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
