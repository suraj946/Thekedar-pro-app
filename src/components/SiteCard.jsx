import { useNavigation } from '@react-navigation/native'
import React, { memo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { trigger } from 'react-native-haptic-feedback'
import { Icon } from 'react-native-paper'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { dark_light_l1, light, theme_primary, white } from '../styles/colors'

const SiteCard = ({
  siteId="",
  siteName="",
  isSelected=false,
  setSelectedSite=() => {},
  address="",
}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if(isSelected){
      setSelectedSite(null);
      return;
    }
    navigation.navigate("SiteDetails", {siteId, siteName});
  }
  const handleLongPress = () => {
    if(isSelected){
      setSelectedSite(null);
      return;
    }
    trigger("impactMedium", {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    })
    setSelectedSite({siteId, siteName, address});
  }
  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      <View style={{...styles.card, backgroundColor: isSelected ? theme_primary : light}}>
        <Icon size={moderateScale(35)} source={"office-building"} color={isSelected ? white : dark_light_l1} />
        <Text style={{...styles.cardText, color: isSelected ? white : dark_light_l1}}>{siteName}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default memo(SiteCard);

const styles = StyleSheet.create({
  card: {
    width: "100%",
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(15),
    borderRadius: moderateScale(5),
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(3),
  },
  cardText: {
    fontSize: moderateScale(20),
    marginLeft: scale(10),
  },
})