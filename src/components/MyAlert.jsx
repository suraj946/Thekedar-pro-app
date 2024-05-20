import React, { memo } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button, Icon, Portal } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { danger, dark_light_l1, dark_light_l2, white } from '../styles/colors';

const {height} = Dimensions.get('window');

const MyAlert = ({
  buttons = [{
    text: "Done",
    onPress: () => {},
  }],
  cancellable = true,
  icon = "alert",
  iconColor = danger,
  message = "This is a message",
  title = "This is a title",
  visible = false,
  setVisible = () => {},
}) => {
  const handleReqClose = () => {
    if (cancellable) {
      setVisible(false);
    }
  };

  const handlePress = onPress => {
    if (onPress) {
      onPress();
    }
    setVisible(false);
  };

  return (
    <Portal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={handleReqClose}>
        <TouchableWithoutFeedback onPress={handleReqClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.menuItemContainer}>
          <View style={styles.headingView}>
            <Icon source={icon} size={moderateScale(27)} color={iconColor} />
            <Text style={styles.headingText}>{title}</Text>
          </View>

          <View style={{paddingVertical: verticalScale(10)}}>
            <Text style={styles.messageText}>{message}</Text>
          </View>

          <View style={styles.btnView}>
            {buttons.map(btn => (
              <Button
                mode="contained"
                style={styles.btnStyle}
                key={btn.text}
                onPress={() => handlePress(btn.onPress)}>
                {btn.text}
              </Button>
            ))}
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default memo(MyAlert);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemContainer: {
    position: 'absolute',
    top: height / 3.3,
    backgroundColor: white,
    width: '80%',
    minHeight: '30%',
    alignSelf: 'center',
    borderRadius: moderateScale(5),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
  },
  headingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingText: {
    color: dark_light_l1,
    fontSize: moderateScale(20),
    paddingVertical: verticalScale(5),
    textAlign: 'center',
    alignSelf: 'center',
    marginLeft: scale(10),
  },
  messageText: {
    color: dark_light_l2,
    fontSize: moderateScale(16),
    paddingHorizontal: scale(10),
    alignSelf: 'center',
    textAlign: 'center',
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  btnStyle: {
    marginHorizontal: scale(5),
  },
});
