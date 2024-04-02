import axios from 'axios';
import { getNetInfo } from './helpers';
import { CONNECTION_ERROR } from './constants';

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
            return Promise.reject({
                errorType:CONNECTION_ERROR,
                netInfo
            });
        }
        return config;
    }, (error) => {
        console.log("error in interceptor second cb");
    }
);

export default instance;
