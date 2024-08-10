import {StyleSheet} from 'react-native';

import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {movieDetails} from '../api/apiMovie';
import {payMovie} from '../api/apiPay';
import DetailBasicComponents from '../components/DetailPageComponents/DetailBasicComponents';
import PayComponent from '../components/DetailPageComponents/PayComponent';
import PayResultComponent from '../components/DetailPageComponents/PayResultComponent';
import SelectSeatComponent from '../components/DetailPageComponents/SelectSeatComponent';
import {
  MainStackNavigationProp,
  MainStackParamList,
} from '../navigation/MainStackNavigator';
import {COLORS} from '../theme/theme';

type RouteProps = RouteProp<MainStackParamList, 'MovieDetailScreen'>;

const MovieDetailScreen = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const route = useRoute<RouteProps>();

  const {
    data: movieDetail,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['movieDetail'],
    queryFn: () => movieDetails(route?.params?.movieId),
    staleTime: 5 * 60 * 1000,
    enabled: Boolean(route?.params?.movieId !== undefined),
  });

  const [reservationPage, setReservationPage] = React.useState<number>(0);
  const [seatId, setSeatId] = React.useState<number[]>([]);
  const [showTimeId, setShowTimeId] = React.useState<number>();
  const [paymentWay, setPaymentWay] = React.useState<
    'WALLET' | 'CREDIT_CARD'
  >();
  const [totalPrice, setTotalPrice] = React.useState<number>(0);

  const handleGoBack = () => {
    if (reservationPage == 0) {
      navigation.goBack();
    } else {
      setReservationPage(prev => prev - 1);
    }
  };

  const handleMakeOrder = async () => {
    let result: any;
    if (seatId && showTimeId && paymentWay) {
      result = await payMovie(
        route.params.movieId,
        showTimeId,
        seatId,
        paymentWay,
      );
    }
    return result;
  };

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );

  if (reservationPage === 0) {
    return (
      <DetailBasicComponents
        movieDetail={movieDetail}
        handleGoBack={handleGoBack}
        setPage={setReservationPage}
        isLoading={isLoading}
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
        seatId={seatId}
        setSeatId={setSeatId}
        setShowTimeId={setShowTimeId}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
      />
    );
  }

  if (reservationPage === 2) {
    return (
      <PayComponent
        handleGoBack={handleGoBack}
        setPage={setReservationPage}
        paymentWay={paymentWay}
        setPaymentWay={setPaymentWay}
        handleMakeOrder={handleMakeOrder}
        totalPrice={totalPrice}
        movieId={route.params.movieId}
        seatId={seatId}
        showTimeId={showTimeId}
      />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.Black,
  },
});
