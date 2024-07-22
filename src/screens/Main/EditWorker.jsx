import React, { useCallback, useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useDispatch } from "react-redux";
import ContainedBtn from '../../components/ContainedBtn';
import Header from '../../components/Header';
import Input from '../../components/Input';
import SelectRole from '../../components/SelectRole';
import { getWorkers, updateWorker } from '../../redux/actions/workerAction';
import {
  dark,
  info,
  white
} from '../../styles/colors';
import { DEFAULT_WORKER_ROLE, UPDATE_SINGLE_WORKER } from '../../utils/constants';
import {
  validateName,
  validatePhoneNumber,
  validateWages,
} from '../../utils/formValidator';
import { useGetWorker } from '../../utils/hooks';

const EditWorker = ({route, navigation}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState(DEFAULT_WORKER_ROLE);
  const [contactNumber, setContactNumber] = useState('');
  const [wagesPerDay, setWagesPerDay] = useState('');
  const [address, setAddress] = useState('');

  const [nameError, setNameError] = useState('');
  const [wagesPerDayError, setWagesPerDayError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const [selectRoleModal, setSelectRoleModal] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const dispatch = useDispatch();

  const setWorkerData = (worker) => {
    setName(worker.name);
    setRole(worker.role);
    setContactNumber(worker.contactNumber);
    setWagesPerDay(worker.wagesPerDay.toString());
    setAddress(worker.address);
  }
  const {prevData, loading} = useGetWorker(route.params.workerId, setWorkerData);

  const validateInputs = () => {
    const nameCheck = validateName(name, 'Worker Name');
    if (nameCheck.isValid) {
      setNameError('');
    } else {
      setNameError(nameCheck.errorText);
    }

    const wagesCheck = validateWages(wagesPerDay);
    if (wagesCheck.isValid) {
      setWagesPerDayError('');
    } else {
      setWagesPerDayError(wagesCheck.errorText);
    }

    let forContact = true;
    if (contactNumber?.trim() !== '') {
      const contactCheck = validatePhoneNumber(contactNumber);
      if (contactCheck.isValid) {
        setContactNumberError('');
      } else {
        setContactNumberError(contactCheck.errorText);
        forContact = false;
      }
    }
    return nameCheck.isValid && wagesCheck.isValid && forContact;
  };

  const updateWorkerHandler = async () => {
    if(!validateInputs()){
      return;
    }
    const data = { name, role, wagesPerDay: Number(wagesPerDay), contactNumber, address };
    const modifiedData = {};

    Object.keys(data).forEach((key) => {
      if (data[key] !== prevData[key]) {
        modifiedData[key] = data[key];
      }
    });

    if (Object.keys(modifiedData).length === 0) {
      return;
    }

    setUpdateLoading(true);
    const response = await updateWorker(route.params.workerId, modifiedData);

    if (response) {
      dispatch({ type: UPDATE_SINGLE_WORKER, payload: modifiedData });
      dispatch(getWorkers());
      navigation.goBack();
    }

    setUpdateLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{flex: 1, backgroundColor: white}}>
        <StatusBar barStyle={'dark-content'} backgroundColor={white} />
        <Header headingText="Edit Worker" />
          <ScrollView
            contentContainerStyle={{
              padding: moderateScale(10),
            }}
            showsVerticalScrollIndicator={false}>
            <Avatar.Icon
              icon={'account'}
              size={moderateScale(70)}
              style={{alignSelf: 'center', marginBottom: verticalScale(10)}}
            />
            <Input
              label="Worker name"
              placeholder="eg:John Doe"
              value={loading ? "Loading..." : name}
              onChangeText={useCallback(text => setName(text), [])}
              errorText={nameError}
              disabled={updateLoading}
            />
            <Input
              label="Wages Per Day"
              placeholder="Wages amount..."
              value={loading ? "Loading..." : wagesPerDay}
              onChangeText={useCallback(text => setWagesPerDay(text), [])}
              keyboardType="number-pad"
              errorText={wagesPerDayError}
              disabled={updateLoading}
            />
            <Input
              label="Contact Number"
              placeholder="eg:9XXXXXXXXX"
              value={loading ? "Loading..." : contactNumber}
              onChangeText={useCallback(text => setContactNumber(text), [])}
              keyboardType="number-pad"
              errorText={contactNumberError}
              disabled={updateLoading}
            />
            <Input
              label="Address"
              placeholder="eg:Singapore"
              value={loading ? "Loading..." : address}
              onChangeText={useCallback(text => setAddress(text), [])}
              disabled={updateLoading}
            />
            <TouchableOpacity
              disabled={updateLoading}
              activeOpacity={0.9}
              onPress={() => setSelectRoleModal(true)}>
              <Text style={{color: dark, fontSize: moderateScale(17)}}>
                Select Role
              </Text>
              <Text
                style={{
                  fontSize: moderateScale(20),
                  color: white,
                  textTransform: 'uppercase',
                  backgroundColor: info,
                  textAlign: 'center',
                  paddingVertical: verticalScale(7),
                  borderRadius: moderateScale(5),
                  textDecorationLine: 'underline',
                }}>
                {loading ? "Loading..." : role}
              </Text>
            </TouchableOpacity>
            <SelectRole
              value={role}
              setValue={setRole}
              visible={selectRoleModal}
              setVisible={setSelectRoleModal}
              statusBarColorRGBA="rgba(255, 255, 255, 0.6)"
            />
            <ContainedBtn
              loading={updateLoading}
              disabled={loading}
              title="Update Worker"
              handler={updateWorkerHandler}
              style={{
                borderRadius: moderateScale(5),
                marginTop: verticalScale(20),
              }}
            />
          </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default EditWorker;

// const styles = StyleSheet.create({
//   datePickerView: {
//     justifyContent: 'center',
//     width: '100%',
//   },
//   dateTxtView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   monthPickerBtn: {
//     backgroundColor: light,
//     width: '30%',
//     marginHorizontal: scale(10),
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: verticalScale(9),
//     alignSelf: 'flex-start',
//     position: 'relative',
//     marginTop: verticalScale(5),
//     borderRadius: moderateScale(5),
//   },
//   datePickerInput: {
//     width: '100%',
//   },
//   txt: {
//     color: dark,
//     fontSize: moderateScale(20),
//     textTransform: 'uppercase',
//     color: theme_primary,
//   },
// });
