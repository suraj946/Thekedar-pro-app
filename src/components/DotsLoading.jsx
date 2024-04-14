import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { dark_light_l2, theme_primary } from '../styles/colors';

const DotsLoading = () => {
    const [currentDot, setCurrentDot] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentDot(prev => (prev+1)%5)
      }, 100);

      return () => clearInterval(interval);
    }, []);
    
  return (
    <View style={styles.dotsView}>
      <View style={{...styles.dots, backgroundColor: currentDot === 0 ? theme_primary : dark_light_l2}} />
      <View style={{...styles.dots, backgroundColor: currentDot === 1 ? theme_primary : dark_light_l2}} />
      <View style={{...styles.dots, backgroundColor: currentDot === 2 ? theme_primary : dark_light_l2}} />
      <View style={{...styles.dots, backgroundColor: currentDot === 3 ? theme_primary : dark_light_l2}} />
      <View style={{...styles.dots, backgroundColor: currentDot === 4 ? theme_primary : dark_light_l2}} />
    </View>
  );
};

export default DotsLoading;

const styles = StyleSheet.create({
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
});
