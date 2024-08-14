import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { dark_light_l2, theme_secondary } from '../styles/colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

const SocialButtons = ({
  handleGoogleSignIn = () => {},
  handleFBSignIn = () => {},
  loading = false,
}) => {
  return (
    <>
      <Text style={styles.orTxt}>OR</Text>
      <View style={styles.socialView}>
        <GoogleSigninButton
          disabled={loading}
          style={styles.googleBtn}
          onPress={handleGoogleSignIn}
        />
        <Text style={styles.fbBtn}>FaceBook</Text>
      </View>
    </>
  );
};

export default SocialButtons;

const styles = StyleSheet.create({
  orTxt: {
    textAlign: 'center',
    color: dark_light_l2,
    fontSize: moderateScale(20),
    marginTop: verticalScale(10), 
    marginBottom: verticalScale(8),
  },
  socialView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  googleBtn: {
    width: '45%',
  },
  fbBtn: {
    color: theme_secondary,
    fontSize: moderateScale(20),
    width: '45%',
  },
});
