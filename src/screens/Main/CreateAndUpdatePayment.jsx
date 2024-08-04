import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import ContainedBtn from '../../components/ContainedBtn';
import Header from '../../components/Header';
import Input from '../../components/Input';
import MyAlert from '../../components/MyAlert';
import MyDropDown from '../../components/MyDropDown';
import OutlinedBtn from '../../components/OutlinedBtn';
import {
  createPayment,
  deletePayment,
  updatePayment,
} from '../../redux/actions/paymentAction';
import {
  addPaymentToStore,
  removePaymentFromStore,
  updatePaymentInStore,
} from '../../redux/slices/siteSlice';
import { danger, theme_primary, white } from '../../styles/colors';
import { MONTH } from '../../utils/constants';
import { validateWages } from '../../utils/formValidator';
import { capitalize } from '../../utils/helpers';
import { useCurrentDate } from '../../utils/hooks';

const getDayOptions = dayDate => {
  return new Array(dayDate)
    .fill(1)
    .map((_, index) => ({label: `${index + 1}`, value: `${index + 1}`}));
};

const getMonthOptions = monthIndex => {
  return new Array(monthIndex + 1)
    .fill(1)
    .map((_, index) => ({
      label: `${capitalize(MONTH[index])}`,
      value: `${index + 1}`,
    }));
};

const CreateAndUpdatePayment = ({route, navigation}) => {
  const {monthIndex, year, dayDate} = useCurrentDate();
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [bitNumber, setBitNumber] = useState('');
  const [month, setMonth] = useState(`${monthIndex + 1}`);
  const [date, setDate] = useState(`${dayDate}`);  

  const [amountError, setAmountError] = useState('');
  const [bitError, setBitError] = useState('');

  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({});

  const dispatch = useDispatch();

  const validateInputs = () => {
    const checkAmount = validateWages(amount, 'Amount');
    setAmountError(checkAmount.errorText);

    let forBitNumber = true;
    if (bitNumber) {
      const checkBitNumber = validateWages(bitNumber, 'Bit Number');
      setBitError(checkBitNumber.errorText);
      forBitNumber = checkBitNumber.isValid;
    } else {
      setBitError('');
    }

    return checkAmount.isValid && forBitNumber;
  };
  const handleCreateAndUpdatePayment = async () => {
    if (!validateInputs()) return;
    setLoading(true);
    if (isUpdateMode) {
      const response = await updatePayment(route.params.paymentId, {
        amount: Number(amount),
        date: `${year}-${month}-${date}`,
        description,
        bitNumber,
      });
      if (response)
        dispatch(
          updatePaymentInStore({
            oldAmount: route.params.amount,
            newAmount: Number(amount),
            data: {...response},
          }),
        );
    } else {
      const response = await createPayment({
        siteId: route.params.siteId,
        amount: Number(amount),
        date: `${year}-${month}-${date}`,
        description,
        bitNumber,
      });
      if (response) dispatch(addPaymentToStore(response));
    }
    setLoading(false);
    navigation.goBack();
  };

  const handleDelete = async () => {
    setAlertVisible(true);
    setAlertData({
      title: 'Delete Payment',
      message: 'This will delete this payments.\n Are you sure?',
      icon: 'delete',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: async () => {
            setDelLoading(true);
            const response = await deletePayment(route.params.paymentId);
            setDelLoading(false);
            if (response)
              dispatch(
                removePaymentFromStore({
                  amount: route.params.amount,
                  paymentId: route.params.paymentId,
                }),
              );
            navigation.goBack();
          },
        },
      ],
    });
  };

  useEffect(() => {
    if (route.params?.mode === 'update') {
      setIsUpdateMode(true);
      const {amount, date, description, bitNumber} = route.params;
      setAmount(amount.toString());
      setBitNumber(bitNumber ? bitNumber.toString() : '');
      setDate(date.split('-')[2]);
      setMonth(date.split('-')[1]);
      setDescription(description);
    }
  }, [route.params]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <StatusBar backgroundColor={white} barStyle={'dark-content'} />
      <Header headingText={isUpdateMode ? 'Edit Payment' : 'Create Payment'} />
      <MyAlert
        visible={alertVisible}
        setVisible={setAlertVisible}
        {...alertData}
      />
      <View style={styles.container}>
        <Input
          value={amount}
          onChangeText={txt => setAmount(txt)}
          keyboardType="numeric"
          errorText={amountError}
          label="Amount"
          placeholder="Enter Amount in Rupee"
          disabled={loading || delLoading}
        />
        <Input
          value={bitNumber}
          onChangeText={txt => setBitNumber(txt)}
          keyboardType="numeric"
          errorText={bitError}
          label="BIT Number"
          placeholder="Enter BIT Number"
          disabled={loading || delLoading}
        />
        <Input
          value={description}
          onChangeText={txt => setDescription(txt)}
          label="Description"
          placeholder="Enter Description"
          disabled={loading || delLoading}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <MyDropDown
            label='Month'
            options={getMonthOptions(monthIndex)}
            value={month}
            onSelect={setMonth}
            disabled={loading || delLoading}
            containerStyle={{width: '48%'}}
          />
          <MyDropDown
            label='Date'
            options={getDayOptions(dayDate)}
            value={date}
            onSelect={setDate}
            disabled={loading || delLoading}
            containerStyle={{width: '48%'}}
          />
          
        </View>
        <View style={styles.dateInfo}>
          <Text style={styles.dateTxt}>{`${year}/${month}/${date}`}</Text>
        </View>
        <ContainedBtn
          title={`${isUpdateMode ? 'Update' : 'Create'}`}
          loading={loading}
          disabled={delLoading}
          handler={handleCreateAndUpdatePayment}
          style={{marginTop: verticalScale(20)}}
        />
        {isUpdateMode && (
          <OutlinedBtn
            title="Delete This Payment"
            loading={delLoading}
            disabled={loading}
            style={{marginTop: verticalScale(20), borderColor: danger}}
            handler={handleDelete}
            labelStyle={{color: danger}}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CreateAndUpdatePayment;

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
  },
  dateInfo: {
    marginTop: verticalScale(5),
  },
  dateTxt: {
    fontSize: moderateScale(20),
    color: theme_primary,
  },
});
