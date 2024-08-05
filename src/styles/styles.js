import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { dark, info, theme_primary, white } from "./colors";

export const sharedStyles = StyleSheet.create({
  dateView: {
    marginTop: verticalScale(20),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: white,
    borderRadius: moderateScale(40),
    elevation: 10,
    width: '90%',
    alignSelf: 'center',
  },
  dateTxt: {
    fontSize: moderateScale(23),
    textTransform: 'capitalize',
    color: theme_primary,
  },
  statusTxt: {
    fontSize: moderateScale(17),
    color: info,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    width: '50%',
    textAlign: 'center',
  },
  attendanceStatusView: {
    marginTop: verticalScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme_primary,
    width: '90%',
    alignSelf: 'center',
    borderRadius: moderateScale(10),
  },
  formView: {
    width: '100%',
    marginTop: verticalScale(10),
  },
  fullShadow: {
    shadowColor: dark,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
})