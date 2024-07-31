import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import ContainedBtn from '../../components/ContainedBtn';
import Header from '../../components/Header';
import Input from '../../components/Input';
import MyAlert from '../../components/MyAlert';
import OutlinedBtn from '../../components/OutlinedBtn';
import { createSite, deleteSite, updateSite } from '../../redux/actions/siteAction';
import {
  danger,
  dark_light_l1,
  dark_light_l2,
  white
} from '../../styles/colors';
import { validateName } from '../../utils/formValidator';
import { useSite } from '../../utils/hooks';

const CreateAndUpdateSite = ({route, navigation}) => {
  const [siteName, setSiteName] = useState('');
  const [address, setAddress] = useState('');
  keyboardType = '';
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [deletePayments, setDeletePayments] = useState(true);
  const [delLoading, setDelLoading] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({});

  const {addSite, editSite, removeSite} = useSite();

  const validateInputs = () => {
    const nameCheck = validateName(siteName, 'Site Name');
    setNameError(nameCheck.errorText);

    let forAddress = true;
    if (address?.trim() === '') {
      setAddressError('Address is required');
      forAddress = false;
    } else {
      setAddressError('');
    }
    return nameCheck.isValid && forAddress;
  };

  const handlePress = async () => {
    if (!validateInputs()) return;
    setLoading(true);
    if (isUpdateMode) {
      const response = await updateSite(siteName, address, route.params.siteId);
      if (response) editSite({_id: route.params.siteId, siteName, address});
    } else {
      const response = await createSite(siteName, address);
      if (response) addSite(response);
    }
    setLoading(false);
    navigation.goBack();
  };

  const deleteHandler = () => {
    setAlertVisible(true);
    setAlertData({
      title: 'Delete Site',
      message:
        'Are you sure you want to delete this site? This action cannot be undone.',
      icon: 'delete',
      buttons: [
        {text: 'No'},
        {
          text: 'Yes',
          onPress: async () => {
            setDelLoading(true);
            const response = await deleteSite(route.params.siteId, deletePayments);
            if(response) removeSite(route.params.siteId);
            setDelLoading(false);
            navigation.goBack();
          },
        },
      ],
    });
  };

  useEffect(() => {
    if (route.params?.siteId) {
      const {siteName, address} = route.params;
      setIsUpdateMode(true);
      setSiteName(siteName);
      setAddress(address);
    }
  }, [route.params]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <Header headingText={isUpdateMode ? 'Update Site' : 'Create Site'} />
      <MyAlert
        visible={alertVisible}
        setVisible={setAlertVisible}
        {...alertData}
      />
      <View style={styles.form}>
        <Input
          value={siteName}
          onChangeText={txt => setSiteName(txt)}
          label="Site Name"
          placeholder="Enter Site Name"
          disabled={loading || delLoading}
          errorText={nameError}
        />
        <Input
          value={address}
          onChangeText={txt => setAddress(txt)}
          label="Address"
          placeholder="Enter Address of Site"
          disabled={loading || delLoading}
          errorText={addressError}
        />
        <ContainedBtn
          loading={loading}
          title={isUpdateMode ? 'Update' : 'Create'}
          handler={handlePress}
          style={{width: '60%', alignSelf: 'center'}}
          disabled={delLoading}
        />

        {isUpdateMode && (
          <View style={styles.deleteSection}>
            <Text style={styles.headingText}>Site Deletion Section</Text>
            <Text style={styles.desc}>
              NOTE: Below checkbox is checked by default meaning all payments
              associated with this site will be deleted. If you want to keep the
              payments then uncheck the below checkbox
            </Text>
            <OutlinedBtn
              title="Delete Site"
              labelStyle={{color: danger}}
              style={styles.delBtn}
              handler={deleteHandler}
              loading={delLoading}
              disabled={loading}
            />
            <View style={styles.checkBoxContainer}>
              <Checkbox
                status={deletePayments ? 'checked' : 'unchecked'}
                onPress={() => setDeletePayments(!deletePayments)}
                uncheckedColor={dark_light_l2}
                color={danger}
                disabled={loading || delLoading}
              />
              <Text
                style={{
                  ...styles.text,
                  color: deletePayments ? danger : dark_light_l2,
                }}
                onPress={() => setDeletePayments(!deletePayments)}>
                Delete Payments
              </Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CreateAndUpdateSite;

const styles = StyleSheet.create({
  form: {
    padding: moderateScale(10),
  },
  headingText: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: dark_light_l1,
    alignSelf: 'flex-start',
  },
  desc: {
    fontSize: moderateScale(14),
    color: dark_light_l2,
    alignSelf: 'flex-start',
    marginLeft: moderateScale(10),
    fontStyle: 'italic',
  },
  deleteSection: {
    alignItems: 'center',
    marginTop: verticalScale(20),
    padding: moderateScale(10),
    backgroundColor: white,
    borderWidth: 1,
    borderColor: danger,
    borderRadius: moderateScale(5),
  },
  delBtn: {
    width: '50%',
    alignSelf: 'center',
    borderColor: danger,
    marginTop: verticalScale(10),
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(5),
  },
  text: {
    color: dark_light_l2,
    fontSize: moderateScale(20),
    textTransform: 'uppercase',
    marginRight: moderateScale(5),
  },
});
