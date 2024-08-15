import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import {
  dark_light_l1,
  dark_light_l2,
  white
} from '../styles/colors';

const SocialButtons = ({
  handleGoogleSignIn = () => {},
  handleFBSignIn = () => {},
  loading = false,
}) => {
  return (
    <>
      <Text style={styles.orTxt}>OR</Text>
      <Text style={{
        textAlign: 'center',
        color: dark_light_l1,
        fontSize: moderateScale(18),
        marginBottom: verticalScale(10)
      }}>Sign in with</Text>
      <View style={styles.socialView}>
        <SButton
          icon={require('../assests/google.png')}
          text={'Google'}
          disabled={loading}
          onPress={handleGoogleSignIn}
        />
      </View>
    </>
  );
};

const SButton = ({
  icon,
  text,
  onPress = () => {},
  disabled,
  containerStyle = {},
  textStyle = {},
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.sBtn,
        containerStyle,
        {backgroundColor: disabled ? dark_light_l2 : white},
      ]}>
      <Image style={styles.socialIcon} source={icon} />
      <Text style={[styles.socialText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SocialButtons;

const styles = StyleSheet.create({
  orTxt: {
    textAlign: 'center',
    color: dark_light_l2,
    fontSize: moderateScale(20),
    marginTop: verticalScale(10),
  },
  socialView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  sBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(5),
    paddingVertical: verticalScale(2),
    paddingHorizontal: scale(10),
  },
  socialIcon: {
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
    borderRadius: moderateScale(30),
  },
  socialText: {
    color: dark_light_l1,
    fontSize: moderateScale(20),
    marginLeft: scale(10),
  },
});
