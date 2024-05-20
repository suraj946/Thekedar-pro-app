import NepaliDate from "nepali-date-converter";
import { info, white } from "../styles/colors";
import {LENGTH_SHORT} from "react-native-snackbar";
import NetInfo from '@react-native-community/netinfo';

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

const getCurrentNepaliDate = () => {
  const {year, month, date, day} = new NepaliDate().getDateObject().BS;
  return {
    year,
    monthIndex:month,
    dayDate:date,
    dayIndex:day
  }
}

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

export {
  defaultSnackbarOptions,
  getCurrentNepaliDate,
  getNetInfo,
  getUniqueIdentifier
}