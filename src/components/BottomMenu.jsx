import React, {memo, useEffect, useState} from 'react';
import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Portal} from 'react-native-paper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {theme_primary, white} from '../styles/colors';

const BottomMenu = ({
  children,
  title = '',
  visible = false,
  setVisible,
  notToClose = false,
}) => {
  const handleClose = () => {
    if (notToClose) {
      return;
    }
    setVisible(false);
  };
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardVisible(true);
        setKeyboardHeight(e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <Portal>
      <Modal
        statusBarTranslucent
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          //condition added later if any bug arises due to this then check here
          if (notToClose) {
            return;
          }
          setVisible(false);
        }}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={[styles.menuItemContainer, {bottom: keyboardVisible ? keyboardHeight : 0}]}>
          <View style={styles.titleView}>
            <Text numberOfLines={1} style={styles.titleText}>
              {title}
            </Text>
          </View>

          {children}
        </View>
      </Modal>
    </Portal>
  );
};

export default memo(BottomMenu);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemContainer: {
    position: 'absolute',
    backgroundColor: white,
    width: '90%',
    alignSelf: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  titleView: {
    width: '100%',
    backgroundColor: theme_primary,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: moderateScale(5),
    paddingHorizontal: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: moderateScale(17),
    color: white,
  },
});
