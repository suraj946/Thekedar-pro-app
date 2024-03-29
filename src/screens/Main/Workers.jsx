import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, Icon, Searchbar} from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Header from '../../components/Header';
import {workersData} from '../../components/SelectWorkerSection';
import WorkerCard from '../../components/WorkerCard';
import {
  dark,
  success,
  theme_primary,
  theme_secondary,
  white,
} from '../../styles/colors';
import {useSelectionSystem} from '../../utils/hooks';

const Workers = ({navigation}) => {
  const [search, setSearch] = useState('');

  const {
    selectSingle,
    deSelectSingle,
    selectAll,
    deselectAll,
    count,
    selectedItem,
  } = useSelectionSystem(workersData);

  const handleEditWorker = () => {
    const [first] = selectedItem;
    navigation.navigate("EditWorker", {workerId:first})
  }
  const handleDelete = () => {
    console.log('perform deleteion');
  };

  const iconAni = useSharedValue(0);
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{scale: iconAni.value}],
  }));

  useEffect(() => {
    iconAni.value = withTiming(1, {duration: 400});
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={white} barStyle={'dark-content'} />
      <Header headingText="Workers" />
      <Searchbar
        style={{
          width: '95%',
          alignSelf: 'center',
          borderRadius: moderateScale(5),
          marginTop: verticalScale(5),
        }}
        placeholder="Search by name"
        value={search}
        onChangeText={text => setSearch(text)}
      />
      <View style={styles.selectActionView}>
        <Text style={{color: theme_primary, fontSize: moderateScale(17)}}>
          {count} Selected
        </Text>
        <View style={styles.selectIconsView}>
          {count === 1 && (
            <TouchableOpacity activeOpacity={0.8} onPress={handleEditWorker}>
              <Icon
                source={'pencil'}
                size={moderateScale(30)}
                color={theme_secondary}
              />
            </TouchableOpacity>
          )}

          {count > 0 && (
            <TouchableOpacity activeOpacity={0.8} onPress={handleDelete}>
              <Icon
                source={'delete'}
                size={moderateScale(30)}
                color={theme_secondary}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity activeOpacity={0.8} onPress={deselectAll}>
            <Icon
              source={'check-circle-outline'}
              size={moderateScale(30)}
              color={theme_secondary}
            />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={selectAll}>
            <Icon
              source={'check-circle'}
              size={moderateScale(30)}
              color={theme_secondary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={{paddingHorizontal: scale(5), marginBottom: verticalScale(10)}}
        data={workersData}
        renderItem={({item}) => (
          <WorkerCard
            workerId={item._id}
            name={item.name}
            role={item.role}
            selected={selectedItem.has(item._id)}
            selectSingle={selectSingle}
            deSelectSingle={deSelectSingle}
            isAnySelected={count > 0}
          />
        )}
        keyExtractor={item => item._id}
      />
      <Animated.View style={[styles.plusIconStyle, iconStyle]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('AddWorker')}>
          <Avatar.Icon
            icon={'plus'}
            style={{backgroundColor: success}}
            size={moderateScale(70)}
          />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Workers;

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
  },
  selectActionView: {
    marginTop: verticalScale(10),
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectIconsView: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-around',
  },
  plusIconStyle: {
    position: 'absolute',
    bottom: verticalScale(30),
    backgroundColor: success,
    right: scale(30),
    zIndex: 10,
    shadowColor: dark,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
    borderRadius: moderateScale(40),
  },
});
