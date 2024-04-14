import Snackbar from "react-native-snackbar";
import instance from "../../utils/axiosInstance"
import { CONNECTION_ERROR, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../../utils/constants";
import { updateNetStatus } from "../slices/netInfoSlice";
import { defaultSnackbarOptions } from "../../utils/helpers";
import { danger } from "../../styles/colors";
import { deleteCookie } from "../../utils/asyncStorage";

export const logoutUser = (setLoading = ()=>{}, cb = ()=>{}) => async(dispatch)=>{
    try {
        setLoading(true);
        const {data} = await instance.get("/thekedar/logout");
        if(data.success){
            await deleteCookie();
            dispatch({type:LOGOUT_SUCCESS});
            cb();
        }
    } catch (error) {
        if(error.errorType !== CONNECTION_ERROR){
            Snackbar.show(defaultSnackbarOptions(error.response?.data?.message, danger));
            return;
        }
    }finally{
        setLoading(false);
    }
}

export const loadUser = () => async(dispatch)=>{
    try {
        dispatch({type:LOAD_USER_REQUEST})
        const {data} = await instance.get("/thekedar/loaduser");
        if(data.success){
            dispatch({type:LOAD_USER_SUCCESS, payload:data.data});
        }
    } catch (error) {
        if(error.errorType !== CONNECTION_ERROR){
            dispatch({type:LOAD_USER_FAIL, payload:error.response?.data?.message});
        }
    }
}