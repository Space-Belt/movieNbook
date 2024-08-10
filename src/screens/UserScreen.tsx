import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useRecoilValue} from 'recoil';
import BasicWrapper from '../components/BasicWrapper';
import MenuComponent from '../components/Profile/MenuComponent';
import ProfileHeader from '../components/Profile/ProfileHeader';
import {userInfoState} from '../recoil/User';
import {COLORS, FONTSIZE} from '../theme/theme';
import {isAndroid} from '../utils/platform';

const UserScreen = () => {
  const myInfo = useRecoilValue(userInfoState);

  return (
    <BasicWrapper>
      <View style={styles.container}>
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
      </View>
    </BasicWrapper>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
    paddingHorizontal: isAndroid ? 25 : 20,
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
