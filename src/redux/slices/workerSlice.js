import { createSlice } from '@reduxjs/toolkit';
import {
  ADD_SINGLE_WORKER,
  ADD_WORKER_FOR_ATTENDANCE,
  ADD_WORKER_FOR_NEW_RECORD,
  GET_WORKER_FAIL,
  GET_WORKER_REQUEST,
  GET_WORKER_SUCCESS,
  UPDATE_AFTER_ATTENDANCE,
  UPDATE_SINGLE_WORKER,
  UPDATE_WORKER_FOR_NEW_RECORD,
} from '../../utils/constants';

const workersSlice = createSlice({
  name: "worker",
  initialState : {
    loading:false,
    workers: [],
    nonActiveWorkers: [],
    workerForAttendance: [],
    workerFetched:false,
  },
  extraReducers: builder => {
    builder.addCase(GET_WORKER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(GET_WORKER_SUCCESS, (state, action) => {
      state.loading = false;
      state.workers = action.payload.activeWorkers;
      state.nonActiveWorkers = action.payload.inactiveWorkers;
      state.workerFetched = true;
    })
    .addCase(GET_WORKER_FAIL, (state) => {
      state.loading = false;
    })
    .addCase(ADD_WORKER_FOR_ATTENDANCE, (state, action) => {
      state.workerForAttendance = action.payload;
    })
    .addCase(UPDATE_AFTER_ATTENDANCE, (state, action) => {
      state.workerForAttendance = state.workerForAttendance.filter(w => !action.payload.includes(w._id));
    })
  }
});

const workersReducer = workersSlice.reducer;

const singleWorkerSlice = createSlice({
  name: "singleWorker",
  initialState : {
    worker:null
  },
  extraReducers: builder => {
    builder.addCase(ADD_SINGLE_WORKER, (state, action) => {
      state.worker = action.payload;
    })
    .addCase(UPDATE_SINGLE_WORKER, (state, action) => {
      state.worker = {...state.worker, ...action.payload};
    })
  }
});
const singleWorkerReducer = singleWorkerSlice.reducer;


const workersForNewRecord = createSlice({
  name: "workersForNewRecord",
  initialState : {
    workers:[],
  },
  extraReducers: builder => {
    builder.addCase(ADD_WORKER_FOR_NEW_RECORD, (state, action) => {
      state.workers = action.payload;
    })
    .addCase(UPDATE_WORKER_FOR_NEW_RECORD, (state, action) => {
      const temp = state.workers.filter(w => w._id !== action.payload);
      state.workers = temp;
    })
  }
});
const workersForNewRecordReducer = workersForNewRecord.reducer;

export {
  singleWorkerReducer, workersForNewRecordReducer, workersReducer
};

