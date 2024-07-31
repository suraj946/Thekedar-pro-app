import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { trigger } from 'react-native-haptic-feedback';
import { Icon } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Snackbar from 'react-native-snackbar';
import { useDispatch } from 'react-redux';
import DotsLoading from '../../components/DotsLoading';
import Header from '../../components/Header';
import MyAlert from '../../components/MyAlert';
import TabComponent from '../../components/TabComponent';
import { deleteMonthlyRecords, getAllRecordsOfYear } from '../../redux/actions/monthlyRecordAction';
import {
  danger,
  dark,
  dark_light_l1,
  dark_light_l2,
  light,
  theme_secondary,
  warning,
  white
} from '../../styles/colors';
import { MONTH } from '../../utils/constants';
import { defaultSnackbarOptions } from '../../utils/helpers';
import {
  useCurrentDate,
  useGetALlRecords,
  useSelectionSystem,
} from '../../utils/hooks';

const getTabsValue = (joinedYear, currentYear) => {
  const tabs = [];
  for (let i = currentYear; i >= joinedYear; i--) {
    tabs.push({value: i, text: i.toString()});
  }
  return tabs;
};

const AllRecords = ({route}) => {
  const {workerId, name, joinedYear} = route.params;
  const {year, monthIndex} = useCurrentDate();
  const [selectedYear, setSelectedYear] = useState(year);
  const {getRecords, ifRecordExist, loading, setLoading} = useGetALlRecords(workerId);
  const dispatch = useDispatch();
  const data = getRecords(selectedYear);
  const {selectedItem, count, selectSingle, deSelectSingle, deselectAll} =
    useSelectionSystem(data);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({});

  useEffect(() => {
    if (ifRecordExist(selectedYear)) return;
    dispatch(getAllRecordsOfYear(workerId, selectedYear));
  }, [workerId, selectedYear]);

  const handleDelete = () => {
    setAlertVisible(true);
    setAlertData({
      title: 'Delete Selected Records ?',
      message:
        'This will delete the selected records. Are you sure you want to delete?',
      icon: 'delete',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: async () => {
            setLoading(true);
            const response = await deleteMonthlyRecords([...selectedItem], workerId);
            if(response){
              dispatch(getAllRecordsOfYear(workerId, selectedYear));
              deselectAll();
            }
          },
        },
      ],
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={white} />
      <MyAlert
        visible={alertVisible}
        setVisible={setAlertVisible}
        {...alertData}
      />
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
            {data.length > 0 && (
              <Text style={styles.heading}>
                Showing records of {selectedYear}
              </Text>
            )}
            <View style={styles.cardContainer}>
              <FlatList
                data={data}
                renderItem={({item}) => (
                  <MonthCard
                    _id={item._id}
                    monthIndex={item.monthIndex}
                    currentMonthIndex={monthIndex}
                    currentYear={year}
                    year={selectedYear}
                    selected={selectedItem.has(item._id)}
                    isAnySelected={count > 0}
                    selectSingle={selectSingle}
                    deSelectSingle={deSelectSingle}
                  />
                )}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                  <Text
                    style={{
                      fontSize: moderateScale(25),
                      color: dark_light_l2,
                      marginTop: verticalScale(200),
                      alignSelf: 'center',
                    }}>
                    No records found
                  </Text>
                )}
              />
            </View>
          </>
        )}
      </View>
      {count > 0 && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.deleteButton}
          onPress={handleDelete}>
          <Icon source={'delete'} size={moderateScale(35)} color={white} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const MonthCard = ({
  _id = '',
  monthIndex,
  currentMonthIndex,
  year,
  currentYear,
  selected = false,
  isAnySelected,
  selectSingle,
  deSelectSingle,
}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (selected) {
      if (typeof deSelectSingle !== 'function') {
        throw new Error('deSelectSingle should be a function');
      }
      deSelectSingle(_id);
    } else {
      if (typeof selectSingle !== 'function') {
        throw new Error('selectSingle should be a function');
      }
      if (currentYear === year && currentMonthIndex === monthIndex) {
        Snackbar.show(
          defaultSnackbarOptions("You can't select the running month", warning),
        );
        return;
      }
      selectSingle(_id);
    }
  };

  const handleLongPress = () => {
    if (!isAnySelected) {
      trigger('impactMedium', {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      });
    }
    handlePress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onLongPress={handleLongPress}
      onPress={
        isAnySelected
          ? handlePress
          : () =>
              navigation.navigate('RecordDetails', {
                _id,
                monthName: MONTH[monthIndex],
                year,
              })
      }>
      <View style={{...styles.card, opacity: selected ? 0.7 : 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            size={moderateScale(30)}
            color={theme_secondary}
            source={'calendar-month-outline'}
          />
          <Text style={styles.label}>{MONTH[monthIndex]}</Text>
        </View>
        {selected && (
          <Icon
            size={moderateScale(30)}
            color={theme_secondary}
            source={'check-circle'}
          />
        )}
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
    justifyContent: 'space-between',
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
  deleteButton: {
    position: 'absolute',
    bottom: verticalScale(20),
    right: scale(20),
    backgroundColor: danger,
    borderRadius: moderateScale(50),
    padding: moderateScale(10),
    elevation: 10,
  },
});
