import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CreateRecordForm = ({route, navigation}) => {
  console.log(route.params.workerId);
  return (
    <View>
      <Text>CreateRecordForm</Text>
    </View>
  )
}

export default CreateRecordForm

const styles = StyleSheet.create({})