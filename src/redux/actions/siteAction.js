import Snackbar from "react-native-snackbar";
import { danger } from "../../styles/colors";
import instance from "../../utils/axiosInstance";
import {
  CONNECTION_ERROR,
  GET_SITES_FAIL,
  GET_SITES_REQUEST,
  GET_SITES_SUCCESS,
  SINGLE_SITE_FAIL,
  SINGLE_SITE_REQUEST,
  SINGLE_SITE_SUCCESS
} from "../../utils/constants";
import { defaultSnackbarOptions } from "../../utils/helpers";

export const getAllSites = () => async dispatch => {
  try {
    dispatch({type: GET_SITES_REQUEST});
    const {data} = await instance.get("/site/all");
    if(data.success){
      dispatch({type: GET_SITES_SUCCESS, payload: data.data});
    }
  } catch (error) {
    if(error.errorType !== CONNECTION_ERROR){
      Snackbar.show(defaultSnackbarOptions(error.response?.data?.message, danger));
    } 
    dispatch({type: GET_SITES_FAIL});
  }
}

export const createSite = async(siteName, address) => {
  try {
    const {data} = await instance.post("/site/create", {siteName, address});
    if(data.success){
      Snackbar.show(defaultSnackbarOptions(data.message));
      return data.data;
    }
  } catch (error) {
    if(error.errorType !== CONNECTION_ERROR){
      Snackbar.show(defaultSnackbarOptions(error.response?.data?.message, danger));
    } 
    return null;
  }
}

export const updateSite = async(siteName, address, siteId) => {
  try {
    const {data} = await instance.put(`/site/single/${siteId}`, {siteName, address});
    if(data.success){
      Snackbar.show(defaultSnackbarOptions(data.message));
      return true;
    }
  } catch (error) {
    if(error.errorType !== CONNECTION_ERROR){
      Snackbar.show(defaultSnackbarOptions(error.response?.data?.message, danger));
    } 
    return false;
  }
}

export const deleteSite = async(siteId, deletePayments) => {
  try {
    const {data} = await instance.delete(`/site/single/${siteId}?deletePayments=${deletePayments}`);
    if(data.success){
      Snackbar.show(defaultSnackbarOptions(data.message));
      return true;
    }
  } catch (error) {
    if(error.errorType !== CONNECTION_ERROR){
      Snackbar.show(defaultSnackbarOptions(error.response?.data?.message, danger));
    } 
    return false;
  }
}

export const getSingleSite = (siteId) => async dispatch => {
  try {
    dispatch({type: SINGLE_SITE_REQUEST});
    const {data} = await instance.get(`/site/single/${siteId}`);
    if(data.success){
      dispatch({type: SINGLE_SITE_SUCCESS, payload: data.data});
    }
  } catch (error) {
    if(error.errorType !== CONNECTION_ERROR){
      Snackbar.show(defaultSnackbarOptions(error.response?.data?.message, danger));
    } 
    dispatch({type: SINGLE_SITE_FAIL});
  }
}