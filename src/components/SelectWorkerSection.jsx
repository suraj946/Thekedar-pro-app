import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import { Icon } from 'react-native-paper';
import WorkerCard from './WorkerCard';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { dark, dark_light_l1, light, theme_primary, theme_secondary } from '../styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addWorkerAll, addWorkerSingle, removeWorkerAll, removeWorkerSingle } from '../redux/slices/workerSlice';
import ContainedBtn from './ContainedBtn';
import OutlinedBtn from './OutlinedBtn';
import MyModal from './MyModal';

const workersData = [
    {
      name:"Worker 1",
      role:"mistri",
      _id:"okaykjdgj",
      isSelected:false
    },
    {
      name:"Worker 2",
      role:"labour",
      _id:"okaykddsjdgj",
      isSelected:false
    },
    {
      name:"Worker 3",
      role:"labour",
      _id:"okaykjiyedgj",
      isSelected:false
    },
    {
      name:"Worker 4",
      role:"mistri",
      _id:"okaykjdgjqw",
      isSelected:false
    },
    {
      name:"Worker 5",
      role:"mistri",
      _id:"okaykjdgjopqw",
      isSelected:false
    }
]

const SelectWorkerSection = () => {
    const [workers, setWorkers] = useState(workersData);
    const {selectedWorkers, count} = useSelector(state => state.selectedWorkers);
    const dispatch = useDispatch();
    const [attendanceStatus, setAttendanceStatus] = useState("present");
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const selectSingle = useCallback((wId) => {
        dispatch(addWorkerSingle(wId));
    }, [dispatch]);

    const deSelectSingle = useCallback((wId) => {
        dispatch(removeWorkerSingle(wId));
    }, [dispatch]);

    const selectAll = () => {
        dispatch(addWorkerAll(workers.map(w => w._id)));
    }

    const deselectAll = () => {
        dispatch(removeWorkerAll());
    }

    const doAttendance = () => {
        console.log("Attendance");
    }
  return (
    <View>
      <Text style={styles.subHeadTxt}>Attendance for today</Text>
      <View style={styles.selectActionView}>
        <Text style={{color: theme_primary, fontSize: moderateScale(17)}}>
          {count} Selected
        </Text>
        <View style={styles.selectIconsView}>
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
      <View>
        {workers?.length > 0 &&
          workers.map(w => (
            <WorkerCard
              workerId={w._id}
              key={w._id}
              name={w.name}
              role={w.role}
              selectSingle={selectSingle}
              deSelectSingle={deSelectSingle}
              selected={selectedWorkers.includes(w._id)}
            />
          ))}
      </View>
      <View>
        <View style={{flexDirection:"row", justifyContent:"space-between", padding:moderateScale(5)}}>
            <Text style={styles.attendanceTxt}>
                Mark as : {attendanceStatus}
            </Text>
            <OutlinedBtn 
                title='Change Status' 
                style={{width:"40%"}} 
                handler={() => setIsModalVisible(true)}
            />
        </View>
        <ContainedBtn 
            title={`mark all ${attendanceStatus}`} 
            style={{marginTop:verticalScale(3)}} 
            handler={doAttendance}
        />
        <MyModal visible={isModalVisible} setVisible={setIsModalVisible} heading='Select Attendance'>
            <Text style={{color:dark}}>Hi</Text>
        </MyModal>
      </View>
    </View>
  );
};

export default memo(SelectWorkerSection);

const styles = StyleSheet.create({
    subHeadTxt:{
        color:dark,
        fontSize: moderateScale(20),
        marginTop:verticalScale(10)
    },
    selectActionView:{
        flexDirection:"row",
        paddingHorizontal:scale(5),
        justifyContent:"space-between",
        alignItems:"center"
    },
    selectIconsView:{
        flexDirection:"row",
        width:scale(60),
        justifyContent:"space-between"
    },
    attendanceTxt:{
        color: dark_light_l1,
        backgroundColor: light,
        fontSize:moderateScale(18),
        borderRadius: moderateScale(20),
        padding:moderateScale(7),
    }
});
