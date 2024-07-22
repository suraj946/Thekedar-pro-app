import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import {
  dark,
  dark_light_l1,
  light,
  light2,
  theme_primary,
  theme_secondary,
  white,
} from '../styles/colors';
import { MONTH } from '../utils/constants';
import OutlinedBtn from './OutlinedBtn';
import MyModal from './MyModal';
import { useCurrentDate } from '../utils/hooks';

const MonthChangedModal = ({visible = false, setVisible = () => {}}) => {
  const {monthIndex:currMonthIndex} = useCurrentDate();

  const viewAnimation = useSharedValue(0);
  const viewStyle = useAnimatedStyle(() => ({
    opacity: viewAnimation.value,
  }));

  useEffect(() => {
    viewAnimation.value = withTiming(1, {duration: 600});
  }, []);

  return (
    <MyModal
      visible={visible}
      setVisible={setVisible}
      heading="New Month Arrival"
      containerStyle={{maxHeight: '100%', width: '100%'}}
      autoDismiss={false}>
      <View style={styles.contentView}>
        <Animated.View
          style={[
            styles.topView,
            styles.sharedStyle,
            styles.shadow,
            viewStyle,
          ]}>
          <Text style={styles.headText}>Month Changed</Text>
          <Icon
            source={'calendar-month-outline'}
            size={moderateScale(160)}
            color={theme_primary}
          />
          <View style={styles.monthContainer}>
            <Text style={styles.monthText}>{MONTH[currMonthIndex - 1]}</Text>
            <Icon
              source={'arrow-right-thin'}
              size={moderateScale(50)}
              color={theme_primary}
            />
            <Text style={styles.monthText}>{MONTH[currMonthIndex]}</Text>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.bottomView,
            styles.sharedStyle,
            styles.shadow,
            viewStyle,
          ]}>
          <Text style={styles.bottomHeadText}>Things To-Do</Text>
          <Text style={styles.bottomDescText}>
            New month has been arrived. You need to create new records for all
            the active workers to go further. Settlement of previous record will
            happen automatically and result will be added to the new record at
            the time of record creation.
          </Text>
          <OutlinedBtn
            title="Proceed"
            style={styles.btn}
            labelStyle={{color: light}}
            handler={() => setVisible(false)}
          />
        </Animated.View>
      </View>
    </MyModal>
  );
};

export default MonthChangedModal;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  contentView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  topView: {
    height: '50%',
    backgroundColor: light2,
    elevation: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomView: {
    height: '40%',
    backgroundColor: theme_secondary,
    marginBottom: verticalScale(3),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(5),
    alignItems: 'center',
  },
  sharedStyle: {
    width: '95%',
    borderRadius: moderateScale(30),
  },
  headText: {
    color: dark_light_l1,
    fontSize: moderateScale(25),
    textAlign: 'center',
    marginTop: verticalScale(20),
    // marginBottom: verticalScale(5),
  },
  monthContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  monthText: {
    color: light,
    fontSize: moderateScale(20),
    marginHorizontal: scale(5),
    textTransform: 'uppercase',
    backgroundColor: theme_primary,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(10),
  },
  bottomHeadText: {
    color: white,
    fontSize: moderateScale(25),
    marginBottom: verticalScale(10),
  },
  bottomDescText: {
    color: dark,
    fontSize: moderateScale(17),
  },
  btn: {
    marginTop: verticalScale(30),
    borderColor: light,
    borderWidth: moderateScale(1.5),
  },
});
