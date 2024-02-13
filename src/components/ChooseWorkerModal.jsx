import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React from 'react';
import MyModal from './MyModal';
import { workersData } from './SelectWorkerSection';
import { Avatar } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { dark, light } from '../styles/colors';
import { useNavigation } from '@react-navigation/native';

const ChooseWorkerModal = ({
    visible=false,
    setVisible=()=>{},
    screenToNavigate=""
}) => {
    const navigation = useNavigation();

    const handlePress = (id) => {
        //FIXME:when immediately clicking to scrren after unmounting the model the model card is being pressed
        setVisible(false);
        navigation.navigate(screenToNavigate, {workerId:id});
    }
  return (
    <MyModal visible={visible} setVisible={setVisible} heading='Choose a worker'>
        <ScrollView contentContainerStyle={styles.cardView} showsVerticalScrollIndicator={false}>
            {
                workersData.map(w => (
                    <TouchableOpacity key={w._id} style={styles.card} activeOpacity={0.9} onPress={() => {handlePress(w._id)}}>
                        <Avatar.Icon icon={"account"} size={moderateScale(35)}/>
                        <Text style={styles.nameTxt}>{w.name}</Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    </MyModal>
  )
}

export default ChooseWorkerModal;

const styles = StyleSheet.create({
    cardView:{
        paddingHorizontal:scale(10),
        paddingBottom:verticalScale(10),
        justifyContent:"center",
        alignItems:"center"
    },
    card:{
        backgroundColor:light,
        margin:moderateScale(5),
        paddingHorizontal:scale(10),
        paddingVertical:verticalScale(5),
        flexDirection:"row",
        alignItems:"center",
        borderRadius:moderateScale(5),
        width:"80%"
    },
    nameTxt:{
        color:dark,
        fontSize:moderateScale(18),
        marginLeft:scale(10)
    }
});