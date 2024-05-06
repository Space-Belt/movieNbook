import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useRecoilValue} from 'recoil';
import {ImageAssets} from '../assets/images/ImageAssets';
import MenuComponent from '../components/Profile/MenuComponent';
import ProfileHeader from '../components/Profile/ProfileHeader';
import {userInfoState} from '../recoil/User';
import {COLORS, FONTSIZE} from '../theme/theme';

const UserScreen = () => {
  const myInfo = useRecoilValue(userInfoState);

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader title={'My Profile'} closeBtnVisible={false} />
      <View style={styles.nameProfile}>
        <View style={styles.profileImg}>
          <FastImage
            source={{uri: myInfo.profileImage}}
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
    borderRadius: 30,
  },
  userNameText: {
    marginTop: 20,
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
    fontWeight: '500',
  },
});
