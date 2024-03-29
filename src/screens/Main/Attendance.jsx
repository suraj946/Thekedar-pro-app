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
import {workersData} from '../../components/SelectWorkerSection';
import WorkerCard2 from '../../components/WorkerCard2';
import {theme_secondary, white} from '../../styles/colors';

const Attendance = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [workerData, setWorkerData] = useState({});
  const handleSelectWorker = useCallback((wId, name, recordId) => {
    setWorkerData({workerId: wId, name, recordId});
    setMenuVisible(true);
  }, []);

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
            />
          )}
          keyExtractor={item => item._id}
        />
      </View>

      <AttendanceForm
        visible={menuVisible}
        setVisible={setMenuVisible}
        name={workerData.name}
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
});
