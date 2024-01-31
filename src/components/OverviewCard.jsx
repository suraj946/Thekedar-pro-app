import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, { memo } from 'react';
import {Avatar} from 'react-native-paper';
import {dark_light_l1, theme_secondary, white} from '../styles/colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const OverviewCard = ({
    icon = 'help', 
    iconColor="#fff",
    iconBgColor=theme_secondary,
    text = '', 
    pressHandler = () => {}
}) => {
    const handlePress = () => {
        if(typeof pressHandler !== "function"){
            throw new Error("pressHandler should be a function");
        }
        pressHandler();
    }

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container} onPress={handlePress}>
      <Avatar.Icon icon={icon} size={moderateScale(45)} color={iconColor} style={{backgroundColor:iconBgColor}} />
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default memo(OverviewCard);

const styles = StyleSheet.create({
  container: {
    margin:moderateScale(5),
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(10),
    elevation: 3,
    backgroundColor: white,
  },
  textStyle:{
    color:dark_light_l1,
    textTransform:"capitalize",
    fontSize:moderateScale(14),
    marginTop:verticalScale(2)
  }
});
