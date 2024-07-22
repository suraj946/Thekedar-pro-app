import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import Header from "../../components/Header";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { theme_secondary, white } from "../../styles/colors";

const WorksiteManagement = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <Header headingText="Work Site" />
      <StatusBar barStyle={'dark-content'} backgroundColor={white} />
      <View style={styles.container}>
      </View>
    </SafeAreaView>
  );
};

export default WorksiteManagement;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: white, paddingHorizontal: scale(10)},
  headingText: {
    color: white,
    fontSize: moderateScale(20),
    backgroundColor: theme_secondary,
    paddingVertical: verticalScale(5),
    textAlign: 'center',
    borderRadius: moderateScale(10),
    width: '100%',
    alignSelf: 'center',
  },
});
