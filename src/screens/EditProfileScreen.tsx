import {
  ActionSheetIOS,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useCallback} from 'react';
import CustomIcon from '../components/icons/CustomIcon';
import {SPACING, BORDERRADIUS, COLORS, FONTSIZE} from '../theme/theme';
import ProfileHeader from '../components/Profile/ProfileHeader';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {userInfoState} from '../recoil/User';
import ImageSelectWayModal from '../components/Profile/ImageSelectWayModal';
import ReusableModal from '../components/Modal/ReusableModal';
import EditableInfo from '../components/Profile/EditableInfo';
import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {changeInfo} from '../api/apiUser';

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 360,
  maxHeight: 360,
  includeBase64: Platform.OS === 'android',
};

const EditProfileScreen = () => {
  const myInfo = useRecoilValue(userInfoState);
  const setMyInfo = useSetRecoilState(userInfoState);

  const [profileImage, setProfileImage] = React.useState<Asset | null>(null);

  const [userName, setUserName] = React.useState<string>(
    myInfo.user_name ? myInfo.user_name : '',
  );

  const changeTextStyle: TextStyle = {
    color: COLORS.White,
  };

  const changeBtnStyle: ViewStyle = {
    backgroundColor: userName !== '' ? COLORS.Orange : COLORS.Grey,
  };

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const modalClose = () => {
    setModalOpen(prev => !prev);
  };

  const onPickImage = (res: any) => {
    if (res.didCancel || !res) {
      return;
    }
    console.log('PickImage', res);
    // setProfileImage(res.assets[0]);
    setProfileImage({
      ...res.assets[0],
      uri:
        Platform.OS === 'android'
          ? res.assets[0].uri
          : res.assets[0].uri!.replace('file://', ''),
    });
  };

  const onLaunchCamera = () => {
    launchCamera(imagePickerOption as CameraOptions, onPickImage);
  };

  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption as ImageLibraryOptions, onPickImage);
  };

  const handleModalOpen = () => {
    if (Platform.OS === 'android') {
      setModalOpen(prev => !prev);
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['사진 찍기', '사진 선택', '취소'],
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            onLaunchCamera();
          } else if (buttonIndex === 1) {
            onLaunchImageLibrary();
          }
        },
      );
    }
  };

  const changeProfile = () => {
    const formdata = new FormData();
    const file = {
      name: profileImage?.fileName,
      type: profileImage?.type,
      uri: profileImage?.uri,
    };
    formdata.append('image', file);
    changeInfo(formdata, userName);
    setMyInfo({
      ...myInfo,
      profileImage: profileImage?.uri,
      user_name: userName,
    });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.topWrapper}>
          <ProfileHeader title={'Edit Profile'} closeBtnVisible={true} />
          <EditableInfo
            setProfileImage={setProfileImage}
            myInfo={myInfo}
            profileImage={profileImage}
            userName={userName}
            setUserName={setUserName}
            handleModalOpen={handleModalOpen}
          />
        </View>
        <TouchableOpacity
          style={[styles.btnStyle, changeBtnStyle]}
          onPress={() => {
            changeProfile();
          }}>
          <Text style={[styles.btnText, changeTextStyle]}>Save</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <ReusableModal
        visible={modalOpen}
        onClose={modalClose}
        children={
          <ImageSelectWayModal
            onClose={modalClose}
            onLaunchCamera={onLaunchCamera}
            onLaunchImageLibrary={onLaunchImageLibrary}
          />
        }
      />
    </>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  topWrapper: {
    flex: 1,
  },
  iconContainer: {
    position: 'absolute',
    top: SPACING.space_28,
    left: SPACING.space_20,
    height: SPACING.space_36,
    width: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.Orange,
  },
  iconStyle: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
  },
  btnStyle: {
    width: '100%',
    borderRadius: 19.5,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: FONTSIZE.size_16,
    fontWeight: '600',
  },
});
