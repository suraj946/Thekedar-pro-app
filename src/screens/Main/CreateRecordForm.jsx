import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import AmountInfoCard from '../../components/AmountInfoCard';
import ContainedBtn from '../../components/ContainedBtn';
import Header from '../../components/Header';
import { getSingleWorker } from '../../redux/actions/workerAction';
import {
  dark_light_l1,
  dark_light_l2,
  success,
  theme_secondary,
  white,
} from '../../styles/colors';
import {
  ADD_SINGLE_WORKER,
  MONTH,
  UPDATE_WORKER_FOR_NEW_RECORD,
} from '../../utils/constants';
import { useCreateMonthlyRecord, useCurrentDate } from '../../utils/hooks';

const CreateRecordForm = ({route}) => {
  const {workerId, screenName} = route.params;
  const {loading, createRecord, settlementResult} = useCreateMonthlyRecord();
  const dispatch = useDispatch();
  const [isApiCalled, setIsApiCalled] = useState(false);

  const {year, monthIndex, numberOfDays} = useCurrentDate();

  const afterRecordCreation = async () => {
    switch (screenName) {
      case 'WorkerList':
        dispatch({type: UPDATE_WORKER_FOR_NEW_RECORD, payload: workerId});
        break;
      case 'WorkerProfile':
        const worker = await getSingleWorker(workerId);
        dispatch({type: ADD_SINGLE_WORKER, payload: worker});
        break;
      default:
        break;
    }
  };

  const handleCreateRecord = async () => {
    if (!workerId) return;
    await createRecord(workerId, numberOfDays, afterRecordCreation);
    setIsApiCalled(true);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <StatusBar barStyle={'dark-content'} />
      <Header headingText="Create Record" />
      <View style={styles.container}>
        <Text style={styles.infoText}>
          Create record for
          <Text style={styles.monthText}>
            {' '}
            {MONTH[monthIndex]} {year}
          </Text>
        </Text>
        <View style={styles.formContainer}>
          <ContainedBtn
            title="Create"
            loading={loading}
            handler={handleCreateRecord}
          />
          <Text style={{marginTop: scale(10), color: dark_light_l2}}>
            Note:- Creating a new record will first perform settlement of
            previous record (if any) and then the result will be updated to the
            new record.
          </Text>
        </View>
        {Object.keys(settlementResult).length > 0 ? (
          <View style={styles.settlementView}>
            <Text style={styles.settlementHeading}>Settlement Summary</Text>
            <AmountInfoCard
              fieldName="Wages occured in the month"
              amount={settlementResult?.wagesOccured || 0}
            />
            <AmountInfoCard
              fieldName="Advance occured in the month"
              amount={settlementResult?.advanceOccured || 0}
            />
            <AmountInfoCard
              fieldName="Wages transferred to the new month"
              amount={settlementResult?.wagesTransferred || 0}
            />
            <AmountInfoCard
              fieldName="Advance transferred to the new month"
              amount={settlementResult?.advanceTransferred || 0}
            />
          </View>
        ) : (
          isApiCalled && <View style={styles.infoCont}>
            <Text style={styles.text1}>Record created successfully</Text>
            <Text style={styles.text2}>No settlement has been done because no any previous record found for settlement</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CreateRecordForm;

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
  },
  infoCont: {
    marginTop: verticalScale(70),
    alignItems: 'center',
    paddingHorizontal: scale(10),
  },
  text1: {
    fontSize: moderateScale(25),
    color: success,
    textAlign: 'center',
  },
  text2: {
    fontSize: moderateScale(16),
    color: dark_light_l2,
    textAlign: 'center',
    marginTop: verticalScale(10),
  },
});
