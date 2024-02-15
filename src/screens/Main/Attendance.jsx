import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import Header from '../../components/Header';
import MonthHeader from '../../components/MonthHeader';
import { dark, light } from '../../styles/colors';
import { MONTH } from '../../utils/constants';
import Calendar from '../../components/Calendar';

const Attendance = ({route}) => {
  const [count, setCount] = useState(0);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  return (
    <SafeAreaView style={{flex:1, backgroundColor:light}}>
      <StatusBar backgroundColor={light} barStyle={"dark-content"}/>
      <Header headingText='Attendance' />
      <MonthHeader initialMonthIndex={9} setCurrentMonthIndex={setCurrentMonthIndex} />
      <Calendar />
    </SafeAreaView>
  )
}

export default Attendance;

const styles = StyleSheet.create({});