import React, { memo, useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Icon, Portal } from 'react-native-paper';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import {
  dark,
  dark_light_l1,
  dark_light_l2,
  light,
  light2,
  theme_primary,
} from '../styles/colors';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const MyDropDown = ({
  label = 'Example',
  options = [],
  value = '',
  onSelect = () => {},
  disabled = false,
  containerStyle = {},
}) => {
  const [labelText, setLabelText] = useState(label);
  const [visible, setVisible] = useState(false);
  const modalRef = useRef(null);
  const [listPosition, setListPosition] = useState({top: 0, left: 0, width: 0});
  const [moreStyle, setMoreStyle] = useState({
    menuStyle: {},
    listViewStyle: {},
  });

  const hideMenu = () => {
    setListPosition({top: 0, left: 0, width: 0});
    setVisible(false);
  };

  const toggleTropDown = () => {
    if (modalRef.current) {
      modalRef.current.measure((x, y, width, height, pageX, pageY) => {
        const availableHeight = windowHeight - (height + pageY);
        if (availableHeight >= 330) {
          setListPosition({top: height + pageY, left: pageX, width: width});
          setMoreStyle({
            menuStyle: {
              borderTopLeftRadius: moderateScale(5),
              borderTopRightRadius: moderateScale(5),
            },
            listViewStyle: {
              borderBottomLeftRadius: moderateScale(5),
              borderBottomRightRadius: moderateScale(5),
              borderTopWidth: moderateScale(1.5),
            },
          });
        } else {                    
          setListPosition({bottom: availableHeight+20, left: pageX, width: width});
          setMoreStyle({
            menuStyle: {
              borderBottomLeftRadius: moderateScale(5),
              borderBottomRightRadius: moderateScale(5),
            },
            listViewStyle: {
              borderTopLeftRadius: moderateScale(5),
              borderTopRightRadius: moderateScale(5),
              borderBottomWidth: moderateScale(1.5),
            },
          });
        }
      });
    }
    if (visible) hideMenu();
    else setVisible(true);
  };
  const onSelectItem = useCallback(item => {
    onSelect(item.value);
    setLabelText(item.label);
    hideMenu();
  }, []);

  return (
    <TouchableOpacity
      disabled={disabled}
      ref={modalRef}
      style={[
        styles.container,
        moreStyle.menuStyle,
        {borderRadius: visible ? 0 : moderateScale(5)},
        containerStyle,
      ]}
      activeOpacity={0.7}
      onPress={toggleTropDown}>
      <Text numberOfLines={1} style={[styles.heading, {color: disabled ? dark_light_l2 : dark}]}>
        {labelText}
      </Text>
      <Icon
        source={visible ? 'chevron-up' : 'chevron-down'}
        color={disabled ? dark_light_l2 : dark}
        size={moderateScale(25)}
      />
      {visible && (
        <Portal>
          <TouchableWithoutFeedback onPress={hideMenu}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          <View style={[styles.itemsView, {...listPosition}, moreStyle.listViewStyle]}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={options}
              renderItem={({item}) => (
                <DropDownCard
                  item={item}
                  onPress={onSelectItem}
                  value={value}
                />
              )}
              keyExtractor={(item) => item.value}
            />
          </View>
        </Portal>
      )}
    </TouchableOpacity>
  );
};

const DropDownCard = memo(({item, onPress, value}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => onPress(item)}>
      <Text
        numberOfLines={1}
        style={[
          styles.cardText,
          {color: value === item.value ? theme_primary : dark_light_l1},
        ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
});

export default MyDropDown;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
    backgroundColor: light,
    marginBottom: verticalScale(5),
    zIndex: 10,
  },
  heading: {
    fontSize: moderateScale(18),
  },
  overlay: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  itemsView: {
    position: 'absolute',
    width: '100%',
    maxHeight: 290,
    backgroundColor: light2,
    borderColor: theme_primary,
  },
  card: {
    backgroundColor: light,
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    marginTop: verticalScale(2),
  },
  cardText: {
    fontSize: moderateScale(17),
  },
});
