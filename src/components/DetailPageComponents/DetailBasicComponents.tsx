import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearHeader from './LinearHeader';
import FastImage from 'react-native-fast-image';
import {baseImagePath} from '../../api/apicalls';
import CustomIcon from '../icons/CustomIcon';
import {
  BORDERRADIUS,
  FONTSIZE,
  COLORS,
  SPACING,
  FONTFAMILY,
} from '../../theme/theme';

type Props = {
  movieDetail: any;
  handleGoBack: () => void;
};

const DetailBasicComponents = ({movieDetail, handleGoBack}: Props) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.topWrapper}>
        <LinearHeader
          imagePath={movieDetail?.backdrop_path}
          action={handleGoBack}
        />
        <FastImage
          source={{uri: baseImagePath('w342', movieDetail?.poster_path)}}
          style={styles.cardImage}
        />
      </View>
      <View style={styles.runtimeWrapper}>
        <CustomIcon name="clock" style={styles.clockIcon} />
        <Text style={styles.runtimeText}>
          {Math.floor(movieDetail?.runtime / 60)}h{' '}
          {Math.floor(movieDetail?.runtime % 60)}m
        </Text>
      </View>
      <Text style={styles.title}>{movieDetail?.original_title}</Text>
      <View style={styles.genreWrapper}>
        {movieDetail?.genres.map((item: any) => {
          return (
            <View style={styles.genreBox} key={item.id}>
              <Text style={styles.genreText}>{item.name}</Text>
            </View>
          );
        })}
      </View>
      <Text style={styles.subDescription}>{movieDetail?.tagline}</Text>
    </ScrollView>
  );
};

export default DetailBasicComponents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  topWrapper: {height: 471},
  cardImage: {
    width: 236,
    height: 353,
    resizeMode: 'cover',
    top: -118,
    left: '50%',
    transform: [{translateX: -118}],
    borderRadius: BORDERRADIUS.radius_10,
  },
  runtimeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.WhiteRGBA50,
    marginRight: SPACING.space_8,
  },
  runtimeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
  genreWrapper: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreBox: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA75,
  },
  subDescription: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    fontStyle: 'italic',
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
});
