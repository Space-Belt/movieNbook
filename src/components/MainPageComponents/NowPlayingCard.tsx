import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {IMovie} from '../../api/apiMovie';
import {baseImagePath} from '../../api/apicalls';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import CustomIcon from '../icons/CustomIcon';

type Props = {
  item: IMovie;
  handleCardClicked: (args: number) => void;
};

const NowPlayingCard = ({item, handleCardClicked}: Props) => {
  return (
    <TouchableOpacity onPress={() => handleCardClicked(item.id)}>
      <View style={styles.container}>
        <FastImage
          source={{uri: baseImagePath('w780', item.poster_path)}}
          style={styles.imageStyle}
        />
        <View style={styles.ratingTextWrapper}>
          <CustomIcon name="star" style={styles.starIcon} />
          <Text style={styles.ratingText}>
            {item.vote_average.toFixed(1)} ({item.vote_count.toLocaleString()})
          </Text>
        </View>
        <Text style={styles.titleText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NowPlayingCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 266,
    backgroundColor: COLORS.Black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    aspectRatio: 2 / 3,
    borderRadius: BORDERRADIUS.radius_20,
    width: '100%',
    resizeMode: 'cover',
  },
  ratingTextWrapper: {
    marginTop: SPACING.space_10,
    gap: SPACING.space_10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Yellow,
  },

  ratingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  titleText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    textAlign: 'center',
    paddingVertical: SPACING.space_10,
  },
});
