import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import CustomIcon from '../components/icons/CustomIcon';
import ProfileHeader from '../components/Profile/ProfileHeader';
import FastImage from 'react-native-fast-image';
import {useRecoilValue} from 'recoil';
import {userInfoState} from '../recoil/User';
import {ImageAssets} from '../assets/images/ImageAssets';
import MenuComponent from '../components/Profile/MenuComponent';
import {useNavigation} from '@react-navigation/native';

const UserScreen = () => {
  const myInfo = useRecoilValue(userInfoState);

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader title={'My Profile'} closeBtnVisible={false} />
      <View style={styles.nameProfile}>
        <View style={styles.profileImg}>
          <FastImage
            source={ImageAssets.profileImage}
            style={styles.imageStyle}
          />
          <Text style={styles.userNameText}>{myInfo.user_name}</Text>
        </View>
      </View>
      <MenuComponent />
    </SafeAreaView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  nameProfile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImg: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 60,
    height: 60,
  },
  userNameText: {
    marginTop: 20,
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
    fontWeight: '500',
  },
});
