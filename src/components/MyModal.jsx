import React from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { light, theme_primary, white } from '../styles/colors';

const {height} = Dimensions.get('window');
const MyModal = ({
  heading = 'Modal Heading',
  visible = false,
  setVisible,
  children,
  containerStyle = {},
  autoDismiss = true,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={autoDismiss ? () => setVisible(false) : () => {}}
      transparent
      statusBarTranslucent>
      <TouchableWithoutFeedback
        onPress={autoDismiss ? () => setVisible(false) : () => {}}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={[styles.modalContainer, containerStyle]}>
        <Text style={styles.heading} onPress={() => setVisible(false)}>
          {heading}
        </Text>
        {children}
      </View>
    </Modal>
  );
};

export default MyModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    top: height / 3.3,
    width: '90%',
    minHeight: verticalScale(100),
    maxHeight: verticalScale(400),
    backgroundColor: white,
    alignSelf: 'center',
    borderRadius: moderateScale(5),
    paddingTop: verticalScale(35),
  },
  heading: {
    color: light,
    position: 'absolute',
    top: 0,
    backgroundColor: theme_primary,
    width: '100%',
    textAlign: 'center',
    borderTopLeftRadius: moderateScale(5),
    borderTopRightRadius: moderateScale(5),
    fontSize: moderateScale(20),
    textTransform: 'capitalize',
    padding: moderateScale(5),
  },
});
