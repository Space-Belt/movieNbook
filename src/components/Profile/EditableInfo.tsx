import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import FastImage from 'react-native-fast-image';
import {ImageAssets} from '../../assets/images/ImageAssets';
import EditIcon from '../../assets/images/editIcon.svg';
import CloseIcon from '../../assets/images/closeIcon.svg';
import {Asset, ImagePickerResponse} from 'react-native-image-picker';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';

interface IProps {
  myInfo: any;
  profileImage: Asset | null;
  setProfileImage: Dispatch<SetStateAction<Asset | null>>;
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  handleModalOpen: () => void;
}

const EditableInfo = ({
  myInfo,
  profileImage,
  setProfileImage,
  userName,
  setUserName,
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
      <Text style={styles.categoryText}>User Name</Text>
      <TextInput
        value={userName}
        onChangeText={text => {
          setUserName(text);
        }}
        placeholderTextColor={'#737373'}
        style={styles.textInput}
        placeholder="최소 3글자 입력해야합니다!"
      />
    </View>
  );
};

export default EditableInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageArea: {
    marginVertical: 30,
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
  categoryText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
    fontWeight: '600',
    color: '#737373',
  },
  textInput: {
    marginTop: 10,
    height: 50,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 19.5,
    color: COLORS.White,
    fontWeight: '500',
    fontFamily: FONTFAMILY.poppins_medium,
  },
});
