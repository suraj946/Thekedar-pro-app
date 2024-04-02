import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isConnected: false,
    reachable: false,
    type:"",
    wifiEnabled:false
};

export const netInfoSlice = createSlice({
    name: 'netInfo',
    initialState,
    reducers: {
        updateNetStatus: (state, action) => {
            state.isConnected = action.payload.isConnected;
            state.reachable = action.payload.reachable;
            state.type = action.payload.type;
            state.wifiEnabled = action.payload.wifiEnabled;
        },
    },
});

export const {updateNetStatus} = netInfoSlice.actions;

export default netInfoSlice.reducer;
