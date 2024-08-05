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
import { useDispatch } from 'react-redux';
import ContainedBtn from '../../components/ContainedBtn';
import Input from '../../components/Input';
import OutlinedBtn from '../../components/OutlinedBtn';
import { dark, light, theme_secondary } from '../../styles/colors';
import { setCookie } from '../../utils/asyncStorage';
import instance from '../../utils/axiosInstance';
import { CONNECTION_ERROR, REGISTER_SUCCESS } from '../../utils/constants';
import { validateEmail } from '../../utils/formValidator';
import { useErrorMessage } from '../../utils/hooks';

const windowHeight = Dimensions.get("window").height;

const Login = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

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

  const loginUser = async() => {
    try {
      setLoading(true);
      const {data, headers} = await instance.post('/thekedar/login', {email, password}, {
        withCredentials: false,
      });
      if (data.success) {        
        await setCookie(headers['set-cookie'][0].split(";")[0].split("=")[1]);
        dispatch({type: REGISTER_SUCCESS, payload: data?.data});
      }
    } catch (error) {
      if (error.errorType !== CONNECTION_ERROR) {
        setError(error.response?.data?.message);
      }
    }finally{
      setLoading(false);
    }
  };

  const handleLogin = async() => {
    const isAllOk = validateInputs();
    if(isAllOk){
      await loginUser();
    }
  }

  useErrorMessage({error, setError});
  
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
              disabled={loading}
            />
            <Input 
              label='Password'
              placeholder='*********'
              isPassword={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.inputStyle}
              errorText={passwordError}
              disabled={loading}
            />
            <ContainedBtn 
              loading={loading} 
              title='Login' 
              style={styles.mv}
              handler={handleLogin}
            />
            <Text 
              style={styles.forgetText} 
              disabled={loading}
              onPress={() => navigation.navigate("ForgetPassword", {email})}
            >Forget Password</Text>
          </Animated.View>
          
          <Animated.View entering={ZoomIn} style={styles.bottomView}>
            <OutlinedBtn disabled={loading} title='Create new account' handler={() => navigation.navigate("Signup")}/>
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