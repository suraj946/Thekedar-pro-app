import {createSlice} from '@reduxjs/toolkit';
import { danger } from '../styles/colors';
import { getUniqueIdentifier } from '../utils/helpers';

const initialState = {
  message:"This is a message",
  title:"This is a title",
  visible:false,
  cancellable:true,
  buttons:[
    {
      text:"Ok",
      value:"ok"
    },
  ],
  pressedButton:"",
  icon:"alert",
  iconColor:danger,
  alertId:""
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
      showAlert: (state, action) => {
        state.visible = true;
        state.message = action.payload.message || state.message;
        state.title = action.payload.title || state.title;
        if(typeof action.payload.cancellable === 'boolean'){
          state.cancellable = action.payload.cancellable;
        }
        if(action.payload?.buttons){
          if(action.payload?.buttons?.length <= 0 || action.payload?.buttons?.length > 3){
            throw new Error("buttons should be between 1 to 3");
          }
          state.buttons = action.payload.buttons;
        }
        state.icon = action.payload.icon || state.icon;
        state.iconColor = action.payload.iconColor || state.iconColor;
        state.alertId = getUniqueIdentifier();
      },
      hideAlert: (state) => {
        state.visible = false;
        state.message = initialState.message;
        state.title = initialState.title;
        state.cancellable = initialState.cancellable;
        state.buttons = initialState.buttons;
        state.icon = initialState.icon;
        state.iconColor = initialState.iconColor;
      },
      setPressedButton: (state, action) => {
        state.pressedButton = action.payload;
      },
      resetPressedButton: (state) => {
        state.pressedButton = "";
      }
    },
});

// export const {hideAlert, showAlert, setPressedButton, resetPressedButton} = alertSlice.actions;

// export default alertSlice.reducer;
