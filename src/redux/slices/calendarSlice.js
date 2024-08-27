import { createSlice } from "@reduxjs/toolkit";

export const calendarUtilSlice = createSlice({
  initialState: {
    selectedRecord: {},
  },
  name: "calendar-util",
  reducers: { 
    setRecordData: (state, action) => {
      state.selectedRecord = {...state.selectedRecord, ...action.payload};
    },

  }
});

export const { setRecordData } = calendarUtilSlice.actions;
const calendarUtilReducer = calendarUtilSlice.reducer;

export{
  calendarUtilReducer
}