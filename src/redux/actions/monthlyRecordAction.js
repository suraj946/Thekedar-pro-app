import Snackbar from "react-native-snackbar";
import instance from "../../utils/axiosInstance";
import { CONNECTION_ERROR } from "../../utils/constants";
import { defaultSnackbarOptions } from "../../utils/helpers";
import { danger } from "../../styles/colors";

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