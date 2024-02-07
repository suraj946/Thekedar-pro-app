import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  selectedWorkers: new Set(),
  count: 0,
};

export const selectedWorkerSlice = createSlice({
  name: 'selectedWorkers',
  initialState,
  reducers: {
    addWorkerSingle: (state, action) => {
      state.selectedWorkers.add(action.payload);
      state.count += 1;
    },
    removeWorkerSingle: (state, action) => {
      state.selectedWorkers.delete(action.payload);
      state.count -= 1;
    },
    addWorkerAll: (state, action) => {
      state.selectedWorkers = new Set(action.payload);
      state.count = action.payload?.length;
    },
    removeWorkerAll: state => {
      state.selectedWorkers = new Set();
      state.count = 0;
    },
  },
});

export const {
  addWorkerSingle,
  removeWorkerSingle,
  addWorkerAll,
  removeWorkerAll,
} = selectedWorkerSlice.actions;
export default selectedWorkerSlice.reducer;
