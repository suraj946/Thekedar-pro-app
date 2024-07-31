import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Snackbar from 'react-native-snackbar';
import DayCard from '../../components/DayCard';
import DotsLoading from '../../components/DotsLoading';
import Header from '../../components/Header';
import {
  danger,
  dark_light_l1,
  dark_light_l2,
  theme_primary,
  theme_secondary,
  white
} from '../../styles/colors';
import instance from '../../utils/axiosInstance';
import { CONNECTION_ERROR } from '../../utils/constants';
import { defaultSnackbarOptions } from '../../utils/helpers';

const RecordDetails = ({route}) => {
  const {_id, monthName, year} = route.params;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const {data} = await instance.get(`/record/single/${_id}`);
        if (data.success) {
          setData(data.data);
        }
      } catch (error) {
        if (error.errorType !== CONNECTION_ERROR) {
          Snackbar.show(
            defaultSnackbarOptions(error.response?.data?.message, danger),
          );
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <Header headingText={`${monthName} ${year}`} />
      {loading ? (
        <DotsLoading containerStyle={{marginTop: verticalScale(200)}} />
      ) : (
        <ScrollView
          style={{padding: moderateScale(10)}}
          showsVerticalScrollIndicator={false}>
          <View style={{marginBottom: moderateScale(20)}}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Month Details</Text>
              <View style={styles.infoBox}>
                <KeyValue
                  keyName={'Total Days'}
                  value={`${data.numberOfDays} days`}
                />
                <KeyValue
                  keyName={'Previous Wages'}
                  value={`₹ ${data.prevWages}`}
                />
                <KeyValue
                  keyName={'Previous Advance'}
                  value={`₹ ${data.prevAdvance}`}
                />
                <KeyValue
                  keyName={'Current Wages'}
                  value={`₹ ${data.currentWages}`}
                />
                <KeyValue
                  keyName={'Current Advance'}
                  value={`₹ ${data.currentAdvance}`}
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Last Settlement Date</Text>
              <View style={styles.infoBox}>
                {data.lastSettlementDate ? (
                  <>
                    <KeyValue
                      keyName={'Actual Date'}
                      value={`${data.lastSettlementDate.dayDate}`}
                    />
                    <KeyValue
                      keyName={'Performed On'}
                      value={`${data.lastSettlementDate.performedOn}`}
                    />
                    <KeyValue
                      keyName={'Performed Day'}
                      value={`${data.lastSettlementDate.dayName}`}
                    />
                  </>
                ) : (
                  <Text style={styles.noData}>No Settlement done yet</Text>
                )}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Daily Records</Text>
              <View style={styles.infoBox}>
                {data.dailyRecords && data.dailyRecords.length > 0 ? (
                  data.dailyRecords.map(item => (
                    <DayCard
                      key={item._id}
                      item={item}
                      containerStyle={{marginVertical: 0}}
                    />
                  ))
                ) : (
                  <Text style={styles.noData}>No records found</Text>
                )}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Settlements</Text>
              <View style={styles.infoBox}>
                {data.settlements && data.settlements.length > 0 ? (
                  data.settlements.map(item => (
                    <View key={item._id} style={styles.settlementCard}>
                      <Text style={styles.text}>On Date {item.dayDate}</Text>
                      <KeyValue
                        keyName={'Amount Taken'}
                        value={`₹ ${item.amountTaken}`}
                      />
                      <KeyValue
                        keyName={'Wages Occured'}
                        value={`₹ ${item.wagesOccured}`}
                      />
                      <KeyValue
                        keyName={'Advance Occured'}
                        value={`₹ ${item.advanceOccured}`}
                      />
                      <KeyValue
                        keyName={'Wages Transferred'}
                        value={`₹ ${item.wagesTransferred}`}
                      />
                      <KeyValue
                        keyName={'Advance Transferred'}
                        value={`₹ ${item.advanceTransferred}`}
                      />
                    </View>
                  ))
                ) : (
                  <Text style={styles.noData}>No settlements found</Text>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const KeyValue = ({keyName, value}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: verticalScale(2),
      }}>
      <Text style={{color: dark_light_l1, fontSize: moderateScale(18)}}>
        {keyName} :{' '}
      </Text>
      <Text style={{color: theme_secondary, fontSize: moderateScale(20)}}>
        {value}
      </Text>
    </View>
  );
};

export default RecordDetails;

const styles = StyleSheet.create({
  section: {
    // backgroundColor: "red"
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(10),
  },
  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: theme_primary,
    marginBottom: verticalScale(4),
  },
  infoBox: {
    backgroundColor: 'white',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: moderateScale(5),
  },
  noData: {
    color: dark_light_l2,
    fontSize: moderateScale(20),
    textAlign: 'center',
  },
  settlementCard: {
    marginBottom: verticalScale(10),
  },
  text: {
    color: dark_light_l1,
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    textTransform: 'capitalize',
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: dark_light_l2,
    paddingHorizontal: scale(5),
    marginBottom: verticalScale(5),
  },
});
