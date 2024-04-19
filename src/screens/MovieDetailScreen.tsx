import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import {RootStackParamList} from './MainScreen';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {useQuery} from '@tanstack/react-query';
import {movieDetails, searchMovies} from '../api/apiMovie';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {baseImagePath} from '../api/apicalls';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/icons/CustomIcon';
import {useFocusEffect} from '@react-navigation/native';
import LinearHeader from '../components/DetailPageComponents/LinearHeader';
import FastImage from 'react-native-fast-image';

type MovieProps = NativeStackScreenProps<
  RootStackParamList,
  'MovieDetailScreen'
>;

const MovieDetailScreen = ({route, navigation}: MovieProps) => {
  const {
    data: movieDetail,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['movieDetail'],
    queryFn: () => movieDetails(route.params.movieId),
    staleTime: 5 * 60 * 1000,
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );

  if (isLoading) {
    <View>
      <ActivityIndicator size={'large'} color={COLORS.White} />
    </View>;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{height: 471}}>
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
    </ScrollView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  imageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },

  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  linearGradient: {
    height: '100%',
  },
  iconContainer: {
    position: 'absolute',
    top: SPACING.space_12,
    left: SPACING.space_12,
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
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
});
