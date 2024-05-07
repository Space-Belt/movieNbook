import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import CustomIcon from '../icons/CustomIcon';
import {useNavigation} from '@react-navigation/native';

interface IProfileHeader {
  closeBtnVisible: boolean;
  title: string;
  handleGoBack?: () => void;
}

const ProfileHeader = React.memo(
  ({closeBtnVisible, title, handleGoBack}: IProfileHeader) => {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <View style={styles.invisibleIcon}>
          {closeBtnVisible && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                if (handleGoBack) {
                  handleGoBack();
                } else {
                  navigation.goBack();
                }
              }}>
              <CustomIcon name="close" style={styles.iconStyle} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.invisibleIcon} />
      </View>
    );
  },
);

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: FONTSIZE.size_20,
    fontWeight: '500',
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  iconContainer: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.Orange,
  },
  invisibleIcon: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
  iconStyle: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
  },
});
