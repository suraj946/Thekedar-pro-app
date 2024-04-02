import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import DotsLoading from '../../components/DotsLoading';
import { theme_primary, white } from '../../styles/colors';

// const height = Dimensions.get("window").height;

const LoadingScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme_primary}}>
      <StatusBar backgroundColor={white} barStyle={'dark-content'} />
      <View style={styles.mainView} />
      <View style={styles.contentView}>
        <Image
          source={require('../../assests/logo.png')}
          style={styles.imageLogo}
        />
        <DotsLoading/>
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  mainView: {
    height: '90%',
    backgroundColor: white,
    borderRadius: moderateScale(500),
    width: '150%',
    position: 'absolute',
    top: verticalScale(-70),
    alignSelf: 'center',
  },
  imageLogo: {width: scale(200), resizeMode: 'contain'},
  contentView:{
    // backgroundColor:"red",
    alignItems:"center",
    marginTop:Dimensions.get("window").height/4
  },
});
