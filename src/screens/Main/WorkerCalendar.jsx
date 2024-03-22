import {FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import { theme_secondary, white } from '../../styles/colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { workersData } from '../../components/SelectWorkerSection';
import WorkerCard2 from '../../components/WorkerCard2';

const WorkerCalendar = ({navigation}) => {
    const handleSelectWorker = (workerId, name, recordId) => {
        navigation.navigate("Calendar", {workerId, name, recordId})
    }
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header headingText="Calendar" />
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
    </SafeAreaView>
  );
};

export default WorkerCalendar;

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
