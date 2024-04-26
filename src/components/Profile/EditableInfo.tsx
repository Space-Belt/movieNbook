import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import FastImage from 'react-native-fast-image';
import {ImageAssets} from '../../assets/images/ImageAssets';
import EditIcon from '../../assets/images/editIcon.svg';
import CloseIcon from '../../assets/images/closeIcon.svg';
import {Asset, ImagePickerResponse} from 'react-native-image-picker';

interface IProps {
  myInfo: any;
  profileImage: Asset | null;
  setProfileImage: Dispatch<SetStateAction<Asset | null>>;
  userName: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  handleModalOpen: () => void;
}

const EditableInfo = ({
  myInfo,
  profileImage,
  setProfileImage,
  userName,
  setModalOpen,
  handleModalOpen,
}: IProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageArea}>
        {profileImage === null ? (
          <TouchableOpacity
            style={styles.imageWrapper}
            onPress={handleModalOpen}>
            <FastImage
              // source={{uri: myInfo.profileImage}}
              source={ImageAssets.profileImage}
              style={styles.imageStyle}
            />
            <EditIcon style={styles.editIconStyle} />
          </TouchableOpacity>
        ) : (
          <View style={styles.imageWrapper}>
            <FastImage
              source={{uri: profileImage.uri}}
              style={styles.imageStyle}
            />
            <TouchableOpacity
              onPress={() => {
                setProfileImage(null);
              }}>
              <CloseIcon style={styles.editIconStyle} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default EditableInfo;

const styles = StyleSheet.create({
  container: {},
  imageArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageStyle: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  editIconStyle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
