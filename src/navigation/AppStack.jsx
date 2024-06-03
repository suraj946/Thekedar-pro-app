import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddWorker from '../screens/Main/AddWorker';
import Advance from '../screens/Main/Advance';
import Attendance from '../screens/Main/Attendance';
import Calendar from '../screens/Main/Calendar';
import CreateRecordForm from '../screens/Main/CreateRecordForm';
import EditMyProfile from '../screens/Main/EditMyProfile';
import EditWorker from '../screens/Main/EditWorker';
import Home from '../screens/Main/Home';
import WorkerList from '../screens/Main/MonthChanged/WorkerList';
import MyProfile from '../screens/Main/MyProfile';
import Settlement from '../screens/Main/Settlement';
import SettlementSummary from '../screens/Main/SettlementSummary';
import WorkerCalendar from '../screens/Main/WorkerCalendar';
import WorkerProfile from '../screens/Main/WorkerProfile';
import Workers from '../screens/Main/Workers';
import { deleteAppOpenDate, getAppOpenDate } from '../utils/asyncStorage';
import { getCurrentNepaliDate } from '../utils/helpers';

const Stack = createNativeStackNavigator();
const {dayDate} = getCurrentNepaliDate();

const AppStack = () => {
  const {isInitialCall, thekedar} = useSelector(state => state.thekedar);
  const [hasDate, setHasDate] = useState(false);

  useEffect(() => {
    (async () => {
      const prevAppOpenDate = await getAppOpenDate(thekedar._id?.toString());
      if(!prevAppOpenDate){
        setHasDate(false);
        return;
      }
      if(prevAppOpenDate !== dayDate){
        await deleteAppOpenDate(thekedar._id?.toString());
        setHasDate(false);
        return;
      }
      setHasDate(true);
    })();
  }, []);

  
  return (isInitialCall || hasDate) ? (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="WorkerList" component={WorkerList} />
      <Stack.Screen name="CreateRecordForm" component={CreateRecordForm} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={{headerShown: false}}>
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
      <Stack.Screen name="SettlementSummary" component={SettlementSummary} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="CreateRecordForm" component={CreateRecordForm} />
    </Stack.Navigator>
  );
};

export default AppStack;
