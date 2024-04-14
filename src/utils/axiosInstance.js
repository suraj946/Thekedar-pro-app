import axios from 'axios';
import { defaultSnackbarOptions, getNetInfo } from './helpers';
import { CONNECTION_ERROR } from './constants';
import Snackbar from 'react-native-snackbar';
import { danger } from '../styles/colors';
import { getCookie } from './asyncStorage';


const baseUrl = "http://192.168.1.76:4000/api/v1";
// const baseUrl = 'https://jsonplaceholder.typicode.com';

const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

instance.interceptors.request.use(
    async(config) => {
        const netInfo = await getNetInfo();
        if(!netInfo.isConnected || !netInfo.reachable){
            Snackbar.show(defaultSnackbarOptions("No internet connection", danger));
            return Promise.reject({
                errorType:CONNECTION_ERROR,
                netInfo
            });
        }
        const cookie = await getCookie();
        if(cookie){
            config.headers["Authorization"] = `Bearer ${cookie}`
        }
        return config;
    }, (error) => {
        console.log("error in interceptor second error cb");
    }
);

export default instance;
