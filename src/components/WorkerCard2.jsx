import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { memo } from 'react';
import {Avatar} from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { dark, dark_light_l2, light } from '../styles/colors';

const WorkerCard2 = ({
    handlePress,
    _id="",
    name="",
    role="",
    currentRecordId : recordId="",
    wagesPerDay,
    ...rest
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => {
        handlePress(_id, name, recordId, wagesPerDay, rest);
      }}>
      <Avatar.Icon icon={'account'} size={moderateScale(40)} />
      <View style={{marginLeft:scale(10)}}>
        <Text style={styles.nameTxt}>{name}</Text>
        <Text style={styles.roleTxt}>{role}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(WorkerCard2);

const styles = StyleSheet.create({
  card: {
    backgroundColor: light,
    margin: moderateScale(5),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(5),
    width: '95%',
    alignSelf:"center"
  },
  nameTxt: {
    color: dark,
    fontSize: moderateScale(18),
  },
  roleTxt:{
    color:dark_light_l2,
    fontSize:moderateScale(16)
  }
});
