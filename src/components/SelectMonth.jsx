import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MyModal from './MyModal';
import { dark } from '../styles/colors';

const SelectMonth = ({
  visible=false,
  setVisible = () => {},
  heading=""
}) => {
  return (
    <MyModal visible={visible} setVisible={setVisible} heading={heading}>
      <Text style={{color:dark}}>Hii</Text>
    </MyModal>
  )
}

export default SelectMonth;

const styles = StyleSheet.create({});