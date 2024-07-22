import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Snackbar from 'react-native-snackbar';
import { useDispatch } from 'react-redux';
import { getMonthEvents } from '../redux/actions/monthlyRecordAction';
import {
  danger,
  dark_light_l1,
  dark_light_l2
} from '../styles/colors';
import { defaultSnackbarOptions } from '../utils/helpers';
import { useCurrentDate } from '../utils/hooks';
import DayCard from './DayCard';

const CalendarEvent = ({data, workerId, recordId, currentShowingMonthIndex}) => {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const {monthIndex} = useCurrentDate();
  const handleReferesh = () => {
    if (currentShowingMonthIndex !== monthIndex) return;
    setRefresh(true);
    dispatch(getMonthEvents(workerId, monthIndex));
    setRefresh(false);
  };

  const navigation = useNavigation();

  const cardPressHandler = (item) => {
    const {lastSettlementDate} = data; 
    if(item.dayDate <= lastSettlementDate){
      Snackbar.show(defaultSnackbarOptions("You cannot edit this event", danger));
      return;
    }
    navigation.navigate("EditAttendance", {...item, recordId, workerId});
  }

  const dayEventCard = ({item}) => {
    return (
      <TouchableOpacity onPress={() => cardPressHandler(item)} activeOpacity={0.5} >
        <DayCard item={item}/>
      </TouchableOpacity>
    );
  };

  if (!data || !data?.dailyRecords?.length)
    return (
      <View style={[styles.container, {marginTop: verticalScale(100)}]}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: moderateScale(25),
            color: dark_light_l2,
          }}>
          No events found
        </Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={[styles.headText, {width: '30%', textAlign: 'center'}]}>
          DATE
        </Text>
        <View
          style={{
            width: scale(1.4),
            height: '100%',
            backgroundColor: dark_light_l2,
          }}
        />
        <Text style={[styles.headText, {width: '70%', paddingLeft: scale(20)}]}>
          EVENTS
        </Text>
      </View>

      <FlatList
        data={data?.dailyRecords ? data?.dailyRecords : []}
        renderItem={dayEventCard}
        keyExtractor={(item, idx) => `${item.dayDate}-${idx}`}
        showsVerticalScrollIndicator={false}
        onRefresh={handleReferesh}
        refreshing={refresh}
      />
    </View>
  );
};

export default CalendarEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(10),
  },
  headerView: {
    height: verticalScale(50),
    flexDirection: 'row',
    borderTopWidth: scale(1.4),
    borderColor: dark_light_l2,
  },
  headText: {
    fontSize: moderateScale(20),
    color: dark_light_l1,
    textAlignVertical: 'center',
    padding: moderateScale(10),
  },
});
