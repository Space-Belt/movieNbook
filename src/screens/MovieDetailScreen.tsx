import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import React from 'react';
import {RootStackParamList} from './MainScreen';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {useQuery} from '@tanstack/react-query';
import {movieDetails, searchMovies} from '../api/apiMovie';
import {COLORS} from '../theme/theme';
import {baseImagePath} from '../api/apicalls';
import LinearGradient from 'react-native-linear-gradient';

type MovieProps = NativeStackScreenProps<
  RootStackParamList,
  'MovieDetailScreen'
>;

const MovieDetailScreen = ({route, navigation}: MovieProps) => {
  const {
    data: movieDetail,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['movieDetail'],
    queryFn: () => movieDetails(route.params.movieId),
    staleTime: 5 * 60 * 1000,
  });

  React.useEffect(() => {
    console.log(movieDetail);
  }, [movieDetail]);

  if (isLoading) {
    <View>
      <ActivityIndicator size={'large'} color={COLORS.White} />
    </View>;
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{
          uri: baseImagePath('w780', movieDetail?.backdrop_path),
        }}
        style={styles.imageBG}>
        <LinearGradient
          colors={[COLORS.BlackRGB10, COLORS.Black]}
          style={styles.linearGradient}>
          <Text style={{color: 'white'}}>Sign in with Facebook</Text>
        </LinearGradient>
      </ImageBackground>
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
  linearGradient: {
    height: '100%',
  },
});
