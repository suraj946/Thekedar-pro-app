import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  dark,
  dark_light_l1,
  dark_light_l2,
  light,
  theme_secondary,
  white,
} from '../../styles/colors';
import Header from '../../components/Header';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import TabComponent from '../../components/TabComponent';
import {useCurrentDate, useGetALlRecords} from '../../utils/hooks';
import {useNavigation} from '@react-navigation/native';
import {MONTH} from '../../utils/constants';
import {Icon} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {getAllRecordsOfYear} from '../../redux/actions/monthlyRecordAction';
import DotsLoading from '../../components/DotsLoading';

const getTabsValue = (joinedYear, currentYear) => {
  const tabs = [];
  for (let i = currentYear; i >= joinedYear; i--) {
    tabs.push({value: i, text: i.toString()});
  }
  return tabs;
};


const AllRecords = ({route}) => {
  const {workerId, name, joinedYear} = route.params;
  const {year} = useCurrentDate();
  const [selectedYear, setSelectedYear] = useState(year);
  const {getRecords, ifRecordExist, loading} = useGetALlRecords(workerId);
  const dispatch = useDispatch();
  const data = getRecords(selectedYear);

  useEffect(() => {
    if (ifRecordExist(selectedYear)) return;
    dispatch(getAllRecordsOfYear(workerId, selectedYear));
  }, [workerId, selectedYear]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={white} />
      <Header headingText={name} />
      <View style={styles.container}>
        <TabComponent
          selectedTab={selectedYear}
          setSelectedTab={setSelectedYear}
          tabs={getTabsValue(joinedYear, year)}
          disabled={loading}
        />
        {loading ? (
          <DotsLoading containerStyle={{marginTop: verticalScale(200)}} />
        ) : (
          <>
            {data.length > 0 && <Text style={styles.heading}>
              Showing records of {selectedYear}
            </Text>}
            <View style={styles.cardContainer}>
              <FlatList
                data={data}
                renderItem={({item}) => <MonthCard _id={item._id} monthName={MONTH[item.monthIndex]} year={selectedYear} />}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => <Text style={{fontSize: moderateScale(25), color:dark_light_l2, marginTop: verticalScale(200), alignSelf: 'center'}}>No records found</Text>}
              />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const MonthCard = ({_id = '', monthName = '', year}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => navigation.navigate('RecordDetails', {_id, monthName, year})}>
      <View style={styles.card}>
        <Icon
          size={moderateScale(30)}
          color={theme_secondary}
          source={'calendar-month-outline'}
        />
        <Text style={styles.label}>{monthName}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AllRecords;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
  },
  heading: {
    fontSize: moderateScale(25),
    color: dark,
    marginTop: verticalScale(10),
    fontWeight: 'bold',
  },
  cardContainer: {
    marginTop: verticalScale(15),
  },

  // card
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(8),
    paddingHorizontal: scale(15),
    backgroundColor: light,
    borderRadius: moderateScale(5),
    marginBottom: verticalScale(5),
  },
  label: {
    fontSize: moderateScale(20),
    textTransform: 'capitalize',
    color: dark_light_l1,
    marginLeft: scale(10),
  },
});
