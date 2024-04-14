import React, {useCallback, useState} from 'react';
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
import {Avatar} from 'react-native-paper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import ContainedBtn from '../../components/ContainedBtn';
import Header from '../../components/Header';
import Input from '../../components/Input';
import SelectRole from '../../components/SelectRole';
import {danger, dark, info, light, theme_primary, white} from '../../styles/colors';
import {CONNECTION_ERROR, DEFAULT_WORKER_ROLE, MONTH} from '../../utils/constants';
import {defaultSnackbarOptions, getCurrentNepaliDate} from '../../utils/helpers';
import {
  validateDayDate,
  validateName,
  validatePhoneNumber,
  validateWages,
} from '../../utils/formValidator';
import instance from '../../utils/axiosInstance';
import Snackbar from "react-native-snackbar";
import {useDispatch} from 'react-redux';
import { getWorkers } from '../../redux/actions/workerAction';

const currDate = getCurrentNepaliDate();

const AddWorker = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState(DEFAULT_WORKER_ROLE);
  const [contactNumber, setContactNumber] = useState('');
  const [wagesPerDay, setWagesPerDay] = useState('');
  const [address, setAddress] = useState('');
  const [joiningDate, setJoiningDate] = useState({...currDate});
  const [numberOfDays, setNumberOfDays] = useState('');

  const [nameError, setNameError] = useState('');
  const [wagesPerDayError, setWagesPerDayError] = useState('');
  const [joiningDateError, setJoiningDateError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const [numberOfDaysError, setNumberOfDaysError] = useState('');

  const [loading, setLoading] = useState(false);
  const [selectRoleModal, setSelectRoleModal] = useState(false);

  const dispatch = useDispatch();

  const handleDateChange = (text, field) => {
    setJoiningDate({...joiningDate, [field]: text});
  };

  const resetForm = () => {
    setName("");
    setWagesPerDay("");
    setContactNumber("");
    setAddress("");
  }

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

    const dateCheck = validateDayDate(joiningDate.dayDate?.toString());
    if (dateCheck.isValid) {
      setJoiningDateError('');
    } else {
      setJoiningDateError(dateCheck.errorText);
    }

    const numberOfDaysCheck = validateWages(numberOfDays, 'Days Count');
    if (numberOfDaysCheck.isValid) {
      setNumberOfDaysError('');
    } else {
      setNumberOfDaysError(numberOfDaysCheck.errorText);
    }

    return (
      nameCheck.isValid &&
      wagesCheck.isValid &&
      forContact &&
      dateCheck.isValid &&
      numberOfDaysCheck.isValid
    );
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
          joiningDate,
          numberOfDays,
        });

        if(data.success){
          dispatch(getWorkers());
          Snackbar.show(defaultSnackbarOptions(data.message));
          resetForm();
        }
      } catch (error) {
        if(error.errorType !== CONNECTION_ERROR){
          Snackbar.show(defaultSnackbarOptions(error.response?.data?.message, danger));
        }
      }finally{
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
          <View style={styles.datePickerView}>
            <View style={styles.dateTxtView}>
              <Text
                style={{
                  fontSize: moderateScale(18),
                  color: dark,
                }}>
                Joining Date :{' '}
              </Text>
              <Text style={styles.txt}>
                {`${joiningDate.year}/${MONTH[joiningDate.monthIndex]}/${
                  joiningDate.dayDate
                }`}
              </Text>
            </View>

            <Input
              value={joiningDate.dayDate?.toString()}
              label="Date"
              onChangeText={useCallback(
                text => handleDateChange(text, 'dayDate'),
                [],
              )}
              keyboardType="number-pad"
              style={styles.datePickerInput}
              errorText={joiningDateError}
              disabled={loading}
            />
          </View>
          <Input
            placeholder="Total number of days in this month"
            value={numberOfDays}
            label="Days Count"
            onChangeText={useCallback(text => setNumberOfDays(text), [])}
            keyboardType="number-pad"
            errorText={numberOfDaysError}
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
            statusBarColorRGBA="rgba(255, 255, 255, 0.6)"
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
