import React, { memo, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { addAttendance } from '../redux/actions/monthlyRecordAction';
import {
  dark,
  dark_light_l2,
  light,
  success,
  theme_primary,
  theme_secondary
} from '../styles/colors';
import { DEFAULT_ATTENDANCE_STATUS, UPDATE_AFTER_ATTENDANCE, WAGES_FACTOR } from '../utils/constants';
import { useSelectionSystem } from '../utils/hooks';
import ContainedBtn from './ContainedBtn';
import OutlinedBtn from './OutlinedBtn';
import SelectAttendanceStatus from './SelectAttendanceStatus';
import WorkerCard from './WorkerCard';
import { getWorkers } from '../redux/actions/workerAction';
import { useNavigation } from '@react-navigation/native';

const SelectWorkerSection = () => {
  const { loading, workerForAttendance: workers } = useSelector(state => state.workers);
  const [attendanceStatus, setAttendanceStatus] = useState(
    DEFAULT_ATTENDANCE_STATUS,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const {
    count,
    deSelectSingle,
    selectSingle,
    selectAll,
    deselectAll,
    selectedItem,
  } = useSelectionSystem(workers);

  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const navigation = useNavigation();

  const doAttendance = async() => {
    const wagesFactor = WAGES_FACTOR[attendanceStatus];
    const filteredWorkers = workers.filter(w => selectedItem.has(w._id));
    const wData = filteredWorkers.map(w => ({
      wagesOfDay: wagesFactor * w.wagesPerDay,
      workerId: w._id,
      recordId: w.currentRecordId,
      workerName: w.name,
    }));

    setAttendanceLoading(true);
    const response = await addAttendance({
      workersData: wData,
      presence: attendanceStatus,
    });
    setAttendanceLoading(false);

    if(response === false){
      return;
    }

    dispatch({type: UPDATE_AFTER_ATTENDANCE, payload:[...selectedItem]});
    deselectAll();
    const rejectedMessage = response?.filter(d => d.status === "rejected").map(d => d.reason);
    if(rejectedMessage?.length > 0){
      Alert.alert("Rejected", rejectedMessage.join("\n"));
    }
  };  

  useEffect(() => {
    dispatch(getWorkers());
  }, []);

  if (loading || attendanceLoading) {
    return (
      <View style={{height: verticalScale(200), justifyContent: 'center'}}>
        <ActivityIndicator color={theme_primary} size={moderateScale(60)} />
      </View>
    );
  }

  if (workers?.length === 0) {
    return (
      <View style={styles.whenNoWorker}>
        <Icon
          source={'calendar-check'}
          size={moderateScale(60)}
          color={success}
        />
        <Text style={styles.textBold}>Attendance done for today</Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            If you want to edit worker's attendance then go to
          </Text>
          <Text style={styles.hightLightedText} onPress={() => navigation.navigate('WorkerCalendar')} > View Calendar</Text>
          <Text style={styles.text}>
            and select worker from the list and edit
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.subHeadTxt}>Attendance for today</Text>
      <View style={styles.selectActionView}>
        <Text style={{color: theme_primary, fontSize: moderateScale(17)}}>
          {count} Selected
        </Text>
        <View style={styles.selectIconsView}>
          <TouchableOpacity activeOpacity={0.8} onPress={deselectAll}>
            <Icon
              source={'check-circle-outline'}
              size={moderateScale(30)}
              color={theme_secondary}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={selectAll}>
            <Icon
              source={'check-circle'}
              size={moderateScale(30)}
              color={theme_secondary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {workers?.length > 0 &&
          workers.map(w => (
            <WorkerCard
              workerId={w._id}
              key={w._id}
              name={w.name}
              role={w.role}
              selectSingle={selectSingle}
              deSelectSingle={deSelectSingle}
              selected={selectedItem.has(w._id)}
              isAnySelected={count > 0}
            />
          ))}
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: moderateScale(5),
            alignItems: 'center',
          }}>
          <Text style={styles.attendanceTxt}>Status : {attendanceStatus}</Text>
          <OutlinedBtn
            title="Change Status"
            style={{width: '40%'}}
            handler={() => setIsModalVisible(true)}
          />
        </View>
        <ContainedBtn
          title={`mark all ${attendanceStatus}`}
          style={{marginTop: verticalScale(3)}}
          labelStyle={{textTransform: 'uppercase'}}
          handler={doAttendance}
          loading={attendanceLoading}
          disabled={count === 0}
        />
      </View>
      <SelectAttendanceStatus
        value={attendanceStatus}
        setValue={setAttendanceStatus}
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      />
    </View>
  );
};

export default memo(SelectWorkerSection);

const styles = StyleSheet.create({
  subHeadTxt: {
    color: dark,
    fontSize: moderateScale(20),
    marginTop: verticalScale(10),
  },
  selectActionView: {
    flexDirection: 'row',
    paddingHorizontal: scale(5),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectIconsView: {
    flexDirection: 'row',
    width: scale(60),
    justifyContent: 'space-between',
  },
  attendanceTxt: {
    color: theme_primary,
    backgroundColor: light,
    fontSize: moderateScale(17),
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(15),
    textTransform: 'uppercase',
  },

  whenNoWorker: {
    marginTop: verticalScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBold: {
    fontSize: moderateScale(25),
    fontWeight: '500',
    color: theme_primary,
  },
  textContainer: {
    marginTop: verticalScale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: dark_light_l2,
    fontSize: moderateScale(15),
    marginTop: verticalScale(5),
  },
  hightLightedText: {
    color: theme_secondary,
    backgroundColor: light,
    borderRadius: moderateScale(5),
    padding: moderateScale(7),
    paddingHorizontal: scale(10),
    fontSize: moderateScale(13),
    textTransform: 'capitalize',
    marginTop: verticalScale(5),
  },
});
