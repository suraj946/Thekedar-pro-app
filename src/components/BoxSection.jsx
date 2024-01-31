import {StyleSheet, View} from 'react-native';
import React from 'react';
import OverviewCard from './OverviewCard';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const BoxSection = () => {
  return (
    <View style={styles.container}>
      <OverviewCard
        icon="calendar-month"
        iconBgColor="#fa2863"
        text="Attendance"
        pressHandler={() => {
          console.log('ok');
        }}
      />
      <OverviewCard
        icon="calculator-variant"
        text="Settlement"
        pressHandler={() => {
          console.log('ok');
        }}
      />
      <OverviewCard
        icon="account-group"
        iconBgColor="#20f72f"
        text="Workers"
        pressHandler={() => {
          console.log('ok');
        }}
      />
      <OverviewCard
        icon="account-group-outline"
        iconBgColor="#8e26fc"
        text="Add Worker"
        pressHandler={() => {
          console.log('ok');
        }}
      />
      <OverviewCard
        icon="currency-inr"
        iconBgColor="#fcc214"
        text="Give Advance"
        pressHandler={() => {
          console.log('ok');
        }}
      />
      <OverviewCard
        icon="calendar-month-outline"
        iconBgColor="#fc14bb"
        text="View Calendar"
        pressHandler={() => {
          console.log('ok');
        }}
      />
    </View>
  );
};

export default BoxSection;

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-between",
        marginTop:verticalScale(5),
        gap:moderateScale(10)
    },
});
