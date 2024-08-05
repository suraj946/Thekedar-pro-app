import React, { memo } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Portal } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { theme_primary, white } from '../styles/colors';

const BottomMenu = ({children, title = '', visible = false, setVisible, notToClose=false}) => {
  const handleClose = () => {
    if(notToClose){
      return;
    }
    setVisible(false);
  }
  return (
    <Portal>
      <Modal
        statusBarTranslucent
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          //condition added later if any bug arises due to this then check here
          if(notToClose){
            return;
          }
          setVisible(false);
        }}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.menuItemContainer}>
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
    bottom: verticalScale(0),
    backgroundColor: white,
    width: '100%',
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
