import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {baseImagePath} from '../../api/apicalls';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../icons/CustomIcon';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../../theme/theme';

type Props = {
  imagePath: string;
  action: () => void;
};

const LinearHeader = ({imagePath, action}: Props) => {
  return (
    <ImageBackground
      source={{
        uri: baseImagePath('w780', imagePath),
      }}
      style={styles.imageBG}>
      <LinearGradient
        colors={[COLORS.BlackRGB10, COLORS.Black]}
        style={styles.linearGradient}>
        <TouchableOpacity style={styles.iconContainer} onPress={action}>
          <CustomIcon name="close" style={styles.iconStyle} />
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
};

export default LinearHeader;

const styles = StyleSheet.create({
  imageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  iconContainer: {
    position: 'absolute',
    top: SPACING.space_20 * 2,
    left: SPACING.space_36,
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
