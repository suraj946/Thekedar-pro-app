import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import OverviewCard from './OverviewCard';

const BoxSection = () => {
  const navigation = useNavigation();
  // console.log(`Box ${Math.round(Math.random()*1000)}`);
  return (
    <View style={styles.container}>
      <OverviewCard
        icon="calendar-check"
        iconBgColor="#fa2863"
        text="Attendance"
        pressHandler={() => navigation.navigate('Attendance')}
      />
      <OverviewCard
        icon="calculator-variant"
        text="Settlement"
        pressHandler={() => navigation.navigate('Settlement')}
      />
      <OverviewCard
        icon="calendar-month-outline"
        iconBgColor="#fc14bb"
        text="View Calendar"
        pressHandler={() => navigation.navigate('WorkerCalendar')}
      />
      <OverviewCard
        icon="office-building-marker"
        iconBgColor="#fcc214"
        text="Manage Site"
        pressHandler={() => navigation.navigate('WorksiteManagement')}
      />
      <OverviewCard
        icon="account-group"
        iconBgColor="#20f72f"
        text="Workers"
        pressHandler={() => navigation.navigate('Workers')}
      />
      <OverviewCard
        icon="account-group-outline"
        iconBgColor="#8e26fc"
        text="Add Worker"
        pressHandler={() => navigation.navigate('AddWorker')}
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
