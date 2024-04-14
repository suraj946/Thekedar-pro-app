import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Avatar, Drawer } from 'react-native-paper'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { dark_light_l1, theme_primary } from '../styles/colors'
import MyDrawer from './MyDrawer'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../redux/actions/thekedarAction'

const HomeDrawer = ({
  visible = false,
  setVisible
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleProfilePress = () => {
    setVisible(false);
    navigation.navigate("MyProfile");
  }

  const afterLogout = () => {
    setVisible(false);
    navigation.reset({
      index:0,
      routes:[{name:"Login"}]
    })
  }

  const handleLogout = () => {
    dispatch(logoutUser(setLoading, afterLogout));
  }
  return (
    <MyDrawer visible={visible} setVisible={setVisible}>
      <Drawer.Section style={{marginTop:verticalScale(40)}}>
        <Avatar.Icon icon={"account"} size={moderateScale(70)} style={{alignSelf:"center"}} />
        <Text style={styles.nameTxt}>{"Suraj Gupta"}</Text>

        <Drawer.Item 
          label='Profile' 
          icon={"account"}
          style={styles.drawerItem}
          onPress={handleProfilePress} 
          theme={{ colors: { onSurfaceVariant:"white" } }}
          disabled={loading}
        />
        <Drawer.Item 
          label={loading ? "Logging out..." : "Logout"} 
          icon={"logout"}
          style={styles.drawerItem}
          onPress={handleLogout} 
          theme={{ colors: { onSurfaceVariant:"white" } }}
          disabled={loading}
        />
      </Drawer.Section>
    </MyDrawer>
  )
}

export default HomeDrawer

const styles = StyleSheet.create({
  nameTxt:{
    color:dark_light_l1,
    fontSize:moderateScale(20),
    alignSelf:"center",
    margin:moderateScale(10)
  },
  drawerItem:{
    backgroundColor:theme_primary,
    marginBottom:verticalScale(10),
    borderRadius:moderateScale(5),
    height:45
  }
})