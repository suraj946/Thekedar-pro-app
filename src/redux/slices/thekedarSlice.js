import { createSlice } from '@reduxjs/toolkit';
import {
  CLEAR_ERROR,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  UPDATE_USER
} from '../../utils/constants';

const initialState = {
    isAuthenticated: false,
    loading: false,
    thekedar: {},
    error: null,
    isInitialCall: false,
    currentDate: {},
    workersCount: 0
};

export const thekedarSlice = createSlice({
    name: 'thekedar',
    initialState,
    reducers: {
        updateWorkersCount: (state, action) => {
            state.workersCount += action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(REGISTER_SUCCESS, (state, action) => {
                state.isAuthenticated = true;
                state.thekedar = action.payload?.thekedar;
                state.isInitialCall = action.payload?.isInitialCall;
                state.currentDate = action.payload?.currentDate;
                state.workersCount = action.payload?.workersCount;
            })
            .addCase(LOGOUT_SUCCESS, state => {
                state.isAuthenticated = false;
                state.thekedar = {};
            })
            .addCase(LOAD_USER_REQUEST, state => {
                state.loading = true;
            })
            .addCase(LOAD_USER_SUCCESS, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.thekedar = action.payload?.thekedar;
                state.isInitialCall = action.payload?.isInitialCall;
                state.currentDate = action.payload?.currentDate;
                state.workersCount = action.payload?.workersCount;
            })
            .addCase(UPDATE_USER, (state, action) => {
                state.thekedar = {...state.thekedar, ...action.payload};
            })
            .addCase(LOAD_USER_FAIL, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload;
            })
            .addCase(CLEAR_ERROR, state => {
                console.log('Running clear error');
                state.error = null;
            });
    },
});

export const { updateWorkersCount } = thekedarSlice.actions;

export default thekedarSlice.reducer;
