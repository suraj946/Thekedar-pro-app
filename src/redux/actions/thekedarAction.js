import Snackbar from "react-native-snackbar";
import instance from "../../utils/axiosInstance"
import { CONNECTION_ERROR, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../../utils/constants";
import { updateNetStatus } from "../slices/netInfoSlice";
import { defaultSnackbarOptions } from "../../utils/helpers";
import { danger } from "../../styles/colors";

export const registerUser = (formData) => async(dispatch)=>{
    try {
        dispatch({type:REGISTER_REQUEST});
        const {data} = await instance.post("/register", formData, {withCredentials:false});
        console.log(data);
        if(data.success){
            dispatch({type:REGISTER_SUCCESS, payload:data?.data});
        }
    } catch (error) {
        if(error.errorType === CONNECTION_ERROR){
            Snackbar.show(defaultSnackbarOptions("No internet connection", danger));
            return;
        }
        dispatch({type:REGISTER_FAIL, payload:error.response.data?.message});
    }
}

// export const loadUser = () => async(dispatch)=>{
//     try {
//         const {data} = await instance.get("/todos/1");
//         console.log(data);
//     } catch (error) {
//         if(error.errorType === CONNECTION_ERROR){
//             Snackbar.show(defaultSnackbarOptions("No internet connection", danger))
//         }
//     }
// }