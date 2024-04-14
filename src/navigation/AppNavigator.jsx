import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Snackbar from 'react-native-snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../redux/actions/thekedarAction';
import LoadingScreen from '../screens/Main/LoadingScreen';
import NoInternet from '../screens/Main/NoInternet';
import { danger } from '../styles/colors';
import { defaultSnackbarOptions, getNetInfo } from '../utils/helpers';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const AppNavigator = () => {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const {loading, isAuthenticated} = useSelector(state => state.thekedar);
  const [isConnected, setIsConnected] = useState(false);
  const [netLoading, setNetLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setNetLoading(true);
      const netInfo = await getNetInfo();
      setNetLoading(false);
      setIsConnected(netInfo.isConnected && netInfo.reachable);
      if (!(netInfo.isConnected && netInfo.reachable)) {
        Snackbar.show(defaultSnackbarOptions('Connection Error !!', danger));
        return;
      }
      dispatch(loadUser());
    })();
  }, [refresh]);

  if (loading || netLoading) {
    return <LoadingScreen />;
  }

  if (!isConnected) {
    return <NoInternet refresh={refresh} setRefresh={setRefresh} />;
  }

  return (
    <>
      <NavigationContainer>
        {isAuthenticated ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};

export default AppNavigator;
