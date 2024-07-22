import React, { useCallback } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import DotsLoading from '../../components/DotsLoading';
import Header from '../../components/Header';
import WorkerCard2 from '../../components/WorkerCard2';
import { dark_light_l2, theme_secondary, white } from '../../styles/colors';
import { useGetSettlementReadyWorkers } from '../../utils/hooks';

const Settlement = ({navigation}) => {
  const {loading, settlementReadyWorkers} = useGetSettlementReadyWorkers();

  const handleSelectWorker = useCallback((wId, name, recordId, _, rest) => {
    navigation.navigate('SettlementSummary', {wId, name, recordId, ...rest});
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header headingText="Settlement" />
      <StatusBar barStyle={'dark-content'} backgroundColor={white} />

      <View
        style={{flex: 1, backgroundColor: white, paddingHorizontal: scale(10)}}>
        <Text style={styles.headingText}>Choose Worker</Text>

        {loading ? (
          <DotsLoading text='Please wait' containerStyle={styles.forCenterView} />
        ) : (
          <FlatList
            style={{marginTop: verticalScale(10)}}
            data={settlementReadyWorkers}
            ListEmptyComponent={() => (
                <Text style={{fontSize: moderateScale(23), color:dark_light_l2, marginTop: verticalScale(200), alignSelf: 'center'}}>
                  No workers ready for settlement
                </Text>
            )}
            renderItem={({item}) => (
              // <WorkerCard2
              //   _id={item._id}
              //   name={item.name}
              //   handlePress={handleSelectWorker}
              //   role={item.role}
              //   recordId={item.currentRecordId}
              // />
              <WorkerCard2 handlePress={handleSelectWorker} {...item}/>
            )}
            keyExtractor={item => item._id}
          />
        )}
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
  forCenterView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
    flex:0.7,
  }
});
