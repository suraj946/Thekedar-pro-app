import React, { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Snackbar from 'react-native-snackbar';
import { dark, info, light, white } from '../styles/colors';
import { DEFAULT_WORKER_ROLE, WORKER_ROLES } from '../utils/constants';
import { defaultSnackbarOptions } from '../utils/helpers';
import MyModal from './MyModal';

const SelectRole = ({
  visible = false,
  setVisible = () => {},
  value=DEFAULT_WORKER_ROLE,
  setValue=() => {}
}) => {
  const handlePress = (val) => {
    setValue(val);
    setVisible(false);
    Snackbar.show(defaultSnackbarOptions(`Role status changed to ${val.toUpperCase()}`))
  }
  return (
    <MyModal
      visible={visible}
      setVisible={setVisible}
      heading="Select Role"
      containerStyle={{paddingBottom:verticalScale(5)}}
      >
      {WORKER_ROLES.map(s => (
        <TouchableOpacity onPress={() => handlePress(s)} key={s}>
          <Text
            style={{
              color: s === value ? white : dark,
              backgroundColor: s === value ? info : light,
              padding: moderateScale(10),
              marginVertical: verticalScale(5),
              width: '60%',
              alignSelf: 'center',
              textAlign: 'center',
              borderRadius: moderateScale(5),
              fontSize: moderateScale(15),
              textTransform: 'uppercase',
            }}>
            {s}
          </Text>
        </TouchableOpacity>
      ))}
    </MyModal>
  );
};

export default memo(SelectRole);
