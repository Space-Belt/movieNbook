import {StyleSheet, Text, View} from 'react-native';

import React from 'react';
import {RootStackParamList} from './MainScreen';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {useQuery} from '@tanstack/react-query';
import {movieDetails, searchMovies} from '../api/apiMovie';

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
  return (
    <View>
      <Text>{route.params.movieId}</Text>
    </View>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({});
