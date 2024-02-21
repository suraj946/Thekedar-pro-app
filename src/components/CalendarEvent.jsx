import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  danger,
  dark,
  light,
  success,
  theme_primary,
  theme_secondary,
  white,
} from '../styles/colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

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
          <Text
            style={{
              fontSize: moderateScale(15),
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}>
            {item.day}
          </Text>
          <Text style={styles.dateStyle}>{item.dayDate}</Text>
        </View>

        <View style={styles.eventView}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={{color:dark, fontSize:moderateScale(15), textTransform:"uppercase"}}>{item.presence}</Text>
            <Text style={{color:theme_primary, fontSize:moderateScale(15)}}>{item.wagesOfDay}</Text>
          </View>
          {item?.advance && (
            <View>
              <View style={{flexDirection:"row", }}>
                <Text>Advance</Text>
                <Text>{item.advance?.amount}</Text>
              </View>
              <Text>{item.advance?.purpose}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CalendarEvent</Text>
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
    // backgroundColor: 'green',
    flex: 1,
    paddingHorizontal: scale(20),
  },
  header: {
    color: dark,
    fontSize: moderateScale(20),
  },
  cardContainer: {
    backgroundColor: light,
    marginVertical: verticalScale(5),
    // paddingHorizontal:scale(5),
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    minHeight: verticalScale(60),
    alignItems: 'center',
  },
  dateView: {
    backgroundColor: theme_secondary,
    height: '100%',
    maxHeight: '100%',
    borderTopLeftRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(10),
    width: '30%',
    alignItems: 'center',
    paddingTop:verticalScale(2)
  },
  dateStyle: {
    backgroundColor: white,
    color: theme_primary,
    fontSize: moderateScale(20),
    aspectRatio: 1,
    textAlign: 'center',
    borderRadius: moderateScale(50),
    padding: moderateScale(5),
  },
  eventView:{
    marginLeft:scale(10),
    // height:"100%",
    maxHeight:"100%",
    justifyContent:"space-between"
  }
});
