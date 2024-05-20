import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale, scale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import ContainedBtn from '../../components/ContainedBtn';
import Header from '../../components/Header';
import Input from '../../components/Input';
import {updateUser} from '../../redux/actions/thekedarAction';
import {white} from '../../styles/colors';
import {UPDATE_USER} from '../../utils/constants';
import {
  validateEmail,
  validateName,
  validatePhoneNumber,
} from '../../utils/formValidator';

const EditMyProfile = ({navigation}) => {
  const {thekedar} = useSelector(state => state.thekedar);
  const [name, setName] = useState(thekedar.name);
  const [email, setEmail] = useState(thekedar.email);
  const [companyName, setCompanyName] = useState(thekedar.companyName);
  const [contactNumber, setContactNumber] = useState(
    thekedar.contactNumber ? thekedar.contactNumber : '',
  );
  const [address, setAddress] = useState(
    thekedar.address ? thekedar.address : '',
  );

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');

  const [updateLoading, setUpdateLoading] = useState(false);

  const dispatch = useDispatch();

  const validateInputs = () => {
    const nameCheck = validateName(name, 'Full Name');
    if (nameCheck.isValid) {
      setNameError('');
    } else {
      setNameError(nameCheck.errorText);
    }

    const emailCheck = validateEmail(email);
    if (emailCheck.isValid) {
      setEmailError('');
    } else {
      setEmailError(emailCheck.errorText);
    }

    const checkCompanyName = validateName(companyName, 'Company Name');
    if (checkCompanyName.isValid) {
      setCompanyNameError('');
    } else {
      setCompanyNameError(checkCompanyName.errorText);
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

    return (
      nameCheck.isValid &&
      emailCheck.isValid &&
      checkCompanyName.isValid &&
      forContact
    );
  };

  const handleProfileUpdate = async () => {
    if (!validateInputs()) {
      return;
    }
    const data = {
      name,
      email,
      companyName,
      contactNumber,
      address,
    };
    const modifiedData = {};
    for (const key in data) {
      if (data[key] !== thekedar[key]) {
        modifiedData[key] = data[key];
      }
    }
    if (Object.keys(modifiedData).length === 0) {
      return;
    }

    setUpdateLoading(true);
    const response = await updateUser(modifiedData);
    if (response) {
      dispatch({type: UPDATE_USER, payload: modifiedData});
      navigation.goBack();
    }
    setUpdateLoading(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <Header headingText="Edit My Profile" />
      <View style={{padding: moderateScale(10), paddingHorizontal: scale(15)}}>
        <Input
          label="Full Name*"
          placeholder="John Doe"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.inputStyle}
          errorText={nameError}
          disabled={updateLoading}
        />
        <Input
          label="Email*"
          placeholder="example@gmail.com"
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.inputStyle}
          errorText={emailError}
          disabled={updateLoading}
        />
        <Input
          label="Contact Number"
          placeholder="eg:9XXXXXXXXX"
          value={contactNumber}
          onChangeText={text => setContactNumber(text)}
          keyboardType="number-pad"
          errorText={contactNumberError}
          disabled={updateLoading}
        />
        <Input
          label="Address"
          placeholder="eg:Singapore"
          value={address}
          onChangeText={text => setAddress(text)}
          disabled={updateLoading}
        />
        <Input
          label="Company Name*"
          placeholder="Your company name"
          value={companyName}
          onChangeText={text => setCompanyName(text)}
          style={styles.inputStyle}
          errorText={companyNameError}
          disabled={updateLoading}
        />
        <ContainedBtn
          title="Update"
          handler={handleProfileUpdate}
          loading={updateLoading}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditMyProfile;

const styles = StyleSheet.create({});
