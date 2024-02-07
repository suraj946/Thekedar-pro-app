import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {dark, dark_light_l1, light, theme_primary, white} from '../../styles/colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {Icon} from 'react-native-paper';
import BoxSection from '../../components/BoxSection';
import SelectWorkerSection from '../../components/SelectWorkerSection';
import HomeDrawer from '../../components/HomeDrawer';
import { getCurrentNepaliDate } from '../../utils/helpers';
import { DAYS, MONTH } from '../../utils/constants';

const currDate = getCurrentNepaliDate();

const Home = ({navigation}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme_primary, paddingTop:10}}>
      <StatusBar backgroundColor={theme_primary} barStyle="light-content" />
      <HomeDrawer visible={drawerOpen} setVisible={setDrawerOpen} />
      <View style={styles.topView}>
        <View style={styles.headerView}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setDrawerOpen(true)}>
            <Icon source="menu" size={moderateScale(35)} color={light} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <Icon source="bell-outline" size={moderateScale(30)} color={light} />
          </TouchableOpacity>
        </View>
        <View style={styles.greetView}>
          <Text style={styles.nameTxt}>Hi Suraj Gupta</Text>
          <Text style={styles.greetingTxt}>Good Morning</Text>
        </View>
      </View>

      <View style={styles.overView}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
          <Text style={{fontSize: moderateScale(20), color: dark}}>Overview</Text>
          <Text style={styles.dateTxt}>{`${DAYS[currDate.dayIndex]}, ${currDate.dayDate} ${MONTH[currDate.monthIndex]}`}</Text>
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <BoxSection />
          <SelectWorkerSection />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  topView: {
    width: '100%',
    height: verticalScale(105),
  },
  headerView: {
    flexDirection: 'row',
    paddingHorizontal: scale(5),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameTxt: {
    fontSize: moderateScale(20),
    color: light,
  },
  greetView: {
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
  },
  greetingTxt: {
    fontSize: moderateScale(25),
    color: white,
    fontWeight: 'bold',
    marginTop: verticalScale(5),
  },
  overView: {
    width: '100%',
    backgroundColor: white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateVerticalScale(20),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(15),
    flex:1
  },
  dateTxt:{
    color: dark_light_l1,
    backgroundColor: light,
    borderRadius: moderateScale(20),
    padding:moderateScale(7),
    fontSize:moderateScale(13),
    textTransform:"capitalize"
  },
});
