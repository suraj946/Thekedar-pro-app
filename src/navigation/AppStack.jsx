import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddWorker from '../screens/Main/AddWorker';
import Attendance from '../screens/Main/Attendance';
import AttendanceForm from '../screens/Main/AttendanceForm';
import Calendar from '../screens/Main/Calendar';
import CreateRecordForm from '../screens/Main/CreateRecordForm';
import EditAttendance from '../screens/Main/EditAttendance';
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
import WorksiteManagement from '../screens/Main/WorksiteManagement';
import { deleteAppOpenDate, getAppOpenDate } from '../utils/asyncStorage';
import AllRecords from '../screens/Main/AllRecords';
import RecordDetails from '../screens/Main/RecordDetails';
import SiteDetails from '../screens/Main/SiteDetails';
import CreateAndUpdateSite from '../screens/Main/CreateAndUpdateSite';
import CreateAndUpdatePayment from '../screens/Main/CreateAndUpdatePayment';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const {isInitialCall, thekedar, currentDate} = useSelector(state => state.thekedar);
  const [hasDate, setHasDate] = useState(false);

  useEffect(() => {
    (async () => {
      const prevAppOpenDate = await getAppOpenDate(thekedar._id?.toString());
      if(!prevAppOpenDate){
        setHasDate(false);
        return;
      }
      if(prevAppOpenDate !== currentDate.dayDate){
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
      <Stack.Screen name="AttendanceForm" component={AttendanceForm} />
      <Stack.Screen name="EditAttendance" component={EditAttendance} />
      <Stack.Screen name="Settlement" component={Settlement} />
      <Stack.Screen name="WorksiteManagement" component={WorksiteManagement} />
      <Stack.Screen name="SettlementSummary" component={SettlementSummary} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="CreateRecordForm" component={CreateRecordForm} />
      <Stack.Screen name="AllRecords" component={AllRecords} />
      <Stack.Screen name="RecordDetails" component={RecordDetails} />
      <Stack.Screen name="SiteDetails" component={SiteDetails} />
      <Stack.Screen name="CreateAndUpdateSite" component={CreateAndUpdateSite} />
      <Stack.Screen name="CreateAndUpdatePayment" component={CreateAndUpdatePayment} />
    </Stack.Navigator>
  );
};

export default AppStack;
