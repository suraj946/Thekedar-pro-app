import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Icon, Searchbar, SegmentedButtons } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import DotsLoading from '../../components/DotsLoading';
import Header from '../../components/Header';
import WorkerCard from '../../components/WorkerCard';
import { deleteWorkers, getWorkers } from '../../redux/actions/workerAction';
import {
  dark,
  dark_light_l1,
  success,
  theme_primary,
  theme_secondary,
  white,
} from '../../styles/colors';
import { useSelectionSystem } from '../../utils/hooks';
import MyAlert from '../../components/MyAlert';

const Workers = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [tabValue, setTabValue] = useState('active');
  const [refreshing, setRefreshing] = useState(false);

  const {loading, workers, nonActiveWorkers, activeFetched, nonActiveFetched} =
    useSelector(state => state.workers);
  const dispatch = useDispatch();
  const [workersData, setWorkersData] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);

  const {
    selectSingle,
    deSelectSingle,
    selectAll,
    deselectAll,
    count,
    selectedItem,
  } = useSelectionSystem(workersData);

  const handleEditWorker = () => {
    const [first] = selectedItem;
    navigation.navigate('EditWorker', {workerId: first});
  };
  const handleDelete = () => {
    const workerIds = [...selectedItem];
    setAlertVisible(true);
    setAlertData({
      title: 'Delete Worker',
      message: 'This will delete the selected workers and records of them. Are you sure?',
      icon: 'delete',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: async() => {
            setDeleteLoading(true);
            const response = await deleteWorkers(workerIds);
            setDeleteLoading(false);
            if(response){
              if(tabValue === 'active'){
                dispatch(getWorkers());
              }else{
                dispatch(getWorkers(false));
              }
              //to clear selected items
              deselectAll();
            }
          },
        },
      ],
    })

  };

  const iconAni = useSharedValue(0);
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{scale: iconAni.value}],
  }));

  const handleOnRefresh = () => {
    setRefreshing(true);
    if (tabValue === 'active') {
      dispatch(getWorkers());
    } else {
      dispatch(getWorkers(false));
    }
    setRefreshing(false);
  };

  useEffect(() => {
    iconAni.value = withTiming(1, {duration: 400});
  }, []);

  useEffect(() => {
    if (tabValue === 'active') {
      if (!activeFetched) {
        dispatch(getWorkers());
      } else {
        setWorkersData(workers);
      }
    } else {
      if (!nonActiveFetched) {
        dispatch(getWorkers(false));
      } else {
        setWorkersData(nonActiveWorkers);
      }
    }
  }, [tabValue, activeFetched, nonActiveFetched, workers, nonActiveWorkers]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let temp;
      if (tabValue === 'active') {
        temp = workers.filter(w =>
          w.name?.toLowerCase()?.includes(search.toLowerCase()),
        );
      } else {
        temp = nonActiveWorkers.filter(w =>
          w.name?.toLowerCase()?.includes(search.toLowerCase()),
        );
      }
      setWorkersData(temp);
    }, 100);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={white} barStyle={'dark-content'} />
      <Header headingText="Workers" />
      <MyAlert
        visible={alertVisible}
        setVisible={setAlertVisible}
        {...alertData}
        cancellable={!deleteLoading}
      />
      {loading || deleteLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <DotsLoading />
        </View>
      ) : (
        <>
          <Searchbar
            inputStyle={{
              minHeight: 0,
            }}
            style={{
              width: '95%',
              alignSelf: 'center',
              borderRadius: moderateScale(5),
              marginTop: verticalScale(5),
              height: verticalScale(35),
            }}
            placeholder="Search by name"
            value={search}
            onChangeText={text => setSearch(text)}
          />
          <View style={styles.tabView}>
            <SegmentedButtons
              value={tabValue}
              onValueChange={setTabValue}
              buttons={[
                {
                  value: 'active',
                  label: 'Active',
                  checkedColor: theme_primary,
                },
                {
                  value: 'non-active',
                  label: 'Non Active',
                  checkedColor: theme_primary,
                },
              ]}
            />
          </View>

          {workersData.length > 0 && (
            <View style={styles.selectActionView}>
              <Text style={{color: theme_primary, fontSize: moderateScale(17)}}>
                {count} Selected
              </Text>
              <View style={styles.selectIconsView}>
                {count === 1 && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleEditWorker}>
                    <Icon
                      source={'pencil'}
                      size={moderateScale(30)}
                      color={theme_secondary}
                    />
                  </TouchableOpacity>
                )}

                {count > 0 && (
                  <TouchableOpacity activeOpacity={0.8} onPress={handleDelete}>
                    <Icon
                      source={'delete'}
                      size={moderateScale(30)}
                      color={theme_secondary}
                    />
                  </TouchableOpacity>
                )}
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
          )}
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleOnRefresh}
              />
            }
            style={{
              paddingHorizontal: scale(5),
              marginBottom: verticalScale(10),
            }}
            data={workersData}
            renderItem={({item}) => (
              <WorkerCard
                workerId={item._id}
                name={item.name}
                role={item.role}
                selected={selectedItem.has(item._id)}
                selectSingle={selectSingle}
                deSelectSingle={deSelectSingle}
                isAnySelected={count > 0}
              />
            )}
            ListEmptyComponent={
              <View style={styles.noWorkerView}>
                {tabValue === 'active' ? (
                  <>
                    <Text style={styles.txtBig}>No workers to show</Text>
                    <Text style={styles.txtSmall}>
                      Create workers by clicking the plus button below
                    </Text>
                  </>
                ) : (
                  <Text
                    style={{
                      ...styles.txtBig,
                      paddingHorizontal: scale(10),
                    }}>
                    No non active workers to show
                  </Text>
                )}
              </View>
            }
            keyExtractor={item => item._id}
          />
          <Animated.View style={[styles.plusIconStyle, iconStyle]}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('AddWorker')}>
              <Avatar.Icon
                icon={'plus'}
                style={{backgroundColor: success}}
                size={moderateScale(70)}
              />
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Workers;

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
  },
  selectActionView: {
    marginTop: verticalScale(5),
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectIconsView: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-around',
  },
  plusIconStyle: {
    position: 'absolute',
    bottom: verticalScale(30),
    backgroundColor: success,
    right: scale(30),
    zIndex: 10,
    shadowColor: dark,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
    borderRadius: moderateScale(40),
  },
  tabView: {
    marginHorizontal: scale(10),
    marginVertical: verticalScale(10),
  },
  noWorkerView: {
    height: verticalScale(400),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBig: {
    color: dark_light_l1,
    fontSize: moderateScale(25),
    marginBottom: verticalScale(5),
    fontWeight: '400',
  },
  txtSmall: {
    color: theme_primary,
    fontSize: moderateScale(16),
  },
});
