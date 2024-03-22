import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import {
  dark,
  dark_light_l1,
  dark_light_l2,
  light,
  theme_primary,
  theme_secondary,
  white
} from '../styles/colors';

const dailyRecords = [
  {
    day: 'sunday',
    dayDate: 1,
    presence: 'half',
    wagesOfDay: 400,
    _id: '6582abd33b57401f7f6c8095',
  },
  {
    wagesOfDay: 0,
    _id: '6582ac153b57401f7f6c809d',
    day: 'wednesday',
    dayDate: 4,
    presence: 'absent',
  },
  {
    day: 'thursday',
    dayDate: 5,
    presence: 'half',
    wagesOfDay: 600,
    _id: '65840f3d2ea5c0f10438e5a8',
    advance: {
      amount: 1000,
      purpose: 'General Work',
    },
  },
  {
    dayDate: 2,
    presence: 'present',
    wagesOfDay: 800,
    _id: '658beed324ce8ca2a3e03d86',
    day: 'monday',
  },
  {
    dayDate: 3,
    presence: 'half',
    wagesOfDay: 400,
    _id: '658beefc24ce8ca2a3e03d8e',
    day: 'tuesday',
  },
  {
    day: 'friday',
    dayDate: 6,
    presence: 'one-and-half',
    wagesOfDay: 1200,
    advance: {
      amount: 500,
      purpose: 'General Purpose',
    },
    _id: '658bef9324ce8ca2a3e03d97',
  },
  {
    presence: 'absent',
    wagesOfDay: 0,
    _id: '658befd624ce8ca2a3e03da9',
    day: 'saturday',
    dayDate: 7,
  },
  {
    dayDate: 8,
    presence: 'present',
    wagesOfDay: 800,
    _id: '658bf06324ce8ca2a3e03db4',
    day: 'sunday',
  },
  {
    day: 'monday',
    dayDate: 9,
    presence: 'present',
    wagesOfDay: 800,
    _id: '658bf07024ce8ca2a3e03dc0',
  },
  {
    day: 'tuesday',
    dayDate: 10,
    presence: 'present',
    wagesOfDay: 800,
    _id: '658bf07824ce8ca2a3e03dcd',
  },
  {
    _id: '658d50c86afb74b481e38c9a',
    day: 'wednesday',
    dayDate: 11,
    presence: 'present',
    wagesOfDay: 800,
  },
  {
    wagesOfDay: 800,
    advance: {
      amount: 1000,
      purpose: 'General Purpose',
    },
    _id: '658d50fa6afb74b481e38cb6',
    day: 'thursday',
    dayDate: 12,
    presence: 'present',
  },
  {
    day: 'friday',
    dayDate: 13,
    presence: 'half',
    wagesOfDay: 400,
    _id: '65913c61d61f2a63abac057e',
  },
  {
    day: 'saturday',
    dayDate: 14,
    presence: 'absent',
    wagesOfDay: 0,
    _id: '65913c74d61f2a63abac05a0',
  },
  {
    advance: {
      amount: 10000,
      purpose: 'General Purpose',
    },
    _id: '65913cc4d61f2a63abac05b3',
    day: 'sunday',
    dayDate: 15,
    presence: 'present',
    wagesOfDay: 800,
  },
  {
    _id: '659286a2eb748eab398b79b5',
    day: 'monday',
    dayDate: 16,
    presence: 'absent',
    wagesOfDay: 0,
  },
];

const CalendarEvent = () => {
  const dayEventCard = ({item, index}) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.dateView}>
          <Text style={styles.dateStyle}>
            {item.dayDate > 9 ? item.dayDate : `0${item.dayDate}`}
          </Text>
          <Text style={styles.dayText}>{item.day.slice(0, 3)}</Text>
        </View>

        <View style={styles.eventView}>
          <Text
            style={{
              backgroundColor: theme_secondary,
              padding: moderateScale(3),
              width: '50%',
              textAlign: 'center',
              textTransform: 'uppercase',
              color: white,
              fontSize: moderateScale(15),
              borderRadius: moderateScale(20),
            }}>
            {item.presence}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: verticalScale(5),
              alignItems: 'center',
            }}>
            <Text style={{fontSize: moderateScale(14), color: dark}}>
              Wages : Rs{' '}
            </Text>
            <Text style={{fontSize: moderateScale(16), color: theme_primary}}>
              {item.wagesOfDay}
            </Text>
          </View>
          {item?.advance && (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: moderateScale(14), color: dark}}>
                  Advance : Rs{' '}
                </Text>
                <Text
                  style={{fontSize: moderateScale(16), color: theme_primary}}>
                  {item.advance?.amount}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

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
        data={dailyRecords}
        renderItem={dayEventCard}
        keyExtractor={(item, idx) => item?._id}
        showsVerticalScrollIndicator={false}
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
  cardContainer: {
    marginVertical: verticalScale(5),
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    minHeight: verticalScale(60),
    alignItems: 'center',
  },
  dateView: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateStyle: {
    color: dark_light_l1,
    fontSize: moderateScale(30),
    textAlign: 'center',
  },
  dayText: {
    fontSize: moderateScale(16),
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: dark_light_l2,
  },
  eventView: {
    backgroundColor: light,
    paddingVertical: verticalScale(5),
    paddingLeft: scale(10),
    maxHeight: '100%',
    width: '70%',
    // justifyContent: 'space-between',
    borderLeftWidth: scale(1.4),
    borderColor: dark_light_l2,
  },
});
