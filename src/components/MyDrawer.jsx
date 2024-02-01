import { useEffect } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { light, theme_primary } from '../styles/colors';

const MyDrawer = ({visible = false, setVisible, children}) => {
  const leftVal = useSharedValue(-(Dimensions.get('window').width + 100));

  const drawerAnimationStyle = useAnimatedStyle(() => ({
    left:withTiming(leftVal.value, {
      duration: 400,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
    })
  }));

  const handleClose = () => {
    if(typeof setVisible !== "function"){
      throw new Error("setVisible should be a function");
    }
    setVisible(false);
  }

  useEffect(() => {
    if(visible){
      leftVal.value = 0;
    }else{
      leftVal.value = -(Dimensions.get('window').width + 10);
    }
  }, [visible]);
  

  return (
    <Animated.View
      style={[{
        position: 'absolute',
        width: '100%',
        height: Dimensions.get('window').height,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.2)',
        left: 0
      }, drawerAnimationStyle]}>
      <View style={styles.sectionStyle}>
        <TouchableOpacity
            style={styles.closeIcon}
            onPress={handleClose}
        >
          <Icon
            source={'close'}
            color={theme_primary}
            size={moderateScale(35)}
          />
        </TouchableOpacity>
        {children}
      </View>
    </Animated.View>
  );
};

export default MyDrawer;

const styles = StyleSheet.create({
  closeIcon: {
    position: 'absolute', 
    right: 0, 
    top: verticalScale(5)
},
  sectionStyle: {
    width: '75%',
    height: '100%',
    backgroundColor: light,
    position: 'relative',
  },
});
