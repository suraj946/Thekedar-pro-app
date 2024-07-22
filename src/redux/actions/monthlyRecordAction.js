import Snackbar from "react-native-snackbar";
import instance from "../../utils/axiosInstance";
import { ALL_RECORDS_FAIL, ALL_RECORDS_REQUEST, ALL_RECORDS_SUCCESS, CONNECTION_ERROR, EVENT_FAIL, EVENT_REQUEST, EVENT_SUCCESS } from "../../utils/constants";
import { defaultSnackbarOptions } from "../../utils/helpers";
import { danger } from "../../styles/colors";
import { addToEvent } from "../slices/recordSlice";

export const addAttendance = async(workersData) => {
  try {
    const {data} = await instance.post('/record/create-attendance', workersData);
    if(data.success){
      Snackbar.show(defaultSnackbarOptions(data.message));
      return data.data;
    }
  } catch (error) {
    if(error.errorType !== CONNECTION_ERROR){
      Snackbar.show(defaultSnackbarOptions(error.response?.data?.message, danger));
      return false;
    }
  }
}

export const checkAttendanceForToday = async(recordId) => {
  try {
    const {data} = await instance.get(`/record/check-attendence/${recordId}`);
    if(data.success){
      return data.data.isDone;
    }
  } catch (error) {
    if(error.errorType !== CONNECTION_ERROR){
      Snackbar.show(defaultSnackbarOptions(error.response?.data?.message, danger));
      return "error";
    }
  }
}

export const getMonthEvents = (workerId, monthIndex) => async dispatch => {
  try {
    dispatch({type:EVENT_REQUEST});
    const {data} = await instance.get(
      `/record/calendar-events/${workerId}?monthIndex=${monthIndex}`,
    );
    if (data.success) {
      dispatch({type:EVENT_SUCCESS, payload:{monthIndex, workerId, event:data.data}});
    }
  } catch (error) {
    if (error.errorType !== CONNECTION_ERROR) {
      Snackbar.show(
        defaultSnackbarOptions(error.response?.data?.message, danger),
      );
      dispatch({type:EVENT_FAIL});
    }
  }
}

export const getAllRecordsOfYear = (workerId, year) => async dispatch => {
  try {
    dispatch({type:ALL_RECORDS_REQUEST});
    const {data} = await instance.get(`/record/all?workerId=${workerId}&year=${year}`);
    if (data.success) {
      dispatch({type:ALL_RECORDS_SUCCESS, payload:{year, data: data.data, workerId}});
    }
  } catch (error) {
    if (error.errorType !== CONNECTION_ERROR) {
      Snackbar.show(
        defaultSnackbarOptions(error.response?.data?.message, danger),
      );
      dispatch({type:ALL_RECORDS_FAIL});
    }
  }
}

