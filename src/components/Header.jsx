import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-paper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {dark, white} from '../styles/colors';
import {useNavigation} from '@react-navigation/native';

const Header = ({
  headingText = '',
  textAndIconColor = dark,
  hasRight = false,
  rightIcon = 'help',
  rightPressHandler = () => {},
  style={},
  disableBack = false
}) => {
  const navigation = useNavigation();

  const handleLeftPress = () => {
    if(disableBack) return;
    navigation.goBack();
  }
  const handleRightPress = () => {
    if(typeof rightPressHandler !== "function"){
      throw new Error("rightPressHandler is not a function");
    }
    rightPressHandler();
  }
  return (
    <View style={{...styles.container, ...style}}>
      <TouchableOpacity
        style={styles.leftIcon}
        activeOpacity={0.9}
        onPress={handleLeftPress}>
        <Icon
          source={'arrow-left'}
          size={moderateScale(32)}
          color={textAndIconColor}
        />
      </TouchableOpacity>
      <Text numberOfLines={1} style={{...styles.headText, color: textAndIconColor}}>{headingText}</Text>
      {hasRight && (
        <TouchableOpacity style={styles.rightIcon} activeOpacity={0.9} onPress={handleRightPress}>
          <Icon
            source={rightIcon}
            size={moderateScale(32)}
            color={textAndIconColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor:white,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  headText: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    textTransform:"capitalize"
  },
  leftIcon: {
    position: 'absolute',
    left: 8,
  },
  rightIcon: {
    position: 'absolute',
    right: 8,
  },
});
