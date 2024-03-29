import {StyleSheet, View} from 'react-native';
import React, { memo, useState } from 'react';
import OverviewCard from './OverviewCard';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

const BoxSection = () => {
  const navigation = useNavigation();

  // console.log(`Box ${Math.round(Math.random()*1000)}`);
  return (
    <View style={styles.container}>
      <OverviewCard
        icon="calendar-month"
        iconBgColor="#fa2863"
        text="Attendance"
        pressHandler={() => navigation.navigate("Attendance")}
      />
      <OverviewCard
        icon="calculator-variant"
        text="Settlement"
        pressHandler={() => navigation.navigate("Settlement")}
      />
      <OverviewCard
        icon="account-group"
        iconBgColor="#20f72f"
        text="Workers"
        pressHandler={() => navigation.navigate("Workers")}
      />
      <OverviewCard
        icon="account-group-outline"
        iconBgColor="#8e26fc"
        text="Add Worker"
        pressHandler={() => navigation.navigate("AddWorker")}
      />
      <OverviewCard
        icon="currency-inr"
        iconBgColor="#fcc214"
        text="Give Advance"
        pressHandler={() => navigation.navigate("Advance")}
      />
      <OverviewCard
        icon="calendar-month-outline"
        iconBgColor="#fc14bb"
        text="View Calendar"
        pressHandler={() => navigation.navigate("WorkerCalendar")}
      />
    </View>
  );
};

export default memo(BoxSection);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: verticalScale(5),
    gap: moderateScale(10),
  },
});
