import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import CalendarEvent from '../../components/CalendarEvent';
import DaysHeader from '../../components/DaysHeader';
import DotsLoading from '../../components/DotsLoading';
import Header from '../../components/Header';
import MonthHeader from '../../components/MonthHeader';
import RenderCalendar from '../../components/RenderCalendar';
import {getMonthEvents} from '../../redux/actions/monthlyRecordAction';
import {white} from '../../styles/colors';
import {useCurrentDate, useMonthEvent} from '../../utils/hooks';

const Calendar = ({route}) => {
  const {monthIndex} = useCurrentDate();
  const {recordId, workerId, name} = route.params;
  const [currentMonthIndex, setCurrentMonthIndex] = useState(monthIndex);
  const {checkIfEventExists, loading, getEvent} = useMonthEvent();
  const eventDate = getEvent(workerId, currentMonthIndex);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (checkIfEventExists(workerId, currentMonthIndex)) {
        return;
      }
      dispatch(getMonthEvents(workerId, currentMonthIndex));
    })();
  }, [currentMonthIndex, workerId]);

  return (
    <SafeAreaView style={{backgroundColor: white, flex: 1}}>
      <StatusBar backgroundColor={white} barStyle={'dark-content'} />
      <Header headingText={name} />
      <MonthHeader
        initialMonthIndex={currentMonthIndex}
        setCurrentMonthIndex={setCurrentMonthIndex}
        workerId={workerId}
      />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <DotsLoading text="Fetching Events" />
        </View>
      ) : (
        <>
          <View style={styles.container}>
            <DaysHeader currentShowingMonthIndex={currentMonthIndex} />
            <RenderCalendar
              data={eventDate}
              currentShowingMonthIndex={currentMonthIndex}
            />
          </View>
          <CalendarEvent
            data={eventDate}
            workerId={workerId}
            recordId={recordId}
            currentShowingMonthIndex={currentMonthIndex}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(10),
  },
});

export default Calendar;
