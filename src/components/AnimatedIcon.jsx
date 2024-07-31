import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Avatar } from 'react-native-paper';
import { dark, success } from '../styles/colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const AnimatedIcon = ({onPress = () => {}, icon = 'help'}) => {
  const iconAni = useSharedValue(0);
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{scale: iconAni.value}],
  }));

  useEffect(() => {
    iconAni.value = withTiming(1, {duration: 400});
  }, []);

  return (
    <Animated.View style={[styles.plusIconStyle, iconStyle]}>
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={onPress}>
        <Avatar.Icon
          icon={icon}
          style={{backgroundColor: success}}
          size={moderateScale(70)}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AnimatedIcon;

const styles = StyleSheet.create({
  plusIconStyle: {
    position: 'absolute',
    bottom: verticalScale(30),
    backgroundColor: success,
    right: scale(30),
    zIndex: 10,
    shadowColor: dark,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
    borderRadius: moderateScale(40),
  },
});
