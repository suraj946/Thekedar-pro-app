import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { dark } from '../../styles/colors';

const monthDetails = [
  { date: 1, dayOfWeek: 'Tue' },
  { date: 2, dayOfWeek: 'Wed' },
  { date: 3, dayOfWeek: 'Thu' },
  { date: 4, dayOfWeek: 'Fri' },
  { date: 5, dayOfWeek: 'Sat' },
  { date: 6, dayOfWeek: 'Sun' },
  { date: 7, dayOfWeek: 'Mon' },
  { date: 8, dayOfWeek: 'Tue' },
  { date: 9, dayOfWeek: 'Wed' },
  { date: 10, dayOfWeek: 'Thu' },
  { date: 11, dayOfWeek: 'Fri' },
  { date: 12, dayOfWeek: 'Sat' },
  { date: 13, dayOfWeek: 'Sun' },
  { date: 14, dayOfWeek: 'Mon' },
  { date: 15, dayOfWeek: 'Tue' },
  { date: 16, dayOfWeek: 'Wed' },
  { date: 17, dayOfWeek: 'Thu' },
  { date: 18, dayOfWeek: 'Fri' },
  { date: 19, dayOfWeek: 'Sat' },
  { date: 20, dayOfWeek: 'Sun' },
  { date: 21, dayOfWeek: 'Mon' },
  { date: 22, dayOfWeek: 'Tue' },
  { date: 23, dayOfWeek: 'Wed' },
  { date: 24, dayOfWeek: 'Thu' },
  { date: 25, dayOfWeek: 'Fri' },
  { date: 26, dayOfWeek: 'Sat' },
  { date: 27, dayOfWeek: 'Sun' },
  { date: 28, dayOfWeek: 'Mon' },
  { date: 29, dayOfWeek: 'Tue' },
  { date: 30, dayOfWeek: 'Wed' },
  { date: 31, dayOfWeek: 'Thu' },
];


const CalendarView = () => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const startDayIndex = weekdays.indexOf(monthDetails[0].dayOfWeek);

  const renderWeekdaysHeader = () => {
    return weekdays.map((day, index) => (
      <View key={`days${index}`} style={styles.headerCell}>
        <Text style={styles.texts}>{day}</Text>
      </View>
    ));
  };

  const renderCalendarGrid = () => {
    const emptyCells = Array.from({ length: startDayIndex }, (_, index) => (
      <View key={`empty${index}`} style={[styles.cell, styles.emptyCell]}>
        <Text style={styles.texts}>{''}</Text>
      </View>
    ));

    const daysInMonth = monthDetails.map((day, index) => (
      <View key={`full${index}`} style={styles.cell}>
        <Text style={styles.texts}>{day.date}</Text>
      </View>
    ));
    return [...emptyCells, ...daysInMonth];
  };

  return (
    <View style={styles.container}>
      <View style={styles.weekdaysContainer}>
        {renderWeekdaysHeader()}
      </View>
      <View style={styles.calendarGrid}>
        {renderCalendarGrid()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekdaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '98%',
    paddingHorizontal: 10,
  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
    
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '98%',
    padding: 10,
  },
  cell: {
    width: '14%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
  },
  emptyCell: {
    borderColor: 'transparent',
  },
  texts:{
    color:dark,
  }
});

export default CalendarView;

