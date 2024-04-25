import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomIcon from '../icons/CustomIcon';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import {useNavigation} from '@react-navigation/native';

const MenuComponent = React.memo(() => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={styles.menuWrapper}
        onPress={() => {
          navigation.navigate('EditProfileScreen');
        }}>
        <View style={styles.menuFrontWrapper}>
          <CustomIcon name="user" style={styles.userIcon} />
          <Text style={styles.profileText}>Profile</Text>
        </View>
        <CustomIcon name={'arrow-right'} style={styles.rightArrowIcon} />
      </TouchableOpacity>
      <View style={styles.menuWrapper}>
        <View style={styles.menuFrontWrapper}>
          <CustomIcon name={'info'} style={styles.infoIcon} />
          <Text style={styles.profileText}>App Version 1.1.0</Text>
        </View>
      </View>
    </View>
  );
});

export default MenuComponent;

const styles = StyleSheet.create({
  menuWrapper: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuFrontWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
    marginRight: 20,
  },
  rightArrowIcon: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  infoIcon: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
    marginRight: 16,
  },
  profileText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.White,
  },
});
