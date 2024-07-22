import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import ContainedBtn from '../../components/ContainedBtn';
import Input from '../../components/Input';
import OutlinedBtn from '../../components/OutlinedBtn';
import { dark, light, theme_secondary } from '../../styles/colors';
import { setCookie } from '../../utils/asyncStorage';
import instance from '../../utils/axiosInstance';
import { CONNECTION_ERROR, REGISTER_SUCCESS } from '../../utils/constants';
import {
  validateEmail,
  validateName,
  validatePassword,
} from '../../utils/formValidator';
import { useErrorMessage } from '../../utils/hooks';

const windowHeight = Dimensions.get('window').height;

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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

    const passCheck = validatePassword(password);
    if (passCheck.isValid) {
      setPasswordError('');
    } else {
      setPasswordError(passCheck.errorText);
    }

    const isPassMatch = password === confirmPassword;
    if (isPassMatch && confirmPassword.length !== 0) {
      setConfirmPasswordError('');
    } else {
      setConfirmPasswordError('Passwords do not match');
      if (confirmPassword.length === 0) {
        setConfirmPasswordError('Confirm password is required');
      }
    }

    const checkCompanyName = validateName(companyName, 'Company Name');
    if (checkCompanyName.isValid) {
      setCompanyNameError('');
    } else {
      setCompanyNameError(checkCompanyName.errorText);
    }

    return (
      nameCheck.isValid &&
      emailCheck.isValid &&
      passCheck.isValid &&
      isPassMatch &&
      checkCompanyName.isValid
    );
  };

  const registerUser = async() => {
    try {
      setLoading(true);
      const {data, headers} = await instance.post('/thekedar/register', {name, email, password, companyName}, {
        withCredentials: false,
      });
      if (data.success) {
        await setCookie(headers['set-cookie'][0].split(";")[0].split("=")[1]);
        dispatch({type: REGISTER_SUCCESS, payload: data?.data});
        setMessage("Thekedar account created");
      }
    } catch (error) {
      if (error.errorType !== CONNECTION_ERROR) {
        setError(error.response?.data?.message);
      }
    }finally{
      setLoading(false);
    }
  };

  const handleSignup = async() => {
    const isAllOk = validateInputs();
    if (isAllOk) {
      await registerUser();
    }
  };

  useErrorMessage({error, setError, message, setMessage});

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{flex: 1, backgroundColor: light}}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={light}
          animated={true}
        />

        <View style={styles.container}>
          <Animated.View entering={ZoomIn} style={styles.topView}>
            <Image
              style={styles.logoImg}
              source={require('../../assests/logo.png')}
            />
            <Text style={styles.headingTxt}>SIGN-UP</Text>
          </Animated.View>

          <Animated.View
            entering={ZoomIn}
            style={styles.middleView}
            showsVerticalScrollIndicator={false}>
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={name}
              onChangeText={text => setName(text)}
              style={styles.inputStyle}
              errorText={nameError}
              disabled={loading}
            />
            <Input
              label="Email"
              placeholder="example@gmail.com"
              keyboardType="email-address"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.inputStyle}
              errorText={emailError}
              disabled={loading}
            />
            <Input
              label="Password"
              placeholder="*********"
              isPassword={true}
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.inputStyle}
              errorText={passwordError}
              disabled={loading}
            />
            <Input
              label="Confirm Password"
              placeholder="*********"
              isPassword={true}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              style={styles.inputStyle}
              errorText={confirmPasswordError}
              disabled={loading}
            />
            <Input
              label="Company Name"
              placeholder="Your company name"
              value={companyName}
              onChangeText={text => setCompanyName(text)}
              style={styles.inputStyle}
              errorText={companyNameError}
              disabled={loading}
            />
            <ContainedBtn
              loading={loading}
              title="Sign-up"
              style={styles.mv}
              handler={handleSignup}
            />
          </Animated.View>

          <Animated.View entering={ZoomIn} style={styles.bottomView}>
            <OutlinedBtn
              title="Login"
              handler={() => navigation.navigate('Login')}
              disabled={loading}
            />
            <Text style={styles.bottomText}>Thekedar Pro</Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(10),
    height: windowHeight,
    flexDirection: 'column',
  },
  topView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '25%',
  },
  logoImg: {
    width: '100%',
    resizeMode: 'contain',
  },
  headingTxt: {
    color: theme_secondary,
    fontSize: moderateScale(25),
    marginTop: moderateVerticalScale(10),
  },
  middleView: {
    height: '60%',
    alignItems: 'center',
  },
  inputStyle: {
    width: '100%',
  },
  mv: {
    marginVertical: moderateVerticalScale(20),
  },
  forgetText: {
    color: dark,
    fontSize: moderateScale(17),
    marginVertical: moderateVerticalScale(20),
  },
  bottomView: {
    height: '10%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottomText: {
    color: theme_secondary,
    padding: moderateScale(10),
    fontSize: moderateScale(20),
  },
});
