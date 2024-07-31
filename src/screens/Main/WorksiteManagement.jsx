import { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import AnimatedIcon from '../../components/AnimatedIcon';
import DotsLoading from '../../components/DotsLoading';
import Header from '../../components/Header';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import SiteCard from '../../components/SiteCard';
import {
  success,
  theme_primary,
  theme_secondary,
  white
} from '../../styles/colors';
import { useSite } from '../../utils/hooks';

const WorksiteManagement = ({navigation}) => {
  const [selectedSite, setSelectedSite] = useState(null);
  const {loading, ifSiteExist, sites: data, getSites} = useSite();

  const handleUpdate = () => {
    navigation.navigate("CreateAndUpdateSite", selectedSite);
    setSelectedSite(null);
  }

  useEffect(() => {
    if (ifSiteExist()) return;
    getSites();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header headingText="Work Site" />
      <StatusBar barStyle={'dark-content'} backgroundColor={white} />
      <View style={styles.container}>
        <View style={styles.topView}>
          <Icon
            source={'office-building-marker'}
            size={moderateScale(150)}
            color={success}
          />
          <View style={styles.topViewText}>
            <Text style={[styles.text, styles.text1]}>Your</Text>
            <Text style={[styles.text, styles.text2]}>Worksite</Text>
          </View>
        </View>
        {loading ? (
          <DotsLoading containerStyle={{marginTop: verticalScale(170)}} text='Fetching Sites'/>
        ) : (
          <View>
            {selectedSite?.siteId ? (
              <View style={styles.iconCont}>
                <TouchableOpacity activeOpacity={0.7} onPress={handleUpdate}>
                  <Icon
                    source={'pencil'}
                    size={moderateScale(30)}
                    color={theme_primary}
                  />
                </TouchableOpacity>
                
              </View>
            ) : (
              data.length > 0 && (
                <Text style={styles.siteHeading}>All Sites</Text>
              )
            )}
            <FlatList
              style={{minHeight: verticalScale(300)}}
              data={data}
              renderItem={({item}) => (
                <SiteCard
                  siteId={item._id}
                  siteName={item.siteName}
                  isSelected={item._id === selectedSite?.siteId}
                  setSelectedSite={setSelectedSite}
                  address={item.address}
                />
              )}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
              onRefresh={getSites}
              refreshing={loading}
              ListEmptyComponent={<ListEmptyComponent
                mainText='No sites found'
                subText='Press + to add new site'
                
              />}
            />
          </View>
        )}
      </View>
      <AnimatedIcon icon="plus" onPress={() => navigation.navigate('CreateAndUpdateSite')} />
    </SafeAreaView>
  );
};

export default WorksiteManagement;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: white, paddingHorizontal: scale(10)},
  topView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: white,
    alignItems: 'center',
    height: verticalScale(120),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: moderateScale(20),
  },
  topViewText: {
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    fontSize: moderateScale(50),
    fontWeight: 'bold',
  },
  text1: {
    color: theme_secondary,
  },
  text2: {
    color: theme_primary,
  },
  siteHeading: {
    fontSize: moderateScale(25),
    fontWeight: 'bold',
    color: theme_secondary,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(5),
    height: verticalScale(35),
    textAlignVertical: 'center',
  },
  iconCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(5),
    height: verticalScale(35),
  },
});
