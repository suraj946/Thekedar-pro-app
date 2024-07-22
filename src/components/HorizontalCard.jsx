import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { dark_light_l1, light } from "../styles/colors";

const HorizontalCard = ({
  label="text",
  icon = 'help',
  onPress = () => {},
}) => {
  return <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Icon size={moderateScale(23)} color={dark_light_l1} source={icon} />
    </View>
  </TouchableOpacity>;
};

export default memo(HorizontalCard);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(8),
    paddingHorizontal: scale(15),
    backgroundColor: light,
    borderRadius: moderateScale(5),
    marginBottom: verticalScale(5),
  },
  label: {
    fontSize: moderateScale(17),
    color: dark_light_l1,
  },
})