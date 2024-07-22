import React, {useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
import WorkerCard2 from '../../components/WorkerCard2';
import {getWorkers} from '../../redux/actions/workerAction';
import {theme_secondary, white} from '../../styles/colors';
import DotsLoading from '../../components/DotsLoading';

const WorkerCalendar = ({navigation}) => {
  const {workers, loading} = useSelector(state => state.workers);
  const dispatch = useDispatch();
  const handleSelectWorker = (workerId, name, recordId) => {
    navigation.navigate('Calendar', {workerId, name, recordId});
  };
  const handleRefresh = () => {
    dispatch(getWorkers());
  };

  useEffect(() => {
    if (!workers.length) handleRefresh();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header headingText="Calendar" />
      <StatusBar barStyle={'dark-content'} backgroundColor={white} />

      <View
        style={{flex: 1, backgroundColor: white, paddingHorizontal: scale(10)}}>
        <Text style={styles.headingText}>Choose Worker</Text>

        {loading ? (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <DotsLoading />
        </View>
        ) : (
          <FlatList
            style={{marginTop: verticalScale(10)}}
            data={workers}
            renderItem={({item}) => (
              <WorkerCard2 {...item} handlePress={handleSelectWorker} />
            )}
            keyExtractor={item => item._id}
            refreshControl={
              <RefreshControl onRefresh={handleRefresh} refreshing={loading} />
            }
          />
        )}
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
