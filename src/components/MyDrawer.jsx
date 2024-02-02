import { useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon } from 'react-native-paper';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { theme_primary, white } from '../styles/colors';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const MyDrawer = ({
  visible = false,
  setVisible,
  children,
  drawerWidthInPercent = 75,
  dismissable = true,
}) => {
  const leftVal = useSharedValue(-(windowWidth + 100));
  const transparentBg = useSharedValue('rgba(0,0,0,0)');

  const startBgAnimation = finished => {
    'worklet';
    if (finished) {
      if (visible) {
        transparentBg.value = 'rgba(0,0,0,0.2)';
      } else {
        transparentBg.value = 'rgba(0,0,0,0)';
      }
    }
  };

  const transparentBgStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(transparentBg.value, {duration: 200}),
  }));

  const drawerAnimationStyle = useAnimatedStyle(() => ({
    left: withTiming(
      leftVal.value,
      {
        duration: 500,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      },
      startBgAnimation,
    ),
  }));

  const handleClose = () => {
    if (typeof setVisible !== 'function') {
      throw new Error('setVisible should be a function');
    }
    setVisible(false);
  };

  useEffect(() => {
    if (visible) {
      leftVal.value = 0;
    } else {
      leftVal.value = -(windowWidth + 10);
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: '100%',
          height: windowHeight,
          zIndex: 10,
          left: 0,
        },
        drawerAnimationStyle,
      ]}>
      <View style={{...styles.sectionStyle, width: `${drawerWidthInPercent}%`}}>
        <TouchableOpacity style={styles.closeIcon} onPress={handleClose}>
          <Icon
            source={'close'}
            color={theme_primary}
            size={moderateScale(35)}
          />
        </TouchableOpacity>
        {children}
      </View>
      <AnimatedTouchable
        activeOpacity={1}
        onPress={dismissable ? handleClose : null}
        style={[
          {
            ...styles.extraSpace,
            width: `${100 - drawerWidthInPercent}%`,
          },
          transparentBgStyle,
        ]}
      />
    </Animated.View>
  );
};

export default MyDrawer;

const styles = StyleSheet.create({
  closeIcon: {
    position: 'absolute',
    right: 0,
    top: verticalScale(5),
  },
  sectionStyle: {
    height: '100%',
    backgroundColor: white,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  extraSpace: {
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    right: 0,
    height: windowHeight,
  },
});
