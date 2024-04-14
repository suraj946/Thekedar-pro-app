import { danger } from '../../styles/colors';
import instance from '../../utils/axiosInstance';
import {
    CONNECTION_ERROR,
    GET_WORKER_FAIL,
    GET_WORKER_REQUEST,
    GET_WORKER_SUCCESS_ACTIVE,
    GET_WORKER_SUCCESS_NON_ACTIVE,
    WORKER_FOR_ATTENDANCE_FAIL,
    WORKER_FOR_ATTENDANCE_REQUEST,
    WORKER_FOR_ATTENDANCE_SUCCESS,
} from '../../utils/constants';
import Snackbar from 'react-native-snackbar'
import { defaultSnackbarOptions } from '../../utils/helpers';

export const getWorkerForAttendance = () => async dispatch => {
  try {
    dispatch({type: WORKER_FOR_ATTENDANCE_REQUEST});
    const {data} = await instance.get('/worker/get-worker-for-attendance');
    if (data.success) {
      dispatch({type: WORKER_FOR_ATTENDANCE_SUCCESS, payload: data.data});
    }
  } catch (error) {
    if (error.errorType !== CONNECTION_ERROR) {
      dispatch({
        type: WORKER_FOR_ATTENDANCE_FAIL,
        payload: error.response?.data?.message,
      });
    }
  }
};

export const getWorkers = (status=true) => async dispatch => {
  try {
    dispatch({type:GET_WORKER_REQUEST});
    const {data} = await instance.get(`/worker/all?status=${status}`);
    if(data.success){
      if(status){
        dispatch({type:GET_WORKER_SUCCESS_ACTIVE, payload:data.data});
      }else{
        dispatch({type:GET_WORKER_SUCCESS_NON_ACTIVE, payload:data.data});
      }
    }
  } catch (error) {
    if (error.errorType !== CONNECTION_ERROR) {
      Snackbar.show(defaultSnackbarOptions(error.response?.data?.message, danger));
      dispatch({
        type: GET_WORKER_FAIL,
      });
    }
  }
} 