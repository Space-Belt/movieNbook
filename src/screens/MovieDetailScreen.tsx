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
import DetailBasicComponents from '../components/DetailPageComponents/DetailBasicComponents';

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

  console.log(movieDetail);

  return (
    <DetailBasicComponents
      movieDetail={movieDetail}
      handleGoBack={handleGoBack}
    />
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({});
