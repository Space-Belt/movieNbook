import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomIcon from '../components/icons/CustomIcon';
import {SPACING, BORDERRADIUS, COLORS, FONTSIZE} from '../theme/theme';
import ProfileHeader from '../components/Profile/ProfileHeader';
import {useRecoilValue} from 'recoil';
import {userInfoState} from '../recoil/User';
import ImageSelectWayModal from '../components/Profile/ImageSelectWayModal';
import ReusableModal from '../components/Modal/ReusableModal';
import EditableInfo from '../components/Profile/EditableInfo';

const EditProfileScreen = () => {
  const myInfo = useRecoilValue(userInfoState);

  const [profileImage, setProfileImage] = React.useState<string | null>(
    myInfo.profileImage ? myInfo.profileImage : '',
  );
  const [userName, setUserName] = React.useState<string>(
    myInfo.user_name ? myInfo.user_name : '',
  );
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ProfileHeader title={'Edit Profile'} closeBtnVisible={true} />
        <EditableInfo
          myInfo={myInfo}
          profileImage={profileImage}
          userName={userName}
          setModalOpen={setModalOpen}
        />
      </SafeAreaView>
      <ReusableModal
        visible={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        children={<ImageSelectWayModal />}
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
