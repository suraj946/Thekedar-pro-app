import React, { memo, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { dark_light_l2, theme_primary, white } from '../styles/colors';
import { MONTH } from '../utils/constants';
import { useCurrentDate } from '../utils/hooks';
import { useDispatch } from 'react-redux';
import { getMonthEvents } from '../redux/actions/monthlyRecordAction';

const windowWidth = Dimensions.get('window').width;

const MonthHeader = ({
    initialMonthIndex=0,
    setCurrentMonthIndex=()=>{},
    workerId
}) => {
  const flatListRef = useRef(null);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(initialMonthIndex+1);
  const {monthIndex} = useCurrentDate();
  const dispatch = useDispatch();

    // console.log(`rendering month ${Math.round(Math.random()*10000)}`);
    
  const handleMonthPress = index => {
    setSelectedMonthIndex(index);
    setCurrentMonthIndex(index-1);
    flatListRef.current?.scrollToIndex({
      animated: true,
      index,
      viewPosition: 0.5,
    });
  };

  const handleLongPress = (index) => {
    if((index-1) !== monthIndex) return;
    dispatch(getMonthEvents(workerId, monthIndex));
  }

  const renderMonth = ({item, index}) => {
    if (item === '') {
      return <View style={styles.transparentView}></View>;
    } else {
      return (
        <TouchableOpacity
          onPress={() => handleMonthPress(index)}
          onLongPress={() => handleLongPress(index)}
          activeOpacity={0.5}
          style={[
            styles.monthContainer,
            index === selectedMonthIndex && styles.selectedMonthContainer,
          ]}>
          <Text
            style={[
              styles.monthText,
              index === selectedMonthIndex && styles.selectedMonthText,
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.headerContainer}>
      <FlatList
        ref={flatListRef}
        data={['', ...MONTH, '']}
        renderItem={renderMonth}
        keyExtractor={(item, idx) => `${item}${idx}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.monthList}
        getItemLayout={(data, index) => ({
          length: windowWidth/3,
          offset: (windowWidth/3) * index,
          index,
        })}
        initialScrollIndex={selectedMonthIndex-1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(3),
    backgroundColor:white
  },
  monthList: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  monthContainer: {
    paddingVertical: verticalScale(5),
    width: windowWidth / 3,
    borderBottomWidth: moderateScale(1.6),
    borderColor: theme_primary,
    justifyContent:"flex-end",
    height:verticalScale(35)
  },
  selectedMonthContainer: {
    backgroundColor: theme_primary,
    justifyContent:"flex-start",
    borderTopLeftRadius:moderateScale(5),
    borderTopRightRadius:moderateScale(5),
  },
  monthText: {
    fontSize: moderateScale(15),
    textAlign: 'center',
    color: dark_light_l2,
    textTransform: 'uppercase',
  },
  selectedMonthText: {
    fontWeight: 'bold',
    color: white,
    fontSize: moderateScale(18),
  },
  transparentView: {
    width: windowWidth / 3,
  },
});

export default memo(MonthHeader);
