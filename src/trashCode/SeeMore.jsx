import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import Header from '../../components/Header'
import { white } from '../../styles/colors'

const SeeMore = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={white} />
      <Header headingText='More Actions'/>
      <View>
        
      </View>
    </SafeAreaView>
  )
}

export default SeeMore

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
});