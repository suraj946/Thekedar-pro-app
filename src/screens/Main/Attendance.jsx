import React, {useCallback, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import AttendanceForm from '../../components/AttendanceForm';
import Header from '../../components/Header';
import WorkerCard2 from '../../components/WorkerCard2';
import {
  dark_light_l2,
  light,
  theme_primary,
  theme_secondary,
  white,
} from '../../styles/colors';
import {useSelector} from 'react-redux';
import {Avatar} from 'react-native-paper';

const Attendance = () => {
  const {workersData} = useSelector(state => state.workerForAttendance);
  const [menuVisible, setMenuVisible] = useState(false);
  const [workerData, setWorkerData] = useState({});
  const [wagesPerDay, setWagesPerDay] = useState();
  const handleSelectWorker = useCallback((wId, name, recordId, wpd) => {
    setWorkerData({workerId: wId, name, recordId});
    setWagesPerDay(wpd);
    setMenuVisible(true);
  }, []);

  if (workersData?.length === 0) {
    return (
      <View style={{flex: 1, backgroundColor: white,}}>
        <Header headingText="Attendance" />
        <View
          style={{
            width: '100%',
            height: '90%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Avatar.Icon icon={'check-bold'} size={moderateScale(100)} />
          <Text
            style={{
              color: theme_primary,
              fontSize: moderateScale(20),
              marginTop: verticalScale(12),
            }}>
            Attendance has been done for today
          </Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              If you want to edit worker's attendance then go to
            </Text>
            <Text style={styles.hightLightedText}> View Calendar</Text>
            <Text style={styles.text}>
              and select worker from the list and edit
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header headingText="Attendance" />
      <StatusBar barStyle={'dark-content'} backgroundColor={white} />

      <View
        style={{flex: 1, backgroundColor: white, paddingHorizontal: scale(10)}}>
        <Text style={styles.headingText}>Choose Worker</Text>

        <FlatList
          style={{marginTop: verticalScale(10)}}
          data={workersData}
          renderItem={({item}) => (
            <WorkerCard2
              _id={item._id}
              name={item.name}
              handlePress={handleSelectWorker}
              role={item.role}
              recordId={item.currentRecordId}
              wagesPerDay={item.wagesPerDay}
            />
          )}
          keyExtractor={item => item._id}
        />
      </View>

      <AttendanceForm
        visible={menuVisible}
        setVisible={setMenuVisible}
        workerName={workerData.name}
        wagesPerDay={wagesPerDay}
        workerId={workerData.workerId}
        recordId={workerData.recordId}
      />
    </SafeAreaView>
  );
};

export default Attendance;

const styles = StyleSheet.create({
  headingText: {
    color: white,
    fontSize: moderateScale(20),
    backgroundColor: theme_secondary,
    paddingVertical: verticalScale(5),
    textAlign: 'center',
    borderRadius: moderateScale(10),
    width: '100%',
    alignSelf: 'center',
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
