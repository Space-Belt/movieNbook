import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomIcon from '../components/icons/CustomIcon';
import {SPACING, BORDERRADIUS, COLORS, FONTSIZE} from '../theme/theme';

const EditProfileScreen = () => {
  return (
    <TouchableOpacity style={styles.iconContainer} onPress={() => {}}>
      <CustomIcon name="close" style={styles.iconStyle} />
    </TouchableOpacity>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
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
