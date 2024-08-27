import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { danger, dark_light_l1, white } from '../styles/colors';

const InfoView = ({
  text="",
  icon="alert",
  iconColor=danger,
}) => {
  return (
    <View style={styles.warningView}>
      <Avatar.Icon
        icon={icon}
        size={moderateScale(40)}
        style={{backgroundColor: white}}
        color={iconColor}
      />
      <Text style={styles.noRecText}>{text}</Text>
    </View>
  );
};

export default InfoView;

const styles = StyleSheet.create({
  warningView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(10),
    elevation: 5,
    backgroundColor: white,
    padding: verticalScale(4),
    borderRadius: moderateScale(5),
  },
  noRecText: {
    fontSize: moderateScale(18),
    color: dark_light_l1,
    marginLeft: scale(10),
  },
});
