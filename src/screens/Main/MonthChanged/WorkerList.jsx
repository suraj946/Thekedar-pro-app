import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Snackbar from 'react-native-snackbar';
import { useDispatch, useSelector } from 'react-redux';
import BottomMenu from '../../../components/BottomMenu';
import ContainedBtn from '../../../components/ContainedBtn';
import DotsLoading from '../../../components/DotsLoading';
import HomeDrawer from '../../../components/HomeDrawer';
import MonthChangedModal from '../../../components/MonthChangedModal';
import MyAlert from '../../../components/MyAlert';
import OutlinedBtn from '../../../components/OutlinedBtn';
import WorkerCard2 from '../../../components/WorkerCard2';
import {
  dark,
  dark_light_l2,
  theme_primary,
  white,
} from '../../../styles/colors';
import { deleteAppOpenDate, getAppOpenDate, setAppOpenDate } from '../../../utils/asyncStorage';
import instance from '../../../utils/axiosInstance';
import {
  ADD_WORKER_FOR_NEW_RECORD,
  CONNECTION_ERROR,
  UPDATE_WORKER_FOR_NEW_RECORD,
} from '../../../utils/constants';
import {
  defaultSnackbarOptions,
  getCurrentNepaliDate,
} from '../../../utils/helpers';
import { useWorkerStatusUpdate } from '../../../utils/hooks';

const {dayDate} = getCurrentNepaliDate();

const WorkerList = ({navigation}) => {
  const {thekedar} = useSelector(state => state.thekedar);
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {workers} = useSelector(state => state.workersForNewRecord);
  const dispatch = useDispatch();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({});
  const {updateStatus, updateLoading} = useWorkerStatusUpdate();

  const handlePress = useCallback((wId, ..._) => {
    setSelectedWorker(wId);
    setOptionModalVisible(true);
  }, []);

  const getWorkers = async () => {
    try {
      setLoading(true);
      const {data} = await instance.get('/thekedar/newmontharrival');
      if (data.success) {
        dispatch({
          type: ADD_WORKER_FOR_NEW_RECORD,
          payload: data.data?.workers,
        });
      }
    } catch (error) {
      if (error.errorType !== CONNECTION_ERROR) {
        Snackbar.show(
          defaultSnackbarOptions(error.response?.data?.message, danger),
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = useCallback(async () => {
    setRefresh(true);
    await getWorkers();
    setRefresh(false);
  }, []);

  const handleDeactivate = () => {
    setAlertVisible(true);
    setAlertData({
      title: 'Update Status',
      message: 'Are you sure you want to update worker status?',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: () => {
            updateStatus(selectedWorker, false, () => {
              dispatch({
                type: UPDATE_WORKER_FOR_NEW_RECORD,
                payload: selectedWorker,
              });
              setOptionModalVisible(false);
            });
          },
        },
      ],
    });
  };

  useEffect(() => {
    (async () => {
      const prevAppOpenDate = await getAppOpenDate(thekedar._id?.toString());
      if (!prevAppOpenDate) {
        setModalVisible(true);
        await setAppOpenDate(dayDate, thekedar._id?.toString());
        return;
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await getWorkers();
    })();
  }, []);

  useEffect(() => {
    (async() => {
      if(workers.length === 0){
        await deleteAppOpenDate(thekedar._id?.toString());
      }
    })()
  }, [workers.length]);
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <MyAlert
        visible={alertVisible}
        setVisible={setAlertVisible}
        {...alertData}
      />
      <MonthChangedModal visible={modalVisible} setVisible={setModalVisible} />
      <HomeDrawer
        visible={drawerOpen}
        setVisible={setDrawerOpen}
        showProfile={false}
      />
      <BottomMenu
        visible={optionModalVisible}
        setVisible={setOptionModalVisible}
        title="Select Action"
        notToClose={updateLoading}>
        <View style={styles.modalContainer}>
          <OutlinedBtn
            title="Create Record"
            handler={() => {
              setOptionModalVisible(false);
              navigation.navigate('CreateRecordForm', {
                workerId: selectedWorker,
              });
            }}
            disabled={updateLoading}
          />
          <OutlinedBtn
            title="Deactivate"
            handler={handleDeactivate}
            loading={updateLoading}
          />
        </View>
      </BottomMenu>
      {loading ? (
        <View
          style={{
            height: '80%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <DotsLoading text="Loading workers" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <TouchableOpacity
              onPress={() => setDrawerOpen(true)}
              activeOpacity={0.9}
              style={styles.icon}>
              <Icon
                source={'menu'}
                size={moderateScale(40)}
                color={theme_primary}
              />
            </TouchableOpacity>
            <Text style={styles.headingTxt}>Worker List</Text>
          </View>
          {workers && workers.length > 0 && (
            <Text style={styles.infoText}>
              Please create a new record for each worker by clicking on their
              name or deactivate them
            </Text>
          )}
          <FlatList
            data={workers}
            renderItem={({item}) => (
              <WorkerCard2 {...item} handlePress={handlePress} />
            )}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View>
                <Text style={styles.noWorkerText}>No Worker Left</Text>
                <ContainedBtn
                  style={styles.reloadBtn}
                  title="Please Reopen App"
                  handler={() => {}}
                />
              </View>
            )}
            onRefresh={handleRefresh}
            refreshing={refresh}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default WorkerList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(10),
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    left: 5,
  },
  headingTxt: {
    color: dark,
    fontSize: moderateScale(20),
    paddingVertical: verticalScale(5),
    textAlign: 'center',
  },
  infoText: {
    color: dark_light_l2,
    fontSize: moderateScale(15),
    paddingVertical: verticalScale(8),
    textAlign: 'center',
    paddingHorizontal: scale(10),
  },
  noWorkerText: {
    fontSize: moderateScale(30),
    color: dark_light_l2,
    marginTop: verticalScale(200),
    alignSelf: 'center',
  },
  modalContainer: {
    padding: moderateScale(10),
    width: '90%',
    alignSelf: 'center',
    // backgroundColor: "red",
    height: verticalScale(120),
    justifyContent: 'space-evenly',
  },
  reloadBtn: {marginTop: verticalScale(20), width: '90%', alignSelf: 'center'},
});
