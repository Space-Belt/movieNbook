import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSetRecoilState} from 'recoil';
import {version} from '../../../package.json';
import LogoutIcon from '../../assets/images/icon_logout.svg';
import {MainStackNavigationProp} from '../../navigation/MainStackNavigator';
import {isLoggedInState} from '../../recoil/Auth';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import CustomIcon from '../icons/CustomIcon';

const APP_VERSION = version;

const MenuComponent = React.memo(() => {
  const navigation = useNavigation<MainStackNavigationProp>();

  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const handlePressProfile = () => {
    navigation.navigate('EditProfileScreen');
  };

  const logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('expiryTime');

    setIsLoggedIn(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.menuWrapper} onPress={handlePressProfile}>
        <View style={styles.menuFrontWrapper}>
          <CustomIcon name="user" style={styles.userIcon} />
          <Text style={styles.profileText}>Profile</Text>
        </View>
        <CustomIcon name={'arrow-right'} style={styles.rightArrowIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuWrapper} onPress={logout}>
        <View style={styles.menuFrontWrapper}>
          <LogoutIcon width={18} height={18} />
          <Text style={styles.profileText}>Logout</Text>
        </View>
        <CustomIcon name={'arrow-right'} style={styles.rightArrowIcon} />
      </TouchableOpacity>
      <View style={styles.menuWrapper}>
        <View style={styles.menuFrontWrapper}>
          <CustomIcon name={'info'} style={styles.infoIcon} />
          <Text style={styles.profileText}>App Version {APP_VERSION}</Text>
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
    gap: 10,
  },
  userIcon: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  rightArrowIcon: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  infoIcon: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  profileText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.White,
  },
});
