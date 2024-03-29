import React, { useCallback, useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import ContainedBtn from '../../components/ContainedBtn';
import Header from '../../components/Header';
import Input from '../../components/Input';
import SelectRole from '../../components/SelectRole';
import {
  dark,
  info,
  light,
  theme_primary,
  white
} from '../../styles/colors';
import { DEFAULT_WORKER_ROLE } from '../../utils/constants';
import { validateName, validatePhoneNumber, validateWages } from '../../utils/formValidator';

const EditWorker = ({route}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState(DEFAULT_WORKER_ROLE);
  const [contactNumber, setContactNumber] = useState('');
  const [wagesPerDay, setWagesPerDay] = useState('');
  const [address, setAddress] = useState('');

  const [nameError, setNameError] = useState('');
  const [wagesPerDayError, setWagesPerDayError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const [selectRoleModal, setSelectRoleModal] = useState(false);

  console.log(route.params.workerId);

  const validateInputs = () => {
    const nameCheck = validateName(name, "Worker Name");
    if(nameCheck.isValid){
      setNameError("");
    }else{
      setNameError(nameCheck.errorText);
    }

    const wagesCheck = validateWages(wagesPerDay);
    if(wagesCheck.isValid){
      setWagesPerDayError("");
    }else{
      setWagesPerDayError(wagesCheck.errorText);
    }

    let forContact = true;
    if(contactNumber?.trim() !== ""){
      const contactCheck = validatePhoneNumber(contactNumber);
      if(contactCheck.isValid){
        setContactNumberError("");
      }else{
        setContactNumberError(contactCheck.errorText);
        forContact = false;
      }
    }
    return nameCheck.isValid && wagesCheck.isValid && forContact;
  }

  const updateWorkerHandler = () => {
    const isAllOk = validateInputs();
    if(isAllOk){
      console.log("Working Fine");
    }
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
            value={name}
            onChangeText={useCallback(text => setName(text), [])}
            errorText={nameError}
          />
          <Input
            label="Wages Per Day"
            placeholder="Wages amount..."
            value={wagesPerDay}
            onChangeText={useCallback(text => setWagesPerDay(text), [])}
            keyboardType="number-pad"
            errorText={wagesPerDayError}
          />
          <Input
            label="Contact Number"
            placeholder="eg:9XXXXXXXXX"
            value={contactNumber}
            onChangeText={useCallback(text => setContactNumber(text), [])}
            keyboardType="number-pad"
            errorText={contactNumberError}
          />
          <Input
            label="Address"
            placeholder="eg:Singapore"
            value={address}
            onChangeText={useCallback(text => setAddress(text), [])}
          />
          <TouchableOpacity
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
              {role}
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

const styles = StyleSheet.create({
  datePickerView: {
    justifyContent: 'center',
    width: '100%',
  },
  dateTxtView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthPickerBtn: {
    backgroundColor: light,
    width: '30%',
    marginHorizontal: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(9),
    alignSelf: 'flex-start',
    position: 'relative',
    marginTop: verticalScale(5),
    borderRadius: moderateScale(5),
  },
  datePickerInput: {
    width: '100%',
  },
  txt: {
    color: dark,
    fontSize: moderateScale(20),
    textTransform: 'uppercase',
    color: theme_primary,
  },
});
