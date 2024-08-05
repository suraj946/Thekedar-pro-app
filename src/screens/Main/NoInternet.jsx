import React from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import ContainedBtn from '../../components/ContainedBtn';
import { dark_light_l1, dark_light_l2, light, theme_primary } from '../../styles/colors';

const NoInternet = ({refresh, setRefresh}) => {
  const gotoSetting = () => {
    Linking.sendIntent('android.settings.WIFI_SETTINGS');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: light}}>
      <StatusBar backgroundColor={light} barStyle={'dark-content'} />
      <View style={styles.container}>
        <Image source={require("../../assests/noInternet.webp")} style={styles.image} />
        <Text style={styles.headText}>Wooops!</Text>
        <Text style={styles.subText}>No Internet Connection Found</Text>
        <Text style={styles.subText}>Check your connection</Text>
        <ContainedBtn
          handler={() => setRefresh(!refresh)}
          style={{marginTop: verticalScale(30), width: '90%', borderRadius: moderateScale(50)}}
          title="Refresh"
        />
        <Text onPress={gotoSetting} style={styles.belowText}>Go to Settings</Text>
      </View>
    </SafeAreaView>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: scale(10),
    height: '90%',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    height: verticalScale(200),
  },
  headText: {
    color: dark_light_l1,
    fontSize: moderateScale(45),
    marginVertical: verticalScale(5),
    fontWeight: '600',
    letterSpacing: scale(5),
  },  
  subText: {
    color: dark_light_l2,
    fontSize: moderateScale(19),
    lineHeight: verticalScale(20),
  },
  belowText: {
    color: theme_primary,
    fontSize: moderateScale(18),
    borderBottomWidth: 1,
    borderColor: theme_primary,
    paddingHorizontal: scale(3),
    marginTop: verticalScale(15),
    textTransform: 'uppercase',
  },
});
