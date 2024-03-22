import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import CalendarEvent from '../../components/CalendarEvent';
import DaysHeader from '../../components/DaysHeader';
import Header from '../../components/Header';
import MonthHeader from '../../components/MonthHeader';
import RenderCalendar from '../../components/RenderCalendar';
import { white } from '../../styles/colors';
import { getCurrentNepaliDate } from '../../utils/helpers';

const {monthIndex} = getCurrentNepaliDate();

const Calendar = ({route}) => {
  const {recordId, workerId, name} = route.params;
  const [currentMonthIndex, setCurrentMonthIndex] = useState(monthIndex);
  // console.log(currentMonthIndex);
  // console.log(`rendering calender ${Math.round(Math.random()*10000)}`);
  return (
    <SafeAreaView style={{backgroundColor: white, flex: 1}}>
      <StatusBar backgroundColor={white} barStyle={'dark-content'} />
      <Header headingText={name}/>
      <MonthHeader
        initialMonthIndex={currentMonthIndex}
        setCurrentMonthIndex={setCurrentMonthIndex}
      />
      <View style={styles.container}>
        <DaysHeader />
        <RenderCalendar />
      </View>
      <CalendarEvent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(10),
  },
});

export default Calendar;
