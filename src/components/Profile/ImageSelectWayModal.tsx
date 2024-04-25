import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomIcon from '../icons/CustomIcon';
import {FONTSIZE} from '../../theme/theme';

interface IProps {}

const ImageSelectWayModal = () => {
  return (
    <View style={styles.background}>
      <View style={styles.whiteBox}>
        <Pressable
          style={styles.actionButton}
          android_ripple={{color: '#eee'}}
          onPress={() => {
            // onLaunchCamera();
            // onClose();
          }}>
          <CustomIcon name="video" style={styles.iconStyle} />
          <Text style={styles.actionText}>카메라로 촬영하기</Text>
        </Pressable>
        <Pressable
          style={styles.actionButton}
          android_ripple={{color: '#eee'}}
          onPress={() => {
            // onLaunchImageLibrary();
            // onClose();
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
