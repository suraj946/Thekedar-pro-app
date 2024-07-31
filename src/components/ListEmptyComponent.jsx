import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {dark_light_l1, dark_light_l2} from '../styles/colors';

const ListEmptyComponent = ({
  mainText = '',
  subText = '',
  style = {},
  text1Color = dark_light_l1,
  text2Color = dark_light_l2,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text
        style={[styles.mainText, {color: text1Color}]}>
        {mainText}
      </Text>
      <Text style={[styles.subText, {color: text2Color}]}>{subText}</Text>
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  container: {
    height: verticalScale(350),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: moderateScale(25),
    textTransform: 'capitalize',
    color: dark_light_l2,
  },
  subText: {
    fontSize: moderateScale(18),
    color: dark_light_l2,
  },
});
