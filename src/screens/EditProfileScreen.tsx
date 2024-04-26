import {
  ActionSheetIOS,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import CustomIcon from '../components/icons/CustomIcon';
import {SPACING, BORDERRADIUS, COLORS, FONTSIZE} from '../theme/theme';
import ProfileHeader from '../components/Profile/ProfileHeader';
import {useRecoilValue} from 'recoil';
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

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 360,
  maxHeight: 360,
  includeBase64: Platform.OS === 'android',
};

const EditProfileScreen = () => {
  const myInfo = useRecoilValue(userInfoState);

  const [profileImage, setProfileImage] = React.useState<Asset | null>(null);

  const [userName, setUserName] = React.useState<string>(
    myInfo.user_name ? myInfo.user_name : '',
  );
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const modalClose = () => {
    setModalOpen(prev => !prev);
  };

  const onPickImage = (res: any) => {
    if (res.didCancel || !res) {
      return;
    }
    console.log('PickImage', res);
    setProfileImage(res.assets[0]);
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
      console.log('dfdfdfdfdfdfd');
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

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ProfileHeader title={'Edit Profile'} closeBtnVisible={true} />
        <EditableInfo
          setProfileImage={setProfileImage}
          myInfo={myInfo}
          profileImage={profileImage}
          userName={userName}
          setModalOpen={setModalOpen}
          handleModalOpen={handleModalOpen}
        />
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
});
