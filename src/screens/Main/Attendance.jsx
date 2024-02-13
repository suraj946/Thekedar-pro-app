import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import Header from '../../components/Header';
import MonthHeader from '../../components/MonthHeader';
import { dark, light } from '../../styles/colors';
import { MONTH } from '../../utils/constants';

const Attendance = ({route}) => {
  const [count, setCount] = useState(0);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  return (
    <SafeAreaView style={{flex:1, backgroundColor:light}}>
      <StatusBar backgroundColor={light} barStyle={"dark-content"}/>
      <Header headingText='Attendance' />
      <MonthHeader initialMonthIndex={0} setCurrentMonthIndex={setCurrentMonthIndex} />
      <Text style={{color:dark}} onPress={()=>setCount(count+1)}>Okay{count}</Text>
      <Text style={{color:dark}}>{MONTH[currentMonthIndex]}</Text>
    </SafeAreaView>
  )
}

export default Attendance;

const styles = StyleSheet.create({});