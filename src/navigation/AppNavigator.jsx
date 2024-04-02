import React, {useEffect, useState} from 'react';
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
import AddWorker from '../screens/Main/AddWorker';
import Attendance from '../screens/Main/Attendance';
import Settlement from '../screens/Main/Settlement';
import Advance from '../screens/Main/Advance';
import SettlementSummary from '../screens/Main/SettlementSummary';
import WorkerCalendar from '../screens/Main/WorkerCalendar';
import Calendar from '../screens/Main/Calendar';
import MyProfile from '../screens/Main/MyProfile';
import EditMyProfile from '../screens/Main/EditMyProfile';
import {useDispatch, useSelector} from 'react-redux';
import {
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
} from '../utils/constants';
import {Text, View} from 'react-native';
import NoInternet from '../screens/Main/NoInternet';
import {defaultSnackbarOptions, getNetInfo} from '../utils/helpers';
import Snackbar from 'react-native-snackbar';
import {danger} from '../styles/colors';
import LoadingScreen from '../screens/Main/LoadingScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const {loading, isAuthenticated} = useSelector(state => state.thekedar);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    (async () => {
      const netInfo = await getNetInfo();
      setIsConnected(netInfo.isConnected && netInfo.reachable);
      if (!(netInfo.isConnected && netInfo.reachable)) {
        Snackbar.show(defaultSnackbarOptions('Connection Error !!', danger));
      }
    })();
  }, [refresh]);

  // useEffect(() => {
  //   (() => {
  //     dispatch({type: LOAD_USER_REQUEST});
  //     const tm = setTimeout(() => {
  //       dispatch({type: LOAD_USER_SUCCESS, payload: {}});
  //     }, 1000);
  //     return () => {
  //       clearTimeout(tm);
  //     };
  //   })();
  // }, []);

  if (!isConnected) {
    return <NoInternet refresh={refresh} setRefresh={setRefresh} />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={`${isAuthenticated ? "Home" : "Login"}`}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Workers" component={Workers} />
          <Stack.Screen name="WorkerProfile" component={WorkerProfile} />
          <Stack.Screen name="EditWorker" component={EditWorker} />
          <Stack.Screen name="EditMyProfile" component={EditMyProfile} />
          <Stack.Screen name="AddWorker" component={AddWorker} />
          <Stack.Screen name="WorkerCalendar" component={WorkerCalendar} />
          <Stack.Screen name="Calendar" component={Calendar} />
          <Stack.Screen name="Attendance" component={Attendance} />
          <Stack.Screen name="Settlement" component={Settlement} />
          <Stack.Screen name="Advance" component={Advance} />
          <Stack.Screen
            name="SettlementSummary"
            component={SettlementSummary}
          />
          <Stack.Screen name="MyProfile" component={MyProfile} />

          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppNavigator;
