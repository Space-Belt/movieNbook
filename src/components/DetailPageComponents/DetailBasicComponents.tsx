import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
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
import moment from 'moment';
import CategoryHeader from '../CategoryHeader';
import CastPicComponent from './CastPicComponent';
import BasicWrapper from '../BasicWrapper';

type Props = {
  movieDetail: any;
  handleGoBack: () => void;
  setPage: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
};

const DetailBasicComponents = ({
  movieDetail,
  handleGoBack,
  setPage,
  isLoading,
}: Props) => {
  const keyExtractor = (item: any) => {
    return `${item.id}`;
  };

  const castingRendring = ({item}: {item: any}) => {
    return (
      <CastPicComponent
        imagePath={baseImagePath('w185', item.profile_path)}
        title={item.original_name}
      />
    );
  };

  if (isLoading) {
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={COLORS.White} />
    </View>;
  }

  return (
    <BasicWrapper>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topWrapper}>
          <LinearHeader
            imagePath={movieDetail?.movieDetail.backdrop_path}
            action={handleGoBack}
          />
          <FastImage
            source={{
              uri: baseImagePath('w342', movieDetail?.movieDetail?.poster_path),
            }}
            style={styles.cardImage}
          />
        </View>
        <View style={styles.runtimeWrapper}>
          <CustomIcon name="clock" style={styles.clockIcon} />
          <Text style={styles.runtimeText}>
            {Math.floor(movieDetail?.movieDetail?.runtime / 60)}h{' '}
            {Math.floor(movieDetail?.movieDetail?.runtime % 60)}m
          </Text>
        </View>
        <Text style={styles.title}>
          {movieDetail?.movieDetail?.original_title}
        </Text>
        <View style={styles.genreWrapper}>
          {movieDetail?.movieDetail?.genres.map((item: any) => {
            return (
              <View style={styles.genreBox} key={item.id}>
                <Text style={styles.genreText}>{item.name}</Text>
              </View>
            );
          })}
        </View>
        <Text style={styles.subDescription}>{movieDetail?.tagline}</Text>
        <View style={styles.rateWrapper}>
          <CustomIcon name="star" style={styles.starIcon} />
          <Text style={styles.runtimeText}>
            {movieDetail?.movieDetail?.vote_average.toFixed(1)} (
            {movieDetail?.movieDetail?.vote_count.toLocaleString()})
          </Text>
        </View>

        <Text style={styles.dateText}>
          {moment(movieDetail?.release_date).format('YYYY년 MM월 DD일')}
        </Text>
        <Text style={styles.descriptionText}>
          {movieDetail?.movieDetail?.overview}
        </Text>

        <CategoryHeader title="캐스팅" />
        <FlatList
          data={movieDetail?.cast}
          keyExtractor={keyExtractor}
          renderItem={castingRendring}
          horizontal
          contentContainerStyle={styles.castingListWrapper}
        />

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            setPage(prev => prev + 1);
          }}>
          <Text style={styles.buttonText}>예약하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </BasicWrapper>
  );
};

export default DetailBasicComponents;

const styles = StyleSheet.create({
  safeWrapper: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
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
  rateWrapper: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Yellow,
  },
  dateText: {
    marginTop: 5,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
    paddingHorizontal: 20,
  },
  descriptionText: {
    marginTop: 15,
    marginBottom: 25,
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    paddingHorizontal: 20,
  },
  castingListWrapper: {
    gap: 30,
    marginTop: 15,
    paddingHorizontal: 20,
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.Orange,
    marginVertical: SPACING.space_24,
    borderRadius: BORDERRADIUS.radius_25 * 2,
    height: 46,
    marginHorizontal: 20,
  },
  buttonText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
});
