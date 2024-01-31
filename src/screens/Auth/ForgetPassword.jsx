import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  Keyboard, 
  TouchableWithoutFeedback, 
  Dimensions,
  Image
} from 'react-native';
import React, { useState } from 'react';
import { light, theme_secondary } from '../../styles/colors';
import Input from '../../components/Input';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import ContainedBtn from '../../components/ContainedBtn';
import { validateEmail } from '../../utils/formValidator';
import Animated, { ZoomIn } from 'react-native-reanimated';

const windowHeight = Dimensions.get("window").height;

const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateInputs = () => {
    const emailCheck = validateEmail(email);
    if(emailCheck.isValid){
      setEmailError("");
    }else{
      setEmailError(emailCheck.errorText);
    }
    return emailCheck.isValid;
  }

  const handleSendOTP = () => {
    const isAllOk = validateInputs();
    if(isAllOk){
      console.log("Submitting the form");
      navigation.navigate("ResetPassword");
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
            />
            <ContainedBtn 
              loading={false} 
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


