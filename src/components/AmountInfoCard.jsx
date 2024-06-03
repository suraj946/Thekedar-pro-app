import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { dark_light_l1, theme_primary } from '../styles/colors';

const AmountInfoCard = ({
  fieldName="",
  amount="",
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{fieldName}</Text>
      <Text style={styles.amount}>Rs.{amount}</Text>
    </View>
  );
};

export default AmountInfoCard;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    backgroundColor: 'white',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(15),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: verticalScale(5),
  },
  text: {
    flex: 0.7,
    fontSize: moderateScale(18),
    color:dark_light_l1,
  },
  amount: {
    flex: 0.3,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color:theme_primary,
    textAlign: 'center',
  },
});
