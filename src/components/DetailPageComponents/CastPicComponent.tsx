import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import FastImage from 'react-native-fast-image';

type Props = {
  imagePath: string;
  title: string;
};

const CastPicComponent = ({imagePath, title}: Props) => {
  return (
    <View style={styles.container}>
      <FastImage source={{uri: imagePath}} style={styles.cardImage} />
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </View>
  );
};

export default CastPicComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 50,
  },
  cardImage: {
    width: 50,
    aspectRatio: 1920 / 2880,
    borderRadius: BORDERRADIUS.radius_25 * 4,
  },
  title: {
    marginTop: 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_8,
    color: COLORS.White,
    textAlign: 'center',
  },
});
