import {StyleSheet, Text, View} from 'react-native';
import React, { memo } from 'react';
import { danger, dark, dark_light_l1, dark_light_l2, light, success, theme_primary, warning, white } from '../styles/colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const DayCard = ({item, containerStyle={}}) => {
  return (
    <View style={[styles.cardContainer, containerStyle]}>
      <View style={styles.dateView}>
        <Text style={styles.dateStyle}>
          {item.dayDate > 9 ? item.dayDate : `0${item.dayDate}`}
        </Text>
        <Text style={styles.dayText}>{item.day.slice(0, 3)}</Text>
      </View>

      <View style={styles.eventView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {item?.presence && (
            <Text
              numberOfLines={1}
              style={[styles.presenceText, {backgroundColor: success}]}>
              {item.presence}
            </Text>
          )}
          {item?.advance && (
            <Text
              numberOfLines={1}
              style={[styles.presenceText, {backgroundColor: warning}]}>
              Advance
            </Text>
          )}
          {item?.settlement && (
            <Text
              numberOfLines={1}
              style={[styles.presenceText, {backgroundColor: danger}]}>
              Settlement
            </Text>
          )}
        </View>
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
            {item.wagesOfDay ? item.wagesOfDay : 0}
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
              <Text style={{fontSize: moderateScale(16), color: theme_primary}}>
                {item.advance?.amount}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default memo(DayCard);

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: verticalScale(5),
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
    borderLeftWidth: scale(1.4),
    borderColor: dark_light_l2,
  },
  presenceText: {
    padding: moderateScale(3),
    width: '30%',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: white,
    fontSize: moderateScale(11),
    borderRadius: moderateScale(5),
    marginLeft: scale(5),
  },
});
