import {createSlice} from '@reduxjs/toolkit';
import {
  ADD_SINGLE_WORKER,
    ADD_WORKER_FOR_NEW_RECORD,
    CLEAR_ERROR,
    FILTER_WORKER_FOR_ATTENDANCE,
    GET_WORKER_FAIL,
    GET_WORKER_REQUEST,
    GET_WORKER_SUCCESS_ACTIVE,
    GET_WORKER_SUCCESS_NON_ACTIVE,
    UPDATE_SINGLE_WORKER,
    UPDATE_WORKER_FOR_NEW_RECORD,
    WORKER_FOR_ATTENDANCE_FAIL,
    WORKER_FOR_ATTENDANCE_REQUEST,
    WORKER_FOR_ATTENDANCE_SUCCESS,
} from '../../utils/constants';

const initialState = {
    loading: false,
    workersData: [],
    error: null,
};

const workerForAttendanceSlice = createSlice({
    name: 'workerForAttendance',
    initialState,
    extraReducers: builder => {
      builder
        .addCase(WORKER_FOR_ATTENDANCE_REQUEST, state => {
          state.loading = true;
        })
        .addCase(WORKER_FOR_ATTENDANCE_SUCCESS, (state, action) => {
          state.loading = false;
          state.workersData = action.payload;
        })
        .addCase(FILTER_WORKER_FOR_ATTENDANCE, (state, action) => {
          const temp = state.workersData.filter(w => w._id !== action.payload);
          state.workersData = temp;
        })
        .addCase(WORKER_FOR_ATTENDANCE_FAIL, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(CLEAR_ERROR, state => {
          state.error = null;
        });
    },
});
const workerForAttendanceReducer = workerForAttendanceSlice.reducer;

const workersSlice = createSlice({
  name: "worker",
  initialState : {
    loading:false,
    workers: [],
    nonActiveWorkers: [],
    activeFetched:false,
    nonActiveFetched:false
  },
  extraReducers: builder => {
    builder.addCase(GET_WORKER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(GET_WORKER_SUCCESS_ACTIVE, (state, action) => {
      state.loading = false;
      state.workers = action.payload;
      state.activeFetched = true;
    })
    .addCase(GET_WORKER_SUCCESS_NON_ACTIVE, (state, action) => {
      state.loading = false;
      state.nonActiveWorkers = action.payload;
      state.nonActiveFetched = true;
    })
    .addCase(GET_WORKER_FAIL, (state) => {
      state.loading = false;
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
      console.log('updating');
      const temp = state.workers.filter(w => w._id !== action.payload);
      state.workers = temp;
    })
  }
});
const workersForNewRecordReducer = workersForNewRecord.reducer;

export {
  workerForAttendanceReducer,
  workersReducer,
  singleWorkerReducer,
  workersForNewRecordReducer,
}
