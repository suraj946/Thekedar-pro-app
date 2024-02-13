import {StyleSheet, View} from 'react-native';
import React, { memo, useState } from 'react';
import OverviewCard from './OverviewCard';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import ChooseWorkerModal from './ChooseWorkerModal';

const BoxSection = () => {
  const navigation = useNavigation();
  const [chooseWorkerVisible, setChooseWorkerVisible] = useState(false);
  const [screenToNavigate, setScreenToNavigate] = useState("");
  // console.log(`Box ${Math.round(Math.random()*1000)}`);
  return (
    <View style={styles.container}>
      <ChooseWorkerModal 
        visible={chooseWorkerVisible}
        setVisible={setChooseWorkerVisible}
        screenToNavigate={screenToNavigate}
      />
      <OverviewCard
        icon="calendar-month"
        iconBgColor="#fa2863"
        text="Attendance"
        pressHandler={() => {
          setScreenToNavigate("Attendance");
          setChooseWorkerVisible(true);
        }}
      />
      <OverviewCard
        icon="calculator-variant"
        text="Settlement"
        pressHandler={() => {
          setScreenToNavigate("Settlement");
          setChooseWorkerVisible(true);
        }}
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
        pressHandler={() => {
          setScreenToNavigate("Advance");
          setChooseWorkerVisible(true);
        }}
      />
      <OverviewCard
        icon="calendar-month-outline"
        iconBgColor="#fc14bb"
        text="View Calendar"
        pressHandler={() => navigation.navigate("Calendar")}
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
