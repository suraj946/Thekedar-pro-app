import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Avatar, Icon, List, Menu} from 'react-native-paper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import BottomMenu from '../../components/BottomMenu';
import Header from '../../components/Header';
import {
  dark_light_l1,
  dark_light_l2,
  light,
  theme_primary,
  theme_secondary,
  white,
} from '../../styles/colors';
import {CONNECTION_ERROR, MONTH} from '../../utils/constants';
import instance from '../../utils/axiosInstance';
import { useErrorMessage } from '../../utils/hooks';
import DotsLoading from '../../components/DotsLoading';

// const worker = {
//   _id: '657af5a169a5a97d9cbfe5a4',
//   name: 'Ramesh Sah',
//   role: 'mistri',
//   thekedarId: '6572c79483f62bcfc1700020',
//   contactNumber: '9855641256',
//   address: 'Bariyarpur',
//   wagesPerDay: 1000,

//   joiningDate: {
//     year: 2080,
//     monthIndex: 7,
//     dayDate: 28,
//   },
//   isActive: true,
//   currentRecords: {
//     _id: {
//       $oid: '6580213607cceaf29f59d0e9',
//     },
//     prevAdvance: 0,
//     workerId: {
//       $oid: '657af5a169a5a97d9cbfe5a4',
//     },
//     lastSettlementDate: {
//       dayName: 'monday',
//       dayDate: 16,
//     },
//     __v: 35,
//     year: 2080,
//     monthIndex: 8,
//     prevWages: 0,
//     currentWages: 0,
//     currentAdvance: 0,
//     numberOfDays: 29,
//   },
// };

const WorkerProfile = ({navigation, route}) => {
  const {workerId} = route.params;
  const [expanded, setExpanded] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [worker, setWorker] = useState({});

  const handlePress = txt => {
    setExpanded(txt !== expanded ? txt : '');
  };

  const handleEdit = () => {
    setModalOpen(false);
    navigation.navigate('EditWorker', {workerId: worker._id});
  };

  useEffect(() => {
    (async()=>{
      try {
        setLoading(true);
        const {data} = await instance.get(`/worker/single/${workerId}`);
        if(data.success){
          setWorker(data.data);
        }
      } catch (error) {
        if(error.errorType !== CONNECTION_ERROR){
          setError(error.response?.data?.message);
        }
      }finally{
        setLoading(false);
      }
    })()
  }, []);

  useErrorMessage({error, setError});

  if(loading){
    return <View style={{
      flex:1,
      justifyContent:"center",
      alignItems:"center"
    }}>
      <DotsLoading/>
    </View>
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
        </View>

        <ScrollView style={{width: '95%'}} showsVerticalScrollIndicator={false}>
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
                title={`${worker.lastSettlementDate ? `${worker.monthRecord?.lastSettlementDate?.dayName} ${worker.monthRecord?.lastSettlementDate?.dayDate}` : "No settlement done in this month"}`}
              />
            </List.Accordion>
          </List.Section>
          <Text style={{color:dark_light_l2, marginTop:10, alignSelf:"center"}}>TODO: Create features for seeing calender</Text>
        </ScrollView>

        <BottomMenu
          visible={modalOpen}
          setVisible={setModalOpen}
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
            />
            <Menu.Item
              title={worker.isActive ? 'Mark Deactive' : 'Mark Active'}
              onPress={() => {
                console.log('ok');
              }}
              leadingIcon={worker.isActive ? 'human-male' : 'run'}
              style={{margin: 5, width: '90%'}}
            />
            <Menu.Item
              title={'Update Role'}
              onPress={() => {
                console.log('ok');
              }}
              leadingIcon={'cog-outline'}
              style={{margin: 5, width: '90%'}}
            />
            <Menu.Item
              title={'Update Wages'}
              onPress={() => {
                console.log('ok');
              }}
              leadingIcon={'currency-inr'}
              style={{margin: 5, width: '90%'}}
            />
            <Menu.Item
              title={'Delete Worker'}
              onPress={() => {
                console.log('ok');
              }}
              leadingIcon={'delete'}
              style={{margin: 5, width: '90%'}}
            />
          </View>
        </BottomMenu>
      </View>
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
    backgroundColor:white,
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
});
