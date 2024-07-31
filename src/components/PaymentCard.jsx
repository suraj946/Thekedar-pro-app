import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { dark_light_l2, success, theme_primary, white } from '../styles/colors'
import { DAYS, MONTH } from '../utils/constants'
import { capitalize } from '../utils/helpers'

const PaymentCard = ({
  _id:paymentId,
  amount,
  date,
  description,
  bitNumber
}) => {
  const navigation = useNavigation();
  const getDate = (txt) => {
    const [year, month, day, dayIndex] = txt.split('-');
    return `${DAYS[dayIndex].substring(0, 3).toUpperCase()}, ${day} ${capitalize(MONTH[month-1])} ${year}`
  }
  return (
    <View style={styles.card}>
      {(bitNumber || bitNumber === 0) && <Text style={styles.bitNumber}>BIT #{bitNumber}</Text>}
      <View>
        <Text style={styles.amount}>₹{amount}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
        <Text style={styles.date}>{getDate(date)}</Text>
      </View>
      <Button 
        onPress={() => navigation.navigate('CreateAndUpdatePayment', {
          paymentId,
          amount,
          date,
          description,
          bitNumber,
          mode: 'update'
        })} 
        mode='text' style={styles.moreBtn}>More</Button>
    </View>
  )
}

export default PaymentCard

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    width: '90%',
    display: 'flex',
    marginBottom: verticalScale(5),
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: moderateScale(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    padding: moderateScale(15),
    paddingBottom:verticalScale(5),
  },
  bitNumber: {
    position: 'absolute',
    backgroundColor: theme_primary,
    color: 'white',
    paddingHorizontal: moderateScale(5),
    borderRadius: moderateScale(5),
    fontSize: moderateScale(15),
    right:0
  },
  amount:{
    color: success,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: moderateScale(25),
    marginBottom: verticalScale(5)
  },
  description:{
    color: dark_light_l2,
    fontSize: moderateScale(16),
    marginBottom: verticalScale(5)
  },
  date:{
    color: white,
    backgroundColor: dark_light_l2,
    padding: moderateScale(5),
    borderRadius: moderateScale(3),
    width: '50%',
    textAlign: 'center',
    marginBottom: verticalScale(5),
    fontSize: moderateScale(15)
  },
  moreBtn: {
    width: '50%',
    alignSelf: 'center',
    borderColor: theme_primary
  }
})