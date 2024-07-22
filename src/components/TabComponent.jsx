import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { dark_light_l1, dark_light_l2, theme_primary, white } from '../styles/colors';

const TabComponent = ({tabs, selectedTab, setSelectedTab, style={}, disabled=false}) => {
  const handlePress = tab => {
    setSelectedTab(tab);
  };
  return (
    <View style={[styles.tabContainer, style]}>
      {tabs.map((tab, index) => (
        <TabItem
          text={tab.text}
          key={tab.value}
          onPress={() => handlePress(tab.value)}
          isSelected={selectedTab === tab.value}
          width={100 / tabs.length}
          isFirst={index === 0}
          isLast={index === tabs.length - 1}
          disabled={disabled}
        />
      ))}
    </View>
  );
};

const TabItem = ({
  text,
  onPress,
  isSelected,
  width,
  isFirst = false,
  isLast = false,
  disabled = false
}) => {
  const getStyle = () => {
    const style = {width: '100%', backgroundColor: 'transparent'};
    if(isFirst) {
      style.borderLeftWidth = 0;
      style.borderTopLeftRadius = moderateScale(4);
      style.borderBottomLeftRadius = moderateScale(4);
    }
    if(isLast){
      style.borderRightWidth = 0;
      style.borderTopRightRadius = moderateScale(4);
      style.borderBottomRightRadius = moderateScale(4);
    }
    if(isSelected) {
      style.backgroundColor = theme_primary;
      style.color = white;
    }
    return style;
  }
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.5}
      onPress={onPress}
      style={{width: `${width}%`}}>
      <Text style={[styles.tabItem, getStyle()]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TabComponent;

const styles = StyleSheet.create({
  tabContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: moderateScale(5),
    borderColor: theme_primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItem: {
    color: dark_light_l1,
    textAlign: 'center',
    fontSize: 18,
    borderLeftWidth: moderateScale(1),
    borderColor: theme_primary,
    paddingHorizontal: 10,
    paddingVertical: verticalScale(7),
  },
});
