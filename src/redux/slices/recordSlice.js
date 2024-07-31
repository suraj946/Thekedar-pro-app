import { createSlice } from '@reduxjs/toolkit';
import { ALL_RECORDS_FAIL, ALL_RECORDS_REQUEST, ALL_RECORDS_SUCCESS, EVENT_FAIL, EVENT_REQUEST, EVENT_SUCCESS, RESET_RECORDS, SET_LOADING } from '../../utils/constants';

const initialState = {
  events:{},
  loading: false,
};

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  extraReducers: builder => {
    builder.addCase(EVENT_REQUEST, state => {
      state.loading = true;
    })
    .addCase(EVENT_SUCCESS, (state, action) => {
      state.loading = false;
      const {monthIndex, workerId, event} = action.payload;
      if(state?.events[workerId]){
        state.events[workerId][monthIndex] = event;
      }else{
        const arr = new Array(12).fill(null);
        arr[monthIndex] = event;
        state.events[workerId] = arr;
      }
    })
    .addCase(EVENT_FAIL, state => {
      state.loading = false;
    });
  }
});
const eventReducer = eventSlice.reducer;

const allRecordsSlice = createSlice({
  name: 'allRecords',
  initialState:{
    loading: false,
    data:{},
    workerId: null,
  },
  extraReducers: builder => {
    builder.addCase(ALL_RECORDS_REQUEST, state => {
      state.loading = true;
    })
    .addCase(ALL_RECORDS_SUCCESS, (state, action) => {
      state.loading = false;
      const {year, data, workerId} = action.payload;
      state.data[year] = data;
      state.workerId = workerId;
    })
    .addCase(ALL_RECORDS_FAIL, state => {
      state.loading = false;
    })
    .addCase(RESET_RECORDS, state => {
      state.data = {};
      state.workerId = null;
    })
    .addCase(SET_LOADING, (state, action) => {
      state.loading = action.payload;
    });
  }
});
const allRecordsReducer = allRecordsSlice.reducer;

export {
  eventReducer,
  allRecordsReducer,
}
