import {configureStore} from '@reduxjs/toolkit';
import selectedWorkersReducer from './slices/workerSlice';

export const store = configureStore({
  reducer: {
    selectedWorkers: selectedWorkersReducer,
  },
});
