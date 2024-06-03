import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import AmountInfoCard from '../../components/AmountInfoCard';
import ContainedBtn from '../../components/ContainedBtn';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { dark_light_l1, dark_light_l2, theme_secondary, white } from '../../styles/colors';
import { MONTH, UPDATE_WORKER_FOR_NEW_RECORD } from '../../utils/constants';
import { validateDayDate } from '../../utils/formValidator';
import { getCurrentNepaliDate } from '../../utils/helpers';
import { useCreateMonthlyRecord } from '../../utils/hooks';

const {year, monthIndex} = getCurrentNepaliDate();

const CreateRecordForm = ({route}) => {
  const [numberOfDays, setNumberOfDays] = useState('');
  const [daysError, setDaysError] = useState("");
  const {loading, createRecord, settlementResult} = useCreateMonthlyRecord();
  const dispatch= useDispatch();

  const handleCreateRecord = async() => {
    const validateDays = validateDayDate(numberOfDays, "Number of days");
    if(!validateDays.isValid){
      setDaysError(validateDays.errorText);
      return;
    }
    if(Number(numberOfDays) < 29){
      setDaysError("Number of days should be between 29 to 32");
      return;
    }
    setDaysError("");
    if(!route?.params?.workerId) return;
    await createRecord(route.params.workerId, numberOfDays, () => {
      dispatch({type: UPDATE_WORKER_FOR_NEW_RECORD, payload: route.params.workerId});
    });
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <StatusBar barStyle={'dark-content'}/>
      <Header headingText='Create Record'/>
      <View style={styles.container}>
        <Text style={styles.infoText}>
          Create record for
          <Text style={styles.monthText}> {MONTH[monthIndex]} {year}</Text>
        </Text>
        <View style={styles.formContainer}>
          <Input
            label='Number Of Days'
            placeholder='Between 29 to 32'
            value={numberOfDays}
            onChangeText={(txt) => setNumberOfDays(txt)}
            keyboardType='number-pad'
            errorText={daysError}
            disabled={loading}
          />

          <ContainedBtn
            title='Create'
            loading={loading}
            handler={handleCreateRecord}
          />
          <Text style={{marginTop:scale(10), color:dark_light_l2,}}>
            Note:- Creating a new record will first perform settlement of previous record (if any) and then the result will be updated to the new record.
          </Text>
        </View>
        {
          Object.keys(settlementResult).length > 0 && (<View style={styles.settlementView}>
            <Text style={styles.settlementHeading}>Settlement Summary</Text>
            <AmountInfoCard 
              fieldName='Wages occured in the month'
              amount={settlementResult?.wagesOccured || 0}
            />
            <AmountInfoCard 
              fieldName='Advance occured in the month'
              amount={settlementResult?.advanceOccured || 0}
            />
            <AmountInfoCard 
              fieldName='Wages transferred to the new month'
              amount={settlementResult?.wagesTransferred || 0}
            />
            <AmountInfoCard 
              fieldName='Advance transferred to the new month'
              amount={settlementResult?.advanceTransferred || 0}
            />
          </View>)
        }
      </View>
    </SafeAreaView>
  )
}


export default CreateRecordForm

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(10),
  },
  infoText: {
    fontSize: moderateScale(18),
    color: dark_light_l2,
    textAlign: 'center',
    marginTop: verticalScale(10),
  },
  monthText: {
    color: theme_secondary,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  formContainer: {
    marginTop: verticalScale(10),
    padding: moderateScale(10),
  },
  settlementView: {
    marginTop: verticalScale(10),
    alignItems: 'center',
  },
  settlementHeading: {
    marginBottom: verticalScale(15),
    fontSize: moderateScale(20),
    color: dark_light_l1,
    textAlign: 'center',
    fontWeight: 'bold',
  }
})