import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {light, theme_secondary} from '../../styles/colors';
import Input from '../../components/Input';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import ContainedBtn from '../../components/ContainedBtn';
import { validateOtp, validatePassword} from '../../utils/formValidator';
import Animated, {ZoomIn} from 'react-native-reanimated';

const windowHeight = Dimensions.get('window').height;

const ResetPassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [otp, setOtp] = useState();
  const [otpError, setOtpError] = useState('');

  const validateInputs = () => {
    const passCheck = validatePassword(password);
    if (passCheck.isValid) {
      setPasswordError('');
    } else {
      setPasswordError(passCheck.errorText);
    }
    const otpCheck = validateOtp(otp);
    if (otpCheck.isValid) {
        setOtpError('');
      } else {
        setOtpError(otpCheck.errorText);
      }
    return passCheck.isValid && otpCheck.isValid;
  };

  const hanldeResetPassword = () => {
    const isAllOk = validateInputs();
    if (isAllOk) {
        const formData = {
            otp: Number(otp),
            password
        }
      console.log(formData);
      console.log(typeof formData.otp);
      console.log('Submitting the form');
    }
  };

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
            <Text style={styles.headingTxt}>Reset Password</Text>
          </Animated.View>

          <Animated.View entering={ZoomIn} style={styles.middleView}>
            <Input
              label="OTP"
              keyboardType="numeric"
              placeholder="6 digit number"
              value={otp}
              onChangeText={text => setOtp(text)}
              style={styles.inputStyle}
              errorText={otpError}
            />
            <Input
              label="New Password"
              placeholder="*********"
              isPassword={true}
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.inputStyle}
              errorText={passwordError}
            />
            <ContainedBtn
              loading={false}
              title="Reset Password"
              style={styles.mv}
              handler={hanldeResetPassword}
            />
          </Animated.View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ResetPassword;

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
    marginTop: moderateVerticalScale(20),
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
});
