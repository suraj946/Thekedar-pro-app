import {configureStore} from '@reduxjs/toolkit';
import thekedarReducer from './slices/thekedarSlice';
import netInfoReducer from './slices/netInfoSlice';

export const store = configureStore({
  reducer: {
    thekedar:thekedarReducer,
    netInfo:netInfoReducer
  },
});
