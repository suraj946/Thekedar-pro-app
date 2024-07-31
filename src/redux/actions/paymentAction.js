import Snackbar from "react-native-snackbar";
import { danger } from "../../styles/colors";
import instance from "../../utils/axiosInstance";
import { CONNECTION_ERROR } from "../../utils/constants";
import { defaultSnackbarOptions } from "../../utils/helpers";

export const createPayment = async (formDate) => {
  try{
    const {data} = await instance.post("/payment/create", formDate);
    if(data.success){
      Snackbar.show(defaultSnackbarOptions(data.message));
      return data.data;
    }
  }catch(error){
    if(error.errorType !== CONNECTION_ERROR){
      Snackbar.show(defaultSnackbarOptions(error.response?.data?.message, danger));
    } 
    return false;
  }
}

export const updatePayment = async (paymentId, formDate) => {
  try{
    const {data} = await instance.put(`/payment/single/${paymentId}`, formDate);
    if(data.success){
      Snackbar.show(defaultSnackbarOptions(data.message));
      return data.data;
    }
  }catch(error){
    if(error.errorType !== CONNECTION_ERROR){
      Snackbar.show(defaultSnackbarOptions(error.response?.data?.message, danger));
    } 
    return false;
  }
}

export const deletePayment = async (paymentId) => {
  try{
    const {data} = await instance.delete(`/payment/single/${paymentId}`);
    if(data.success){
      Snackbar.show(defaultSnackbarOptions(data.message));
      return true;
    }
  }catch(error){
    if(error.errorType !== CONNECTION_ERROR){
      Snackbar.show(defaultSnackbarOptions(error.response?.data?.message, danger));
    } 
    return false;
  }
}