import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  View
} from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import ContainedBtn from './ContainedBtn';
import Header from './Header';
import StatusCode from './StatusCode';
import { useNavigation } from '@react-navigation/native';

const NotFound = ({text=""}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <Header headingText="Error" />
      <View
        style={{
          height: Dimensions.get('window').height / 1.5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <StatusCode code={'404'} text={text+" not found"}/>
        <ContainedBtn
          title="Go Back"
          handler={() => navigation.goBack()}
          style={{width: '50%', marginTop: verticalScale(15)}}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotFound;
