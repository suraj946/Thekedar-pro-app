import {configureStore, combineReducers} from '@reduxjs/toolkit';
import thekedarReducer from './slices/thekedarSlice';
import {
    singleWorkerReducer,
    workerForAttendanceReducer,
    workersForNewRecordReducer,
    workersReducer,
} from './slices/workerSlice';
import {LOGOUT_SUCCESS} from '../utils/constants';

const appReducer = combineReducers({
    thekedar: thekedarReducer,
    workerForAttendance: workerForAttendanceReducer,
    workers: workersReducer,
    singleWorker: singleWorkerReducer,
    workersForNewRecord: workersForNewRecordReducer,
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        return appReducer(undefined, action);
    }

    return appReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
});

// export const store = configureStore({
//   reducer: {
//     thekedar:thekedarReducer,
//     workerForAttendance:workerForAttendanceReducer,
//     workers:workersReducer
//   },
// });
