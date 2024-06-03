import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { dark_light_l2, theme_primary } from '../styles/colors';

const DotsLoading = ({
  text="",
  containerStyle={},
}) => {
    const [currentDot, setCurrentDot] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentDot(prev => (prev+1)%5)
      }, 100);

      return () => clearInterval(interval);
    }, []);
    
  return (
    <View style={{...styles.container, ...containerStyle}}>
      <View style={styles.dotsView}>
        <View style={{...styles.dots, backgroundColor: currentDot === 0 ? theme_primary : dark_light_l2}} />
        <View style={{...styles.dots, backgroundColor: currentDot === 1 ? theme_primary : dark_light_l2}} />
        <View style={{...styles.dots, backgroundColor: currentDot === 2 ? theme_primary : dark_light_l2}} />
        <View style={{...styles.dots, backgroundColor: currentDot === 3 ? theme_primary : dark_light_l2}} />
        <View style={{...styles.dots, backgroundColor: currentDot === 4 ? theme_primary : dark_light_l2}} />
      </View>
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

export default DotsLoading;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsView: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'space-evenly',
  },
  dots: {
    width: moderateScale(10),
    aspectRatio: 1,
    backgroundColor: dark_light_l2,
    borderRadius: moderateScale(100),
  },
  text:{
    color: theme_primary,
    marginTop: verticalScale(7),
    fontSize: moderateScale(16),
    marginLeft: scale(5),
  }
});
