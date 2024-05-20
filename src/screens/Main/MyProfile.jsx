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
import { useDispatch, useSelector } from 'react-redux';
import info from '../../../package.json';
import BottomMenu from '../../components/BottomMenu';
import ContainedBtn from '../../components/ContainedBtn';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { changePassword, logoutUser } from '../../redux/actions/thekedarAction';
import {
  dark,
  dark_light_l1,
  dark_light_l2,
  light,
  light2,
  theme_primary,
  white,
} from '../../styles/colors';
import { validatePassword } from '../../utils/formValidator';
import MyAlert from '../../components/MyAlert';

const MyProfile = ({navigation}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const {thekedar} = useSelector(state => state.thekedar);
  const dispatch = useDispatch();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({});

  const handleLogout = () => {
    setAlertVisible(true);
    setAlertData({
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      icon: 'logout',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: () => {
            dispatch(logoutUser());
          },
        },
      ],
    });
  };

  const hideMenu = () => {
    setOpenMenu(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <StatusBar backgroundColor={white} barStyle={'dark-content'} />
      <Header headingText={'My Profile'} />
      <ScrollView
        style={styles.contentCont}
        showsVerticalScrollIndicator={false}>
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
        <View style={{marginTop: verticalScale(15)}}>
          <ActionCard
            leftIcon="account-outline"
            text="Edit Profile"
            rightIcon="greater-than"
            clickHandler={() =>
              navigation.navigate('EditMyProfile')
            }
          />
          <ActionCard
            leftIcon="lock-outline"
            text="Change Password"
            clickHandler={() => setOpenMenu(true)}
          />
        </View>
      </ScrollView>
      <Text style={styles.versionTxt}>v{info.version}</Text>

      <BottomMenu
        visible={openMenu}
        setVisible={hideMenu}
        title="Change Password">
        <ChangePasswordForm setOpenMenu={setOpenMenu} />
      </BottomMenu>
      <MyAlert visible={alertVisible} setVisible={setAlertVisible} {...alertData} />
    </SafeAreaView>
  );
};

const ActionCard = ({
  leftIcon = 'help',
  text = '',
  rightIcon = '',
  clickHandler = () => {},
}) => {
  return (
    <TouchableOpacity
      onPress={clickHandler}
      activeOpacity={0.5}
      style={{
        width: '100%',
        borderBottomWidth: moderateScale(1.6),
        borderColor: light,
        paddingHorizontal: scale(15),
        paddingVertical: verticalScale(13),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon source={leftIcon} size={moderateScale(25)} />
        <Text
          style={{
            color: dark_light_l1,
            fontSize: moderateScale(18),
            marginLeft: scale(10),
          }}>
          {text}
        </Text>
      </View>
      {rightIcon && <Icon source={rightIcon} size={moderateScale(22)} />}
    </TouchableOpacity>
  );
};

const ChangePasswordForm = ({setOpenMenu}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassError, setOldPassError] = useState('');
  const [newPassError, setNewPassError] = useState('');
  const [changeLoading, setChangeLoading] = useState(false);

  const handleChangePassword = async () => {
    const oldCheck = validatePassword(oldPassword);
    if (oldCheck.isValid) {
      setOldPassError('');
    } else {
      setOldPassError(oldCheck.errorText);
    }

    const newCheck = validatePassword(newPassword);
    if (newCheck.isValid) {
      setNewPassError('');
    } else {
      setNewPassError(newCheck.errorText);
    }

    if (!(oldCheck.isValid && newCheck.isValid)) {
      return;
    }

    setChangeLoading(true);
    const res = await changePassword(oldPassword, newPassword);
    if (res) {
      setOpenMenu(false);
    }
    setChangeLoading(false);
  };

  return (
    <View
      style={{
        paddingVertical: verticalScale(15),
        paddingHorizontal: scale(20),
      }}>
      <Input
        value={oldPassword}
        label="Current Password"
        placeholder="Enter current password"
        isPassword={true}
        errorText={oldPassError}
        onChangeText={txt => setOldPassword(txt)}
        disabled={changeLoading}
      />
      <Input
        value={newPassword}
        label="New Password"
        placeholder="Enter new password"
        isPassword={true}
        errorText={newPassError}
        onChangeText={txt => setNewPassword(txt)}
        disabled={changeLoading}
      />
      <ContainedBtn
        style={{marginTop: verticalScale(5)}}
        title="Change"
        loading={changeLoading}
        handler={handleChangePassword}
      />
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  contentCont: {
    marginTop: verticalScale(5),
    backgroundColor: light2,
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
  versionTxt: {
    color: dark_light_l2,
    alignSelf: 'center',
    fontSize: moderateScale(13),
  },
});
