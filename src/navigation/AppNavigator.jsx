import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login';
import Home from '../screens/Main/Home';
import Signup from '../screens/Auth/Signup';
import ForgetPassword from '../screens/Auth/ForgetPassword';
import ResetPassword from '../screens/Auth/ResetPassword';
import Workers from '../screens/Main/Workers';
import WorkerProfile from '../screens/Main/WorkerProfile';
import EditWorker from '../screens/Main/EditWorker';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Workers" component={Workers} />
        <Stack.Screen name="WorkerProfile" component={WorkerProfile} />
        <Stack.Screen name="EditWorker" component={EditWorker} />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
