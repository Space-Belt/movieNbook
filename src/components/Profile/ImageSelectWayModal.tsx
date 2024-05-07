import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {FONTSIZE} from '../../theme/theme';
import CustomIcon from '../icons/CustomIcon';

interface IProps {
  onClose: () => void;
  onLaunchCamera: () => void;
  onLaunchImageLibrary: () => void;
}

const imagePickerOption = {
  mediaType: 'photo',
};

const ImageSelectWayModal = ({
  onClose,
  onLaunchCamera,
  onLaunchImageLibrary,
}: IProps) => {
  return (
    <View style={styles.background}>
      <View style={styles.whiteBox}>
        <Pressable
          style={styles.actionButton}
          android_ripple={{color: '#eee'}}
          onPress={() => {
            onLaunchCamera();
            onClose();
          }}>
          <CustomIcon name="video" style={styles.iconStyle} />
          <Text style={styles.actionText}>카메라로 촬영하기</Text>
        </Pressable>
        <Pressable
          style={styles.actionButton}
          android_ripple={{color: '#eee'}}
          onPress={() => {
            onLaunchImageLibrary();
            onClose();
          }}>
          <Text style={styles.actionText}>사진 선택하기</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ImageSelectWayModal;

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0,9)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 2,
  },
  actionButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    fontSize: FONTSIZE.size_18,
    marginRight: 15,
  },
  text: {
    fontSize: 26,
    color: 'white',
  },
  actionText: {
    color: 'black',
  },
});
