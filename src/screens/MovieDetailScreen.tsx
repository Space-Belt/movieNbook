import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {movieDetails} from '../api/apiMovie';
import {COLORS} from '../theme/theme';
import {RootStackParamList} from './MainScreen';

import DetailBasicComponents from '../components/DetailPageComponents/DetailBasicComponents';
import SelectSeatComponent from '../components/DetailPageComponents/SelectSeatComponent';
import PayComponent from '../components/DetailPageComponents/PayComponent';
import PayResultComponent from '../components/DetailPageComponents/PayResultComponent';

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

  const [reservationPage, setReservationPage] = React.useState<number>(0);

  const handleGoBack = () => {
    if (reservationPage == 0) {
      navigation.goBack();
    } else {
      setReservationPage(prev => prev - 1);
    }
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

  if (reservationPage === 0) {
    return (
      <DetailBasicComponents
        movieDetail={movieDetail}
        handleGoBack={handleGoBack}
        page={reservationPage}
        setPage={setReservationPage}
      />
    );
  }

  if (reservationPage === 1) {
    return (
      <SelectSeatComponent
        handleGoBack={handleGoBack}
        setPage={setReservationPage}
        poster={movieDetail?.movieDetail?.backdrop_path}
        movieId={route.params.movieId}
      />
    );
  }

  if (reservationPage === 2) {
    return (
      <PayComponent handleGoBack={handleGoBack} setPage={setReservationPage} />
    );
  }

  if (reservationPage === 3) {
    return (
      <PayResultComponent
        handleGoBack={handleGoBack}
        setPage={setReservationPage}
      />
    );
  }
};

export default MovieDetailScreen;

const styles = StyleSheet.create({});
