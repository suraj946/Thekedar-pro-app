// import NepaliDate from "nepali-date-converter";
import { info, white } from "../styles/colors";
import {LENGTH_SHORT} from "react-native-snackbar";
import NetInfo from '@react-native-community/netinfo';
import { DAYS, GOOD_AFTERNOON, GOOD_EVENING, GOOD_MORNING } from "./constants";

const defaultSnackbarOptions = (text, bgColor=info, textColor=white, duration=LENGTH_SHORT) => {
  if(typeof text === "undefined"){
    throw new Error("params text is required in snackbar")
  }

  return {
    text:text,
    backgroundColor:bgColor,
    textColor:textColor,
    duration:duration,
    marginBottom:5
  }
}

// const getCurrentNepaliDate = () => {
//   const {year, month, date, day} = new NepaliDate().getDateObject().BS;
//   return {
//     year,
//     monthIndex:month,
//     dayDate:date,
//     dayIndex:day
//   }
// }

const getNetInfo = async() => {
  const res = await NetInfo.fetch();
    return {
    isConnected : res.isConnected,
    reachable : res.isInternetReachable,
    type : res.type,
    wifiEnabled : res.isWifiEnabled,
  };
}

const getUniqueIdentifier = () => {
  return Math.random().toString(36).substring(2, 15) + Math.round(new Date().getTime() / 1000);
}

const generateEvents = (dailyRecords, dayIndex, numberOfDays) => {
  if (!dailyRecords || !dayIndex || !numberOfDays) {
    return null;
  }
  const monthDetails = new Array(numberOfDays+1).fill(null);
  
  if(dailyRecords.length === 0) {
    for (let i = 1; i < monthDetails.length; i++) {
      monthDetails[i] = {
        date: i,
        dayOfWeek: DAYS[(i + dayIndex - 1) % 7],
        hasAttendence: false,
        hasAdvance: false,
        hasSettlement: false,
      };
    }
    return monthDetails.slice(1);
  }

  dailyRecords.forEach((rec) => {
    const { dayDate, day, advance, presence, settlement } = rec;
    monthDetails[dayDate] = {
      date: dayDate,
      dayOfWeek: day,
      hasAttendence: presence ? true : false,
      hasAdvance: advance ? true : false,
      hasSettlement: settlement ? true : false,
    };
  });

  for (let i = 1; i < monthDetails.length; i++) {
    if (!monthDetails[i]) {
      monthDetails[i] = {
        date: i,
        dayOfWeek: DAYS[(i + dayIndex - 1) % 7],
        hasAttendence: false,
        hasAdvance: false,
        hasSettlement: false,
      };
    }
  }
  return monthDetails.slice(1);
}

const getDayIndex = (currDayDate, dayIndex, newDayDate) => {
  while(currDayDate !== 1){
    currDayDate--;
    dayIndex--;
    if(dayIndex === -1) dayIndex = 6;
  }

  return (newDayDate + dayIndex - 1) % 7;
}

const getGreetings = () => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return GOOD_MORNING;
  } else if (hour < 16) {
    return GOOD_AFTERNOON;
  } else {
    return GOOD_EVENING;
  }
}

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export {
  defaultSnackbarOptions,
  // getCurrentNepaliDate,
  getNetInfo,
  getUniqueIdentifier,
  generateEvents,
  getDayIndex,
  getGreetings,
  capitalize
}