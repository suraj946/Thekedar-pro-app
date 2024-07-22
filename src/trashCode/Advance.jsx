import React, { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import BottomMenu from '../../components/BottomMenu';
import ContainedBtn from '../../components/ContainedBtn';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { workersData } from '../../components/SelectWorkerSection';
import WorkerCard2 from '../../components/WorkerCard2';
import { theme_secondary, white } from '../../styles/colors';
import { validateWages } from '../../utils/formValidator';

const Advance = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [workerData, setWorkerData] = useState({});

    const [amount, setAmount] = useState("");
    const [amountError, setAmountError] = useState("");
    const [purpose, setPurpose] = useState("");

    const handleSelectWorker = useCallback((wId, name, recordId) => {
        setWorkerData({workerId:wId, name, recordId});
        setMenuVisible(true);
    }, []);

    const giveAdvanceHandler = () => {
      const amountCheck = validateWages(amount);
      if(!amountCheck.isValid){
        setAmountError(amountCheck.errorText);
        return;
      }
      setAmountError("");
      console.log("All ok");
    }

  return (
    <SafeAreaView style={{flex:1}}>
      <Header headingText="Advance" />
      <StatusBar barStyle={'dark-content'} backgroundColor={white} />

      <View
        style={{flex: 1, backgroundColor: white, paddingHorizontal: scale(10)}}>
        <Text style={styles.headingText}>Choose Worker</Text>

        <FlatList
          style={{marginTop: verticalScale(10)}}
          data={workersData}
          renderItem={({item}) => (
            <WorkerCard2
              _id={item._id}
              name={item.name}
              handlePress={handleSelectWorker}
              role={item.role}
            />
          )}
          keyExtractor={item => item._id}
        />
      </View>

      <BottomMenu
        visible={menuVisible}
        setVisible={setMenuVisible}
        title={workerData.name}
      >
        <View style={{padding:moderateScale(10), marginVertical:verticalScale(10)}}>
          <Input
            label='Amount'
            placeholder='Enter Amount...'
            keyboardType='number-pad'
            value={amount}
            onChangeText={(txt) => setAmount(txt)}
            errorText={amountError}
          />
          <Input
            label='Purpose'
            placeholder='Purpose of advance...'
            value={purpose}
            onChangeText={(txt) => setPurpose(txt)}
          />
          <ContainedBtn
            title='Give Advance'
            handler={giveAdvanceHandler}
          />
        </View>
      </BottomMenu>
    </SafeAreaView>
  );
};

export default Advance;

const styles = StyleSheet.create({
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
