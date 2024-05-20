import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';
import { danger, theme_secondary, white } from '../styles/colors';

const StatusCode = ({code, text="not found"}) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {code.split('').map((c, i) => (
          <View key={i} style={styles.icon}>
            <Icon
              source={`numeric-${c}`}
              size={moderateScale(100)}
              color={danger}
            />
          </View>
        ))}
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default StatusCode;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    position: 'relative',
    backgroundColor: theme_secondary,
    borderRadius: moderateScale(50),
    marginBottom: moderateScale(10),
    height: moderateScale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    top: moderateScale(-70),
  },
  text: {
    color: white,
    fontSize: moderateScale(30),
    textTransform:"capitalize"
  },
});
