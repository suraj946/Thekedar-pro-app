import { info, white } from "../styles/colors"
import {LENGTH_SHORT} from "react-native-snackbar"
const defaultSnackbarOptions = (text, bgColor=info, textColor=white, duration=LENGTH_SHORT) => {
  if(typeof text === "undefined"){
    throw new Error("params text is required in snackbar")
  }

  return {
    text:text,
    backgroundColor:bgColor,
    textColor:textColor,
    duration:duration,
    marginBottom:5
  }
}

export {
  defaultSnackbarOptions,
}