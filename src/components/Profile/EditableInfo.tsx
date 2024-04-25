import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import FastImage from 'react-native-fast-image';
import {ImageAssets} from '../../assets/images/ImageAssets';
import EditIcon from '../../assets/images/editIcon.svg';

interface IProps {
  myInfo: any;
  profileImage: string | null;
  userName: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const EditableInfo = ({
  myInfo,
  profileImage,
  userName,
  setModalOpen,
}: IProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageArea}>
        {profileImage !== null ? (
          <TouchableOpacity
            style={styles.imageWrapper}
            onPress={() => {
              setModalOpen(prev => !prev);
            }}>
            <FastImage
              source={ImageAssets.profileImage}
              style={styles.imageStyle}
            />
            <EditIcon style={styles.editIconStyle} />
          </TouchableOpacity>
        ) : (
          <View></View>
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
