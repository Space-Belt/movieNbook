import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface IProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactElement;
}

const ReusableModal = ({visible, onClose, children}: IProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      {children}
    </Modal>
  );
};

export default ReusableModal;

const styles = StyleSheet.create({});
