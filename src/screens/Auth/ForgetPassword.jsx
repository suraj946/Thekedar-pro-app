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
  View
} from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import ContainedBtn from '../../components/ContainedBtn';
import Input from '../../components/Input';
import { danger, light, theme_secondary } from '../../styles/colors';
import { validateEmail } from '../../utils/formValidator';
import Snackbar from 'react-native-snackbar';
import { defaultSnackbarOptions } from '../../utils/helpers';
import { CONNECTION_ERROR } from '../../utils/constants';
import instance from '../../utils/axiosInstance';

const windowHeight = Dimensions.get("window").height;

const ForgetPassword = ({navigation, route}) => {
  const [email, setEmail] = useState(route.params?.email || "");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    const emailCheck = validateEmail(email);
    if(emailCheck.isValid){
      setEmailError("");
    }else{
      setEmailError(emailCheck.errorText);
    }
    return emailCheck.isValid;
  }

  const handleSendOTP = async() => {
    const isAllOk = validateInputs();
    if(!isAllOk){
      return;
    }
    try {
      setLoading(true);
      const {data} = await instance.post('/thekedar/forgotpassword', {email});
      if (data.success) {
        Snackbar.show(defaultSnackbarOptions(data.message));
        navigation.navigate("ResetPassword");
      }
    } catch (error) {
      console.log(error);
      if(error.errorType !== CONNECTION_ERROR){
        Snackbar.show(defaultSnackbarOptions(error.response?.data?.message, danger));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{flex: 1, backgroundColor: light}}>
        <StatusBar barStyle="dark-content" backgroundColor={light} animated={true}/> 

        <View style={styles.container}> 
          <Animated.View entering={ZoomIn} style={styles.topView}>
            <Image style={styles.logoImg} source={require("../../assests/logo.png")}/>
            <Text style={styles.headingTxt}>Forget Password</Text>
          </Animated.View>

          <Animated.View entering={ZoomIn} style={styles.middleView}>
            <Input 
              label='Email'
              placeholder='example@gmail.com'
              keyboardType='email-address'
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.inputStyle}
              errorText={emailError}
              disabled={loading}
            />
            <ContainedBtn 
              loading={loading} 
              title='Send OTP' 
              style={styles.mv}
              handler={handleSendOTP}
            />
          </Animated.View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default ForgetPassword;

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: scale(10),
    height: windowHeight,
    flexDirection:"column",
  },
  topView:{
    justifyContent:"center",
    alignItems:"center",
    height: "25%",
  },
  logoImg:{
    width:"100%",
    resizeMode:"contain"
  },
  headingTxt:{
    color: theme_secondary,
    fontSize:moderateScale(25),
    marginTop:moderateVerticalScale(20)
  },
  middleView:{
    height: "60%",
    alignItems:"center"
  },
  inputStyle: {
    width:"100%",
  },
  mv:{
    marginVertical: moderateVerticalScale(20)
  },
});


