import { Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Snackbar from 'react-native-snackbar';
import { dark, info, light, white } from '../styles/colors';
import { ATTENDANCE_STATUS } from '../utils/constants';
import { defaultSnackbarOptions } from '../utils/helpers';
import MyModal from './MyModal';

const SelectAttendanceStatus = ({
  value = '',
  setValue,
  visible = false,
  setVisible,
}) => {
  const handleSelectValue = (val) => {
    if(val === value){
      setVisible(false);
      return;
    }

    setValue(val);
    setVisible(false);
    Snackbar.show(defaultSnackbarOptions(`Status changed to ${val.toUpperCase()}`))
  }
  return (
    <MyModal
      visible={visible}
      setVisible={setVisible}
      heading="Select Attendance"
    >
      {ATTENDANCE_STATUS.map(s => (
        <TouchableOpacity key={s} activeOpacity={0.9} onPress={() => handleSelectValue(s)}>
          <Text style={{
            color:s === value ? white : dark,
            backgroundColor:s === value ? info : light,
            padding:moderateScale(10),
            marginVertical:verticalScale(5),
            width:"60%",
            alignSelf:"center",
            textAlign:"center",
            borderRadius:moderateScale(5),
            fontSize:moderateScale(15),
            textTransform:"uppercase",
          }}>{s}</Text>
        </TouchableOpacity>
      ))}
      <View style={{marginBottom:verticalScale(10)}} />
    </MyModal>
  );
};

export default SelectAttendanceStatus;

