import React, { useCallback, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Icon } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import TabComponent from '../../components/TabComponent';
import WorkerCard2 from '../../components/WorkerCard2';
import {
  dark_light_l2,
  light,
  success,
  theme_primary,
  theme_secondary,
  white,
} from '../../styles/colors';

const Attendance = ({navigation}) => {
  const {workers, workerForAttendance: workersData} = useSelector(
    state => state.workers,
  );
  const [selectedTab, setSelectedTab] = useState('for-today');

  const handleSelectWorker = useCallback((wId, name, recordId, wpd, rest) => {
    navigation.navigate('AttendanceForm', {
      workerId: wId,
      workerName: name,
      recordId,
      numberOfDays: rest.records.numberOfDays,
      lastSettlementDate: rest.records.lastSettlementDate,
      wagesPerDay: wpd,
      selectedTab
    });
  }, [selectedTab]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header headingText="Attendance" />
      <StatusBar barStyle={'dark-content'} backgroundColor={white} />

      <View
        style={{flex: 1, backgroundColor: white, paddingHorizontal: scale(10)}}>
        <TabComponent
          style={{marginTop: verticalScale(5)}}
          tabs={[
            {value: 'for-today', text: 'For Today'},
            {value: 'for-left', text: 'For Left'},
          ]}
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
        />
        {selectedTab === 'for-today' && workersData?.length === 0 && (
          <View
            style={{
              width: '100%',
              height: '70%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              source={'calendar-check'}
              color={success}
              size={moderateScale(150)}
            />
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
              <Text style={styles.hightLightedText} onPress={() => navigation.navigate('WorkerCalendar')}> View Calendar</Text>
              <Text style={styles.text}>
                If you want to make left attendance then press
              </Text>
              <Text style={styles.hightLightedText} onPress={() => setSelectedTab('for-left')}>For Left</Text>
              {/* <Text style={styles.text}>tab</Text> */}
            </View>
          </View>
        )}
        <FlatList
          style={{marginTop: verticalScale(10)}}
          data={selectedTab === 'for-today' ? workersData : workers}
          renderItem={({item}) => (
            <WorkerCard2
              _id={item._id}
              name={item.name}
              handlePress={handleSelectWorker}
              role={item.role}
              currentRecordId={item.currentRecordId}
              wagesPerDay={item.wagesPerDay}
              records={item.records}
            />
          )}
          keyExtractor={item => item._id}
        />
      </View>
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
