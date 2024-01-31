import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedWorkers:[],
    count:0
}

export const selectedWorkerSlice = createSlice({
    name:"selectedWorkers",
    initialState,
    reducers:{
        addWorkerSingle: (state, action) => {
            state.selectedWorkers.push(action.payload);
            state.count += 1;
        },
        removeWorkerSingle:(state, action) => {
            state.selectedWorkers = state.selectedWorkers.filter(i => i !== action.payload);
            state.count -= 1;
        },
        addWorkerAll: (state, action) => {
            state.selectedWorkers = [...action.payload];
            state.count = action.payload?.length;
        },
        removeWorkerAll : (state) => {
            state.selectedWorkers = [];
            state.count = 0;
        }
    }
});

export const { 
    addWorkerSingle,
    removeWorkerSingle,
    addWorkerAll,
    removeWorkerAll
} = selectedWorkerSlice.actions;
export default selectedWorkerSlice.reducer;