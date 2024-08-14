import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import Snackbar from "react-native-snackbar";
import { danger, warning } from "../styles/colors";
import { defaultSnackbarOptions } from "./helpers";

GoogleSignin.configure({
  webClientId:
    '1093336375958-jmpm03pbfhop9al199f78h123oguliv4.apps.googleusercontent.com',
});

const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
    switch (error.code) {
      case statusCodes.SIGN_IN_CANCELLED:
        Snackbar.show(defaultSnackbarOptions('Sign in cancelled', warning));
        break;
      case statusCodes.IN_PROGRESS:
        Snackbar.show(defaultSnackbarOptions('Sign in in progress', warning));
        break;
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        Snackbar.show(
          defaultSnackbarOptions('Play services not available', warning),
        );
        break;
      default:
        Snackbar.show(
          defaultSnackbarOptions('Something went wrong', danger),
        )
        break;
    }
    return null;
  }
};

export {
  googleSignIn
};
