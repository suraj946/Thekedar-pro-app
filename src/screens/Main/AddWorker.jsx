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
import { Avatar, Icon } from 'react-native-paper';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Snackbar from 'react-native-snackbar';
import { useDispatch } from 'react-redux';
import ContainedBtn from '../../components/ContainedBtn';
import Header from '../../components/Header';
import Input from '../../components/Input';
import SelectRole from '../../components/SelectRole';
import { getWorkers } from '../../redux/actions/workerAction';
import {
  danger,
  dark,
  info,
  theme_primary,
  white
} from '../../styles/colors';
import instance from '../../utils/axiosInstance';
import {
  CONNECTION_ERROR,
  DAYS,
  DEFAULT_WORKER_ROLE,
  MONTH,
} from '../../utils/constants';
import {
  validateName,
  validatePhoneNumber,
  validateWages,
} from '../../utils/formValidator';
import { defaultSnackbarOptions } from '../../utils/helpers';
import { useCurrentDate } from '../../utils/hooks';
import { updateWorkersCount } from '../../redux/slices/thekedarSlice';

const AddWorker = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState(DEFAULT_WORKER_ROLE);
  const [contactNumber, setContactNumber] = useState('');
  const [wagesPerDay, setWagesPerDay] = useState('');
  const [address, setAddress] = useState('');

  const [nameError, setNameError] = useState('');
  const [wagesPerDayError, setWagesPerDayError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');

  const [loading, setLoading] = useState(false);
  const [selectRoleModal, setSelectRoleModal] = useState(false);

  const dispatch = useDispatch();
  const {year, monthIndex, dayDate, dayIndex} = useCurrentDate();

  const resetForm = () => {
    setName('');
    setWagesPerDay('');
    setContactNumber('');
    setAddress('');
  };

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

  const addWorkerHandler = async () => {
    const isAllOk = validateInputs();
    if (isAllOk) {
      try {
        setLoading(true);
        const {data} = await instance.post('/worker/create', {
          name,
          role,
          contactNumber,
          wagesPerDay,
          address,
        });

        if (data.success) {
          dispatch(getWorkers());
          dispatch(updateWorkersCount(1));
          Snackbar.show(defaultSnackbarOptions(data.message));
          resetForm();
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
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{flex: 1, backgroundColor: white}}>
        <StatusBar barStyle={'dark-content'} backgroundColor={white} />
        <Header headingText="Add New Worker" />

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

          <View style={styles.dateInfoView}>
            <Icon source={"calendar"} size={moderateScale(30)} color={theme_primary}/>
            <Text style={styles.txt}>
              {`${DAYS[dayIndex]}, ${dayDate} ${MONTH[monthIndex]}, ${year}`}
            </Text>
          </View>

          <Input
            label="Worker name"
            placeholder="eg:John Doe"
            value={name}
            onChangeText={useCallback(text => setName(text), [])}
            errorText={nameError}
            disabled={loading}
          />
          <Input
            label="Wages Per Day"
            placeholder="Wages amount..."
            value={wagesPerDay}
            onChangeText={useCallback(text => setWagesPerDay(text), [])}
            keyboardType="number-pad"
            errorText={wagesPerDayError}
            disabled={loading}
          />
          <Input
            label="Contact Number"
            placeholder="eg:9XXXXXXXXX"
            value={contactNumber}
            onChangeText={useCallback(text => setContactNumber(text), [])}
            keyboardType="number-pad"
            errorText={contactNumberError}
            disabled={loading}
          />
          <Input
            label="Address"
            placeholder="eg:Singapore"
            value={address}
            onChangeText={useCallback(text => setAddress(text), [])}
            disabled={loading}
          />
          <TouchableOpacity
            disabled={loading}
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
          />
          <ContainedBtn
            title="Add Worker"
            handler={addWorkerHandler}
            style={{
              borderRadius: moderateScale(5),
              marginTop: verticalScale(20),
            }}
            loading={loading}
          />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AddWorker;

const styles = StyleSheet.create({
  dateInfoView: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  txt: {
    marginLeft: moderateScale(10),
    color: dark,
    fontSize: moderateScale(25),
    textTransform: 'uppercase',
    color: theme_primary,
  },
});
