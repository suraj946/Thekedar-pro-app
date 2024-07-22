import React, { memo, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Badge } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import {
  danger,
  dark_light_l1,
  success,
  theme_secondary,
  warning,
  white
} from '../styles/colors';
import { DAYS } from '../utils/constants';
import { generateEvents } from '../utils/helpers';
import { useCurrentDate } from '../utils/hooks';

const RenderCalendar = ({data, currentShowingMonthIndex}) => {
  const monthDetails = generateEvents(data?.dailyRecords, data?.dayIndex, data?.numberOfDays);
  const {dayDate, monthIndex} = useCurrentDate();
  const startDayIndex = monthDetails && DAYS.indexOf(monthDetails[0].dayOfWeek);
  const cellScale = useSharedValue(0);
  const cellAnimStyle = useAnimatedStyle(() => ({
    transform: [{scale: cellScale.value}],
  }));

  const getStyle = (day) => {
    if(currentShowingMonthIndex !== monthIndex) return {};
    else if(day.date !== dayDate) return {};

    return {
      backgroundColor: theme_secondary,
      elevation: 10,
      color: white,
      fontSize: moderateScale(20),
    }
  }

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
      {monthDetails?.map((day, index) => (
        <Animated.View
          key={`full${index}`}
          style={[styles.cell, cellAnimStyle]}>
          <Text
            style={[
              styles.dateTxt,
              getStyle(day),
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
    marginVertical: verticalScale(2),
  },
  emptyCell: {
    borderColor: 'transparent',
  },
  dateTxt: {
    color: dark_light_l1,
    backgroundColor: white,
    width: '70%',
    aspectRatio: 1,
    borderRadius: moderateScale(200),
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: moderateScale(15),
    elevation: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(2),
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
});
