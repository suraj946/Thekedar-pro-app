import {configureStore, combineReducers} from '@reduxjs/toolkit';
import thekedarReducer from './slices/thekedarSlice';
import {
    singleWorkerReducer,
    workersForNewRecordReducer,
    workersReducer,
} from './slices/workerSlice';
import {LOGOUT_SUCCESS} from '../utils/constants';
import {allRecordsReducer, eventReducer} from './slices/recordSlice';
import {singleSiteReducer, siteReducer} from './slices/siteSlice';

const appReducer = combineReducers({
    thekedar: thekedarReducer,
    workers: workersReducer,
    singleWorker: singleWorkerReducer,
    workersForNewRecord: workersForNewRecordReducer,
    events: eventReducer,
    allRecords: allRecordsReducer,
    site: siteReducer,
    singleSite: singleSiteReducer
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

