import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Header from '../../components/Header';
import {
  dark,
  dark_light_l1,
  dark_light_l2,
  light,
  light2,
  theme_primary,
  white
} from '../../styles/colors';
import info from "../../../package.json";
import BottomMenu from '../../components/BottomMenu';
import Input from '../../components/Input';
import ContainedBtn from '../../components/ContainedBtn';
import { validatePassword } from '../../utils/formValidator';

const thekedar = {
  name: 'Suraj Gupta',
  contactNumber: '9822556765',
  _id: '6572c79483f62bcfc1700020',
  email: 'sgsuraj150@gmail.com',
  address: 'pheta-3',
  companyName: 'Okay construction',
};

const MyProfile = ({navigation}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassError, setOldPassError] = useState("");
  const [newPassError, setNewPassError] = useState("");
  const [changeLoading, setChangeLoading] = useState(false);

  const handleLogout = () => {
    console.log("Logout");
  }

  const hideMenu = () => {
    if(openMenu){
      setOldPassword("");
      setNewPassword("");
      setOldPassError("");
      setNewPassError("");
    }
    setOpenMenu(false);
  }

  const handleChangePassword = () => {
    const oldCheck = validatePassword(oldPassword);
    if(oldCheck.isValid){
      setOldPassError("");
    }else{
      setOldPassError(oldCheck.errorText);
    }

    const newCheck = validatePassword(newPassword);
    if(newCheck.isValid){
      setNewPassError("");
    }else{
      setNewPassError(newCheck.errorText);
    }

    if(!(oldCheck.isValid && newCheck.isValid)){
      return;
    }

    console.log({oldPassword, newPassword});
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <StatusBar backgroundColor={white} barStyle={'dark-content'} />
      <Header headingText={'My Profile'} />
      <ScrollView style={styles.contentCont} showsVerticalScrollIndicator={false}>
        <View style={styles.profileInfo}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.avatarCont}>
              <Text style={styles.avatar}>
                {thekedar.name
                  .split(' ')
                  .map(w => w[0])
                  .join('')
                  .substring(0, 2)}
              </Text>
            </View>
            <View style={{marginLeft: scale(10)}}>
              <Text style={styles.nameTxt}>{thekedar.name}</Text>
              <Text style={styles.textSm}>{thekedar.email}</Text>
              <Text style={styles.textSm}>{thekedar?.companyName}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleLogout} activeOpacity={0.5}>
            <Icon source={'logout'} size={moderateScale(30)} />
          </TouchableOpacity>
        </View>
        <View style={{marginTop:verticalScale(15)}}>
          <ActionCard
            leftIcon="account-outline"
            text="Edit Profile"
            rightIcon="greater-than"
            clickHandler={()=>navigation.navigate("EditMyProfile", {id:thekedar._id})}
          />
          <ActionCard
            leftIcon="lock-outline"
            text="Change Password"
            clickHandler={() => setOpenMenu(true)}
          />
        </View>
      </ScrollView>
      <Text style={styles.versionTxt}>v{info.version}</Text>

      <BottomMenu visible={openMenu} setVisible={hideMenu} title='Change Password'>
        <View style={{
          paddingVertical:verticalScale(15),
          paddingHorizontal:scale(20)
        }}>
          <Input
            value={oldPassword}
            label='Current Password'
            placeholder='Enter current password'
            isPassword={true}
            errorText={oldPassError}
            onChangeText={(txt) => setOldPassword(txt)}
            disabled={changeLoading}
          />
          <Input
            value={newPassword}
            label='New Password'
            placeholder='Enter new password'
            isPassword={true}
            errorText={newPassError}
            onChangeText={(txt) => setNewPassword(txt)}
            disabled={changeLoading}
          />
          <ContainedBtn
            style={{marginTop:verticalScale(5)}}
            title='Change'
            loading={changeLoading}
            handler={handleChangePassword}
          />
        </View>
      </BottomMenu>
    </SafeAreaView>
  );
};

const ActionCard = ({
  leftIcon="help",
  text="",
  rightIcon="",
  clickHandler=()=>{}
}) => {
  return (
    <TouchableOpacity 
      onPress={clickHandler}
      activeOpacity={0.5}
      style={{
        width:"100%",
        borderBottomWidth:moderateScale(1.6),
        borderColor:light,
        paddingHorizontal:scale(15),
        paddingVertical:verticalScale(13),
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
      }}
    >
      <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
        <Icon source={leftIcon} size={moderateScale(25)}/>
        <Text style={{
          color:dark_light_l1,
          fontSize:moderateScale(18),
          marginLeft:scale(10)
        }}>{text}</Text>
      </View>
      { rightIcon && <Icon source={rightIcon} size={moderateScale(22)}/>}
    </TouchableOpacity>
  )
}

export default MyProfile;

const styles = StyleSheet.create({
  contentCont: {
    marginTop:verticalScale(5),
    backgroundColor: light2,
    // paddingVertical: verticalScale(10),
    // paddingHorizontal: scale(15),
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
  },
  avatarCont: {
    padding: moderateScale(3),
    borderRadius: moderateScale(100),
    backgroundColor: theme_primary,
    width: moderateScale(80),
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    color: theme_primary,
    backgroundColor: white,
    width: '100%',
    aspectRatio: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: moderateScale(100),
    fontSize: moderateScale(35),
  },
  nameTxt: {
    color: dark,
    fontSize: moderateScale(30),
    fontWeight: '500',
  },
  textSm: {
    color: dark_light_l1,
    fontSize: moderateScale(14),
  },
  versionTxt:{
    color:dark_light_l2,
    alignSelf:"center",
    fontSize:moderateScale(13)
  }
});
