import React, {memo} from 'react';
import {Button, ActivityIndicator} from 'react-native-paper';
import {dark_light_l2, light, theme_primary} from '../styles/colors';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const ContainedBtn = ({
  title = '',
  handler = () => {},
  disabled = false,
  loading = false,
  style = {},
  labelStyle = {},
}) => {
  return (
    <Button
      disabled={disabled || loading}
      style={{
        borderRadius: moderateScale(10),
        backgroundColor: disabled ? dark_light_l2 : theme_primary,
        width: '100%',
        paddingVertical: moderateVerticalScale(3),
        ...style,
      }}
      labelStyle={{
        fontSize: moderateScale(15),
        color: disabled ? dark_light_l2 : light,
        textTransform: 'capitalize',
        ...labelStyle,
      }}
      onPress={handler}>
      {loading ? <ActivityIndicator color="#fff" /> : title}
    </Button>
  );
};

export default memo(ContainedBtn);
