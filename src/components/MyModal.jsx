import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Modal, Portal} from 'react-native-paper';
import {
  dark,
  light,
  theme_primary,
  theme_secondary,
  white,
} from '../styles/colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';

const MyModal = ({
  heading = 'Modal Heading',
  visible = false,
  setVisible,
  children,
  statusBarColorRGBA = 'rgba(46, 77, 217, 0.6)',
  containerStyle = {},
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable
        dismissableBackButton
        onDismiss={() => setVisible(false)}>
        <StatusBar backgroundColor={statusBarColorRGBA} />
        <View style={[styles.modalContainer, containerStyle]}>
          <Text style={styles.heading} onPress={() => setVisible(false)}>
            {heading}
          </Text>
          {children}
        </View>
      </Modal>
    </Portal>
  );
};

export default MyModal;

const styles = StyleSheet.create({
  modalContainer: {
    width: '90%',
    minHeight: verticalScale(100),
    maxHeight:verticalScale(400),
    backgroundColor: white,
    alignSelf: 'center',
    borderRadius: moderateScale(5),
    position: 'relative',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop:verticalScale(35)
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
