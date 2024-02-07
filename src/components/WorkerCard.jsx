import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {Avatar, Icon} from 'react-native-paper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {dark, dark_light_l2, light, success, white} from '../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { trigger } from 'react-native-haptic-feedback';

const WorkerCard = ({
  workerId,
  name = '',
  role = '',
  selectSingle = () => {},
  deSelectSingle = () => {},
  selected = false,
  isAnySelected=false
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (selected) {
      if (typeof deSelectSingle !== 'function') {
        throw new Error('deSelectSingle should be a function');
      }
      deSelectSingle(workerId);
    } else {
      if (typeof selectSingle !== 'function') {
        throw new Error('selectSingle should be a function');
      }
      selectSingle(workerId);
    }
  };

  const handleLongPress = () => {
    if(!isAnySelected){
      trigger("impactLight", {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      })
    }
    handlePress();
  }
  // console.log(`Rendering ${Math.round(Math.random() * 1000)} ${isAnySelected}`);
  return (
    <TouchableOpacity
      onLongPress={handleLongPress}
      onPress={isAnySelected ? handlePress : () => navigation.navigate("WorkerProfile", {workerId})}
      activeOpacity={0.9}
      style={{...styles.container, backgroundColor: selected ? light : white}}>
      <View style={styles.textView}>
        <Avatar.Icon
          icon={'account'}
          size={moderateScale(40)}
          style={{marginRight: 10}}
        />
        <View>
          <Text style={styles.nameTxt}>{name}</Text>
          <Text style={styles.roleTxt}>{role}</Text>
        </View>
      </View>
      {selected && (
        <Icon
          source={'check-circle'}
          size={moderateScale(25)}
          color={success}
        />
      )}
    </TouchableOpacity>
  );
};

export default memo(WorkerCard);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(7),
    borderRadius: moderateScale(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(5),
    elevation: 3,
    margin: moderateScale(5),
    marginTop: verticalScale(8),
  },
  textView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameTxt: {
    color: dark,
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  roleTxt: {
    marginLeft: 5,
    color: dark_light_l2,
    fontSize: moderateScale(14),
    fontWeight: '400',
    textTransform: 'capitalize',
  },
});
