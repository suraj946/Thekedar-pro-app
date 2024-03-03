import React, { useCallback, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Header from '../../components/Header';
import { workersData } from '../../components/SelectWorkerSection';
import WorkerCard2 from '../../components/WorkerCard2';
import { theme_secondary, white } from '../../styles/colors';

const Settlement = ({navigation}) => {
  const [workerData, setWorkerData] = useState({});

  const handleSelectWorker = useCallback((wId, name, recordId) => {
    navigation.navigate("SettlementSummary", {wId, name, recordId});
  }, []);

  return (
    <SafeAreaView style={{flex:1}}>
      <Header headingText="Settlement" />
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

export default Settlement;

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
