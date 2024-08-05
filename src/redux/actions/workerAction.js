import Snackbar from 'react-native-snackbar';
import { danger } from '../../styles/colors';
import instance from '../../utils/axiosInstance';
import {
    ADD_WORKER_FOR_ATTENDANCE,
    CONNECTION_ERROR,
    GET_WORKER_FAIL,
    GET_WORKER_REQUEST,
    GET_WORKER_SUCCESS_ACTIVE,
    GET_WORKER_SUCCESS_NON_ACTIVE,
} from '../../utils/constants';
import { defaultSnackbarOptions } from '../../utils/helpers';

export const getWorkers =
    (status = true) =>
    async dispatch => {
        try {
            dispatch({type: GET_WORKER_REQUEST});
            const {data} = await instance.get(`/worker/all?status=${status}`);
            if (data.success) {
                if (status) {
                    dispatch({
                        type: GET_WORKER_SUCCESS_ACTIVE,
                        payload: data.data,
                    });
                    dispatch({type: ADD_WORKER_FOR_ATTENDANCE, payload: data.data?.filter(w => w.markedToday === false)});
                } else {
                    dispatch({
                        type: GET_WORKER_SUCCESS_NON_ACTIVE,
                        payload: data.data,
                    });
                }
            }
        } catch (error) {
            if (error.errorType !== CONNECTION_ERROR) {
                Snackbar.show(
                    defaultSnackbarOptions(
                        error.response?.data?.message,
                        danger,
                    ),
                );
                dispatch({
                    type: GET_WORKER_FAIL,
                });
            }
        }
    };

export const updateWorker = async (workerId, formData) => {
    try {
        const {data} = await instance.put(
            `/worker/single/${workerId}`,
            formData,
        );
        if (data.success) {
            Snackbar.show(defaultSnackbarOptions(data.message));
            return true;
        }
    } catch (error) {
        if (error.errorType !== CONNECTION_ERROR) {
            Snackbar.show(
                defaultSnackbarOptions(error.response?.data?.message, danger),
            );
        }
        return false;
    }
};
export const deleteWorkers = async workerIds => {
    try {
        const {data} = await instance.post(`/worker/delete`, {workerIds});
        if (data.success) {
            Snackbar.show(defaultSnackbarOptions(data.message));
            return true;
        }
    } catch (error) {
        if (error.errorType !== CONNECTION_ERROR) {
            Snackbar.show(
                defaultSnackbarOptions(error.response?.data?.message, danger),
            );
        }
        return false;
    }
};

export const getSingleWorker = async workerId => {
    try {
        const {data} = await instance.get(`/worker/single/${workerId}`);
        if (data.success) {
            return data.data;
        }
    } catch (error) {
        if (error.errorType !== CONNECTION_ERROR) {
            Snackbar.show(
                defaultSnackbarOptions(error.response?.data?.message, danger),
            );
        }
        return null;
    }
};

