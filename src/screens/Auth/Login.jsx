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
import { dark, light, theme_secondary } from '../../styles/colors';
import Input from '../../components/Input';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import OutlinedBtn from '../../components/OutlinedBtn';
import ContainedBtn from '../../components/ContainedBtn';
import { validateEmail } from '../../utils/formValidator';
import Animated, { SlideInLeft, ZoomIn } from 'react-native-reanimated';

const windowHeight = Dimensions.get("window").height;

const Login = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateInputs = () => {
    const emailCheck = validateEmail(email);
    if(emailCheck.isValid){
      setEmailError("");
    }else{
      setEmailError(emailCheck.errorText);
    }

    const passCheck = password.length !== 0;
    if(passCheck){
      setPasswordError("");
    }else{
      setPasswordError("Password is required");
    }

    return emailCheck.isValid && passCheck;
  }

  const handleLogin = () => {
    const isAllOk = validateInputs();
    if(isAllOk){
      console.log("Submitting the form");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{flex: 1, backgroundColor: light}}>
        <StatusBar barStyle="dark-content" backgroundColor={light} animated={true}/> 

        <View style={styles.container}> 
          <Animated.View entering={ZoomIn} style={styles.topView}>
            <Image style={styles.logoImg} source={require("../../assests/logo.png")}/>
            <Text style={styles.headingTxt}>LOGIN</Text>
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
            <Input 
              label='Password'
              placeholder='*********'
              isPassword={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.inputStyle}
              errorText={passwordError}
            />
            <ContainedBtn 
              loading={false} 
              title='Login' 
              style={styles.mv}
              handler={handleLogin}
            />
            <Text 
              style={styles.forgetText} 
              onPress={() => navigation.navigate("ForgetPassword", {email})}
            >Forget Password</Text>
          </Animated.View>
          
          <Animated.View entering={ZoomIn} style={styles.bottomView}>
            <OutlinedBtn title='Create new account' handler={() => navigation.navigate("Signup")}/>
            <Text style={styles.bottomText}>Thekedar Pro</Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default Login;

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
  forgetText:{
    color: dark,
    fontSize:moderateScale(17),
    marginVertical: moderateVerticalScale(20)
  },
  bottomView:{
    height: "10%",
    alignItems:"center",
    justifyContent:"center"
  },
  bottomText:{
    color:theme_secondary,
    padding:moderateScale(10),
    fontSize:moderateScale(20),
  }
});