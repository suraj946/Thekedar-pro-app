import {createSlice} from '@reduxjs/toolkit';
import { CLEAR_ERROR, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from '../../utils/constants';

const initialState = {
  isAuthenticated: false,
  loading: false,
  thekedar:{},
  error:null
};

export const thekedarSlice = createSlice({
  name: 'thekedar',
  initialState,
  reducers: {},
  extraReducers : (builder) => {
    builder
    .addCase(REGISTER_SUCCESS, (state, action) => {
      state.isAuthenticated = true;
      state.thekedar = action.payload;
    })
    .addCase(LOAD_USER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(LOAD_USER_SUCCESS, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.thekedar = action.payload;
    })
    .addCase(LOAD_USER_FAIL, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload
    })
    .addCase(CLEAR_ERROR, (state) => {
        console.log("Running clear error");
        state.error = null;
    })
  }
});

export default thekedarSlice.reducer;