import React, { memo } from 'react';
import { ActivityIndicator, Button } from 'react-native-paper';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { dark_light_l1, dark_light_l2, light, theme_primary, white } from '../styles/colors';

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
        borderRadius: moderateScale(5),
        backgroundColor: disabled ? dark_light_l2 : theme_primary,
        width: '100%',
        paddingVertical: moderateVerticalScale(3),
        ...style,
      }}
      labelStyle={{
        fontSize: moderateScale(15),
        color: disabled ? dark_light_l1 : white,
        textTransform: 'capitalize',
        ...labelStyle,
      }}
      onPress={handler}>
      {loading ? <ActivityIndicator color="#fff" /> : title}
    </Button>
  );
};

export default memo(ContainedBtn);
