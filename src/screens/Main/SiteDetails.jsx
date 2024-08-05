import React, { useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import AnimatedIcon from '../../components/AnimatedIcon';
import DotsLoading from '../../components/DotsLoading';
import Header from '../../components/Header';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import PaymentCard from '../../components/PaymentCard';
import { getSingleSite } from '../../redux/actions/siteAction';
import {
  dark,
  dark_light_l1,
  dark_light_l2,
  light,
  success,
  theme_primary,
  warning,
  white,
} from '../../styles/colors';

const SiteDetails = ({route, navigation}) => {
  const {siteId, siteName} = route.params;
  const {loading, site:siteData} = useSelector(state => state.singleSite);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getSingleSite(siteId));
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <Header
        style={{backgroundColor: theme_primary}}
        textAndIconColor={white}
        headingText={siteName}
      />
      <StatusBar barStyle={'light-content'} backgroundColor={theme_primary} />
      <View style={styles.topView}>
        <View style={styles.siteInfoView}>
          <View style={styles.absView}>
            <Text style={styles.text}>{siteData.siteName}</Text>
            <Text style={styles.text}>{siteData.address}</Text>
          </View>
          <Text style={styles.moneyText}>
            {loading ? 'Loading...' : `₹ ${siteData.totalPayments}`}
          </Text>
          <Text style={styles.totalText}>Total Payments</Text>
        </View>
      </View>
      <Text style={styles.heading}>Payments</Text>
      <View style={styles.bottomView}>
        {loading ? (
          <DotsLoading
            containerStyle={{marginTop: verticalScale(180)}}
            text="Fetching Payments"
          />
        ) : (
          <FlatList
            data={siteData.payments}
            renderItem={({item}) => <PaymentCard {...item} />}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <ListEmptyComponent
                mainText="No payments found"
                subText="Press + to add new payment"
              />
            }
          />
        )}
      </View>
      {!loading && (
        <AnimatedIcon
          icon="plus"
          onPress={() =>
            navigation.navigate('CreateAndUpdatePayment', {siteId})
          }
        />
      )}
    </SafeAreaView>
  );
};

export default SiteDetails;

const styles = StyleSheet.create({
  topView: {
    height: verticalScale(120),
    width: '100%',
    backgroundColor: theme_primary,
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    paddingTop: verticalScale(10),
    alignItems: 'center',
  },
  siteInfoView: {
    position: 'relative',
    width: '90%',
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(5),
    minHeight: verticalScale(90),
  },
  absView: {
    position: 'absolute',
    top: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: warning,
    width: '100%',
    borderTopLeftRadius: moderateScale(5),
    borderTopRightRadius: moderateScale(5),
    padding: moderateScale(5),
  },
  text: {
    fontSize: moderateScale(15),
    color: dark,
  },
  moneyText: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(35),
    fontWeight: 'bold',
    color: success,
  },
  totalText: {
    position: 'absolute',
    color: dark_light_l1,
    bottom: verticalScale(8),
    fontSize: moderateScale(15),
  },
  heading: {
    fontSize: moderateScale(25),
    fontWeight: 'bold',
    color: dark_light_l2,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(5),
    alignSelf: 'center',
  },
  bottomView: {
    flex: 1,
    width: '100%',
    backgroundColor: light,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    paddingVertical: verticalScale(20),
  },
});
