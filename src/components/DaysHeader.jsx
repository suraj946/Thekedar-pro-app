import {StyleSheet, Text, View} from 'react-native';
import React, { memo } from 'react';
import {DAYS} from '../utils/constants';
import { dark, theme_secondary } from '../styles/colors';
import { moderateScale } from 'react-native-size-matters';
import { getCurrentNepaliDate } from '../utils/helpers';

const {dayIndex} = getCurrentNepaliDate();

const DaysHeader = () => {
  return (
    <View style={styles.weekdaysContainer}>
      {DAYS.map((day, index) => (
        <View key={`days${index}`} style={styles.headerCell}>
          <Text
            style={{
              ...styles.dayText,
              color: DAYS[dayIndex] === day ? theme_secondary : dark,
            }}>
            {day.slice(0, 3)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default memo(DaysHeader);

const styles = StyleSheet.create({
  weekdaysContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '98%',
  },
    headerCell: {
    width: '14%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    color: dark,
    textTransform: 'uppercase',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
});
