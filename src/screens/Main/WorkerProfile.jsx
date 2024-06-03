import React, { useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Avatar, Icon, List, Menu } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import BottomMenu from '../../components/BottomMenu';
import ContainedBtn from '../../components/ContainedBtn';
import DotsLoading from '../../components/DotsLoading';
import Header from '../../components/Header';
import MyAlert from '../../components/MyAlert';
import NotFound from '../../components/NotFound';
import OutlinedBtn from '../../components/OutlinedBtn';
import { deleteWorkers } from '../../redux/actions/workerAction';
import {
  danger,
  dark_light_l1,
  dark_light_l2,
  light,
  success,
  theme_primary,
  theme_secondary,
  white,
} from '../../styles/colors';
import {
  ADD_SINGLE_WORKER,
  MONTH,
  UPDATE_SINGLE_WORKER
} from '../../utils/constants';
import { useGetWorker, useWorkerStatusUpdate } from '../../utils/hooks';

const WorkerProfile = ({navigation, route}) => {
  const {workerId} = route.params;
  const [expanded, setExpanded] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const {worker} = useSelector(state => state.singleWorker);
  // const [updateLoading, setUpdateLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({});
  const {setUpdateLoading, updateStatus, updateLoading} =
    useWorkerStatusUpdate();

  const {loading} = useGetWorker(workerId, worker => {
    dispatch({type: ADD_SINGLE_WORKER, payload: worker});
  });

  const handlePress = txt => {
    setExpanded(txt !== expanded ? txt : '');
  };

  const handleEdit = () => {
    setModalOpen(false);
    navigation.navigate('EditWorker', {workerId: worker._id});
  };

  // const updateStatus = async () => {
  //   try {
  //     setUpdateLoading(true);
  //     const {data} = await instance.put(`/worker/updatestatus`, {
  //       activeStatus: !worker.isActive,
  //       workerId: worker._id,
  //     });
  //     if (data.success) {
  //       Snackbar.show(defaultSnackbarOptions(data.message));
  //       dispatch({
  //         type: UPDATE_SINGLE_WORKER,
  //         payload: {isActive: !worker.isActive, monthRecord: undefined},
  //       });
  //     }
  //   } catch (error) {
  //     if (error.errorType !== CONNECTION_ERROR) {
  //       Snackbar.show(
  //         defaultSnackbarOptions(error.response?.data?.message, danger),
  //       );
  //     }
  //   } finally {
  //     setUpdateLoading(false);
  //   }
  // };

  const handleStatusUpdate = () => {
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
            updateStatus(worker._id, !worker.isActive, () => {
              dispatch({
                type: UPDATE_SINGLE_WORKER,
                payload: {isActive: !worker.isActive, monthRecord: undefined},
              });
            });
          },
        },
      ],
    });
  };

  const handleDelete = () => {
    setAlertVisible(true);
    setAlertData({
      title: 'Delete Worker',
      message: 'This will delete the worker and records of him. Are you sure?',
      icon: 'delete',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: async () => {
            setUpdateLoading(true);
            const response = await deleteWorkers([worker._id]);
            setUpdateLoading(false);
            if (response) {
              navigation.goBack();
            }
          },
        },
      ],
    });
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <DotsLoading />
      </View>
    );
  }

  if (!worker) {
    return <NotFound text="worker" />;
  }

  return (
    <SafeAreaView style={{backgroundColor: theme_primary, flex: 1}}>
      <StatusBar backgroundColor={theme_primary} barStyle={'light-content'} />
      <Header
        style={{backgroundColor: theme_primary}}
        textAndIconColor={white}
        hasRight={true}
        rightIcon="dots-vertical"
        rightPressHandler={() => setModalOpen(true)}
      />
      <View style={styles.upperView}></View>
      {worker && (
        <View style={styles.lowerView}>
          <View style={styles.infoView}>
            <Text style={styles.nameTxt}>{worker.name}</Text>
            <Text style={styles.txt}>{worker.role}</Text>
            <View style={styles.textWithIcon}>
              <Icon
                source={'map-marker'}
                size={moderateScale(16)}
                color={dark_light_l2}
              />
              <Text style={[styles.txt, {marginLeft: scale(5)}]}>
                {worker.address}
              </Text>
            </View>
            <View style={styles.textWithIcon}>
              <Icon
                source={'cellphone'}
                size={moderateScale(16)}
                color={dark_light_l2}
              />
              <Text style={[styles.txt, {marginLeft: scale(5)}]}>
                {worker.contactNumber}
              </Text>
            </View>
            <Text
              style={{
                ...styles.activeTxt,
                color: worker.isActive ? success : danger,
              }}>
              {worker.isActive ? 'Active' : 'Deactivated'}
            </Text>
          </View>

          <ScrollView
            style={{width: '95%'}}
            showsVerticalScrollIndicator={false}>
            <List.Section title="More Details">
              <List.Accordion
                style={{backgroundColor: light}}
                title="Wages Per Day"
                expanded={expanded === 'wages-per-day'}
                onPress={() => handlePress('wages-per-day')}>
                <List.Item
                  titleStyle={{fontSize: moderateScale(20)}}
                  left={props => <List.Icon {...props} icon="currency-inr" />}
                  title={worker.wagesPerDay}
                />
              </List.Accordion>

              <List.Accordion
                style={{backgroundColor: light}}
                title="Joining Date"
                expanded={expanded === 'joining-date'}
                onPress={() => handlePress('joining-date')}>
                <List.Item
                  titleStyle={{
                    fontSize: moderateScale(20),
                    textTransform: 'uppercase',
                  }}
                  left={props => <List.Icon {...props} icon="calendar" />}
                  title={`${worker.joiningDate?.dayDate} ${
                    MONTH[worker.joiningDate?.monthIndex]
                  }, ${worker.joiningDate?.year}`}
                />
              </List.Accordion>

              {worker.monthRecord && (
                <List.Accordion
                  style={{backgroundColor: light}}
                  title="Current Month Details"
                  expanded={expanded === 'current-details'}
                  onPress={() => handlePress('current-details')}>
                  <List.Item
                    titleStyle={{
                      fontSize: moderateScale(18),
                      textTransform: 'capitalize',
                    }}
                    title={`Previous Wages : ₹ ${worker.monthRecord?.prevWages}`}
                  />
                  <List.Item
                    titleStyle={{
                      fontSize: moderateScale(18),
                      textTransform: 'capitalize',
                    }}
                    title={`Previous Advance : ₹ ${worker.monthRecord?.prevAdvance}`}
                  />
                  <List.Item
                    titleStyle={{
                      fontSize: moderateScale(18),
                      textTransform: 'capitalize',
                    }}
                    title={`Current Wages : ₹ ${worker.monthRecord?.currentWages}`}
                  />
                  <List.Item
                    titleStyle={{
                      fontSize: moderateScale(18),
                      textTransform: 'capitalize',
                    }}
                    title={`Current Advance : ₹ ${worker.monthRecord?.currentAdvance}`}
                  />
                </List.Accordion>
              )}

              <List.Accordion
                style={{backgroundColor: light}}
                title="Last Settlement Date"
                expanded={expanded === 'settlement-date'}
                onPress={() => handlePress('settlement-date')}>
                <List.Item
                  titleStyle={{
                    fontSize: moderateScale(20),
                    textTransform: 'uppercase',
                  }}
                  left={props => <List.Icon {...props} icon="calendar" />}
                  title={`${
                    worker.monthRecord?.lastSettlementDate
                      ? `${worker.monthRecord?.lastSettlementDate?.dayName} ${worker.monthRecord?.lastSettlementDate?.dayDate}`
                      : 'No settlement done in this month'
                  }`}
                />
              </List.Accordion>
            </List.Section>

            {worker.isActive && (
              <View style={styles.bottomView}>
                {!worker.monthRecord ? (
                  <View>
                    <View style={styles.warningView}>
                      <Avatar.Icon
                        icon={'alert'}
                        size={moderateScale(40)}
                        style={{backgroundColor: white}}
                        color={danger}
                      />
                      <Text style={styles.noRecText}>No Record Found</Text>
                    </View>
                    <ContainedBtn
                      title="Create Record"
                      handler={() =>
                        navigation.navigate('CreateRecordForm', {
                          workerId: worker._id,
                        })
                      }
                      style={{
                        backgroundColor: success,
                        width: '50%',
                        marginTop: verticalScale(10),
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                ) : (
                  <OutlinedBtn
                    title="View Current Record"
                    handler={() =>
                      navigation.navigate('Calendar', {
                        workerId: worker._id,
                        recordId: worker.monthRecord._id,
                        name: worker.name,
                      })
                    }
                  />
                )}
              </View>
            )}
          </ScrollView>

          <BottomMenu
            visible={modalOpen}
            setVisible={setModalOpen}
            notToClose={updateLoading}
            title="Actions">
            <View
              style={{
                width: '100%',
                padding: moderateScale(10),
                alignItems: 'center',
              }}>
              <Menu.Item
                title={'Edit Worker'}
                onPress={handleEdit}
                leadingIcon={'pencil'}
                style={{margin: 5, width: '90%'}}
                disabled={updateLoading}
              />
              <Menu.Item
                title={worker.isActive ? 'Deactivate' : 'Activate'}
                onPress={handleStatusUpdate}
                leadingIcon={worker.isActive ? 'human-male' : 'run'}
                style={{margin: 5, width: '90%'}}
                disabled={updateLoading}
              />
              <Menu.Item
                title={'Delete Worker'}
                onPress={handleDelete}
                leadingIcon={'delete'}
                style={{margin: 5, width: '90%'}}
                disabled={updateLoading}
              />
              <ActivityIndicator
                size="large"
                style={{marginTop: verticalScale(5)}}
                animating={updateLoading}
                color={theme_primary}
              />
            </View>
          </BottomMenu>
          <MyAlert
            visible={alertVisible}
            setVisible={setAlertVisible}
            {...alertData}
          />
        </View>
      )}
      <View style={styles.avatarContainer}>
        <Avatar.Icon
          icon={'account'}
          size={moderateScale(103)}
          style={{backgroundColor: theme_secondary}}
        />
      </View>
    </SafeAreaView>
  );
};

export default WorkerProfile;

const styles = StyleSheet.create({
  upperView: {
    height: verticalScale(50),
    alignItems: 'center',
  },
  avatarContainer: {
    alignSelf: 'center',
    position: 'absolute',
    top: verticalScale(35),
    backgroundColor: theme_primary,
    padding: moderateScale(5),
    borderRadius: moderateScale(100),
    width: scale(100),
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerView: {
    backgroundColor: white,
    flex: 1,
    alignItems: 'center',
  },
  infoView: {
    marginTop: verticalScale(55),
    alignItems: 'center',
  },
  nameTxt: {
    color: dark_light_l1,
    fontSize: moderateScale(25),
    textTransform: 'uppercase',
    fontWeight: '400',
    marginBottom: verticalScale(5),
  },
  txt: {
    color: dark_light_l2,
    fontSize: moderateScale(18),
    textTransform: 'capitalize',
  },
  textWithIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(5),
  },
  bottomView: {
    padding: verticalScale(10),
  },
  warningView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(10),
    elevation: 5,
    backgroundColor: white,
    padding: verticalScale(4),
    borderRadius: moderateScale(5),
  },
  noRecText: {
    fontSize: moderateScale(18),
    color: dark_light_l1,
    marginLeft: scale(10),
  },
  activeTxt: {
    margin: moderateScale(5),
    fontSize: moderateScale(20),
  },
});
