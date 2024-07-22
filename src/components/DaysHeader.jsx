import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { dark, theme_secondary } from '../styles/colors';
import { DAYS } from '../utils/constants';
import { useCurrentDate } from '../utils/hooks';

const DaysHeader = ({currentShowingMonthIndex}) => {
  const {monthIndex, dayIndex} = useCurrentDate();
  // console.log(`rendering days header ${Math.round(Math.random()*10000)}`);
  const getColor = (idx) => {
    if(currentShowingMonthIndex !== monthIndex) return dark;
    return idx === dayIndex ? theme_secondary : dark;
  }
  return (
    <View style={styles.weekdaysContainer}>
      {DAYS.map((day, index) => (
        <View key={`days${index}`} style={styles.headerCell}>
          <Text
            style={{
              ...styles.dayText,
              color: getColor(index)
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
