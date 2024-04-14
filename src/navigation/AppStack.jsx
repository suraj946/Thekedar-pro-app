import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Main/Home';
import Workers from '../screens/Main/Workers';
import WorkerProfile from '../screens/Main/WorkerProfile';
import EditWorker from '../screens/Main/EditWorker';
import EditMyProfile from '../screens/Main/EditMyProfile';
import AddWorker from '../screens/Main/AddWorker';
import WorkerCalendar from '../screens/Main/WorkerCalendar';
import Calendar from '../screens/Main/Calendar';
import Attendance from '../screens/Main/Attendance';
import Settlement from '../screens/Main/Settlement';
import Advance from '../screens/Main/Advance';
import SettlementSummary from '../screens/Main/SettlementSummary';
import MyProfile from '../screens/Main/MyProfile';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
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
    </Stack.Navigator>
  );
};

export default AppStack;
