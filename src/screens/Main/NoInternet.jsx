import { SafeAreaView, StatusBar, StyleSheet, Text, View, Linking } from 'react-native';
import React from 'react';
import { danger, theme_primary, white } from '../../styles/colors';
import { Icon } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import ContainedBtn from '../../components/ContainedBtn';

const NoInternet = ({refresh, setRefresh}) => {
    const gotoSetting = () => {
        Linking.sendIntent("android.settings.WIFI_SETTINGS");
    }
  return (
    <SafeAreaView style={{flex:1, backgroundColor:white}}>
        <StatusBar backgroundColor={white} barStyle={"dark-content"}/>
        <View style={styles.container}>
            <Icon source={"wifi-off"} size={moderateScale(150)} color={danger}/>
            <Text style={styles.text}>No Internet Connection !!</Text>
            <ContainedBtn handler={gotoSetting} style={{width:"50%", marginTop:verticalScale(20)}} title='Settings'/>
            <ContainedBtn handler={() => setRefresh(!refresh)} style={{width:"50%", marginTop:verticalScale(20)}} title='Refresh'/>
        </View>
    </SafeAreaView>
  )
}

export default NoInternet;

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        paddingHorizontal:scale(10),
        height:"80%",
        justifyContent:"center",
    },
    text:{
        color:danger,
        fontSize:moderateScale(30),
        marginTop:verticalScale(10)
    }
});