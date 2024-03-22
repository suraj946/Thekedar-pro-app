import React, {memo, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Badge} from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {
  danger,
  dark_light_l2,
  success,
  theme_secondary,
  warning,
  white,
} from '../styles/colors';
import {DAYS} from '../utils/constants';
import {getCurrentNepaliDate} from '../utils/helpers';

const monthDetails = [
  {
    date: 1,
    dayOfWeek: 'tuesday',
    hasAttendence: true,
    hasAdvance: true,
    hasSettlement: true,
  },
  {
    date: 2,
    dayOfWeek: 'wednesday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: false,
  },
  {
    date: 3,
    dayOfWeek: 'thusday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: false,
  },
  {
    date: 4,
    dayOfWeek: 'friday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: false,
  },
  {
    date: 5,
    dayOfWeek: 'saturday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: false,
  },
  {
    date: 6,
    dayOfWeek: 'sunday',
    hasAttendence: true,
    hasAdvance: false,
    hasSettlement: true,
  },
  {
    date: 7,
    dayOfWeek: 'monday',
    hasAttendence: true,
    hasAdvance: false,
    hasSettlement: true,
  },
  {
    date: 8,
    dayOfWeek: 'tuesday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: true,
  },
  {
    date: 9,
    dayOfWeek: 'wednesday',
    hasAttendence: false,
    hasAdvance: true,
    hasSettlement: false,
  },
  {
    date: 10,
    dayOfWeek: 'thusday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: false,
  },
  {
    date: 11,
    dayOfWeek: 'friday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: false,
  },
  {
    date: 12,
    dayOfWeek: 'saturday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: false,
  },
  {
    date: 13,
    dayOfWeek: 'sunday',
    hasAttendence: true,
    hasAdvance: true,
    hasSettlement: true,
  },
  {
    date: 14,
    dayOfWeek: 'monday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: false,
  },
  {
    date: 15,
    dayOfWeek: 'tuesday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: false,
  },
  {
    date: 16,
    dayOfWeek: 'wednesday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: false,
  },
  {
    date: 17,
    dayOfWeek: 'thusday',
    hasAttendence: true,
    hasAdvance: true,
    hasSettlement: true,
  },
  {
    date: 18,
    dayOfWeek: 'friday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: false,
  },
  {
    date: 19,
    dayOfWeek: 'saturday',
    hasAttendence: true,
    hasAdvance: false,
    hasSettlement: true,
  },
  {
    date: 20,
    dayOfWeek: 'sunday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: false,
  },
  {
    date: 21,
    dayOfWeek: 'monday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: false,
  },
  {
    date: 22,
    dayOfWeek: 'tuesday',
    hasAttendence: false,
    hasAdvance: true,
    hasSettlement: false,
  },
  {
    date: 23,
    dayOfWeek: 'wednesday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: false,
  },
  {
    date: 24,
    dayOfWeek: 'thusday',
    hasAttendence: true,
    hasAdvance: false,
    hasSettlement: false,
  },
  {
    date: 25,
    dayOfWeek: 'friday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: false,
  },
  {
    date: 26,
    dayOfWeek: 'saturday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: false,
  },
  {
    date: 27,
    dayOfWeek: 'sunday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: false,
  },
  {
    date: 28,
    dayOfWeek: 'monday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: true,
  },
  {
    date: 29,
    dayOfWeek: 'tuesday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: false,
  },
  {
    date: 30,
    dayOfWeek: 'wednesday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: false,
  },
  {
    date: 31,
    dayOfWeek: 'thusday',
    hasAttendence: false,
    hasAdvance: false,
    hasSettlement: false,
  },
];

const {dayDate} = getCurrentNepaliDate();
const RenderCalendar = () => {
  const startDayIndex = DAYS.indexOf(monthDetails[0].dayOfWeek);
  const cellScale = useSharedValue(0);
  const cellAnimStyle = useAnimatedStyle(() => ({
    transform: [{scale: cellScale.value}],
  }));

  useEffect(() => {
    cellScale.value = withTiming(1, {duration: 500});
  }, []);

  return (
    <View style={styles.calendarGrid}>
      {Array.from({length: startDayIndex}, (_, index) => (
        <View key={`empty${index}`} style={[styles.cell, styles.emptyCell]}>
          <Text>{''}</Text>
        </View>
      ))}
      {monthDetails.map((day, index) => (
        <Animated.View
          key={`full${index}`}
          style={[styles.cell, cellAnimStyle]}>
          <Text
            onPress={() => console.log('haha')}
            style={[
              styles.dateTxt,
              dayDate === day.date && styles.currentDateStyle,
            ]}>
            {day.date}
          </Text>
          <View style={styles.badgeContainer}>
            {day.hasAttendence && (
              <Badge
                size={moderateScale(5)}
                style={{marginLeft: scale(2), backgroundColor: success}}
              />
            )}
            {day.hasAdvance && (
              <Badge
                size={moderateScale(5)}
                style={{marginLeft: scale(2), backgroundColor: warning}}
              />
            )}
            {day.hasSettlement && (
              <Badge
                size={moderateScale(5)}
                style={{marginLeft: scale(2), backgroundColor: danger}}
              />
            )}
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

export default memo(RenderCalendar);

const styles = StyleSheet.create({
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '98%',
  },
  cell: {
    width: '14%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(4),
  },
  emptyCell: {
    borderColor: 'transparent',
  },
  dateTxt: {
    color: dark_light_l2,
    backgroundColor: white,
    width: '70%',
    aspectRatio: 1,
    borderRadius: moderateScale(200),
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: moderateScale(15),
    elevation: 4,
  },
  currentDateStyle: {
    backgroundColor: theme_secondary,
    elevation: 10,
    color: white,
    fontSize: moderateScale(20),
  },
  badgeContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(2),
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
});
