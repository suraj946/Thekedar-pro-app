import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { danger } from '../styles/colors'
import { moderateScale, scale } from 'react-native-size-matters'

const Input = ({
    keyboardType="default",
    placeholder="",
    label="",
    disabled=false,
    value,
    onChangeText = () => {},
    errorText="",
    isPassword=false,
    style={}
}) => {
  const [eyeOpen, setEyeOpen] = useState(false)
  return (
    <View style={style}>
      <TextInput 
        keyboardType={keyboardType}
        mode='outlined'
        label={label}
        placeholder={placeholder}
        error={errorText}
        disabled={disabled}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={(isPassword && !eyeOpen)}
        right={isPassword && <TextInput.Icon onPress={() => setEyeOpen(!eyeOpen)} icon={eyeOpen ? "eye" : "eye-off"} />}
      />
      <Text style={styles.errorTextStyle}>{errorText}</Text>
    </View>
  )
}

export default Input;

const styles = StyleSheet.create({
    errorTextStyle:{
        color: danger,
        fontSize: moderateScale(12),
        paddingLeft: scale(5)
    }
});