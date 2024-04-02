import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {dark, white} from '../../styles/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import Input from '../../components/Input';
import {moderateScale, scale} from 'react-native-size-matters';
import ContainedBtn from '../../components/ContainedBtn';
import { validateEmail, validateName, validatePhoneNumber } from '../../utils/formValidator';

const EditMyProfile = ({route}) => {
  // {name, email, contactNumber, address, companyName}
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');

  const [updateLoading, setUpdateLoading] = useState(false);

  const validateInputs = () => {
    const nameCheck = validateName(name, "Full Name");
    if(nameCheck.isValid){
      setNameError("");
    }else{
      setNameError(nameCheck.errorText);
    }

    const emailCheck = validateEmail(email);
    if(emailCheck.isValid){
      setEmailError("");
    }else{
      setEmailError(emailCheck.errorText);
    }

    const checkCompanyName = validateName(companyName, "Company Name");
    if(checkCompanyName.isValid){
      setCompanyNameError("");
    }else{
      setCompanyNameError(checkCompanyName.errorText);
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

    return (
      nameCheck.isValid &&
      emailCheck.isValid &&
      checkCompanyName.isValid &&
      forContact
    )
  }

  const handleProfileUpdate = () => {
    if(!validateInputs()){
      return ;
    }
    console.log("Handle profile update");
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <Header headingText="Edit My Profile" />
      <View
        style={{padding: moderateScale(10), paddingHorizontal: scale(15)}}>
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
          title='Update'
          handler={handleProfileUpdate}
          loading={updateLoading}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditMyProfile;

const styles = StyleSheet.create({});
