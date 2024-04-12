import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import * as React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {IMovie, getMovies, queryKey} from '../api/apiMovie';
import CategoryHeader from '../components/CategoryHeader';
import InputHeader from '../components/InputHeader';
import NowPlayingList from '../components/MainPageComponents/NowPlayingList';
import {COLORS} from '../theme/theme';

export const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();

  const {
    data: nowPlayingMovies,
    isLoading: nowPlayingLoading,
    isError: nowPlayingIsError,
    error: nowPlayingError,
    isSuccess: nowPlayingIsSuccess,
  } = useQuery({
    queryKey: queryKey,
    queryFn: () => getMovies('now_playing'),
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: popularMovies,
    isLoading: popularLoading,
    isError: popularIsError,
    error: popularError,
    isSuccess: popularSuccess,
  } = useQuery({
    queryKey: queryKey,
    queryFn: () => getMovies('popular'),
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: upcomingMovies,
    isLoading: upcomingLoading,
    isError: upcomingIsError,
    error: upcomingError,
    isSuccess: upcomingSuccess,
  } = useQuery({
    queryKey: queryKey,
    queryFn: () => getMovies('upcoming'),
    staleTime: 5 * 60 * 1000,
  });

  const [nowPlayingMoviesList, setNowPlayingMoviesList] = React.useState<
    IMovie[]
  >([]);
  const [popularMoviesList, setPopularMoviesList] = React.useState<IMovie[]>(
    [],
  );
  const [upcomingMoviesList, setUpcomingMoviesList] = React.useState<IMovie[]>(
    [],
  );

  const searchMoviesFunction = () => {};

  React.useEffect(() => {
    if (nowPlayingMovies !== null) {
      setNowPlayingMoviesList(nowPlayingMovies);
    }
  }, [nowPlayingMovies]);

  if (
    nowPlayingLoading == null ||
    popularLoading == null ||
    upcomingLoading == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />
        <InputHeader searchFunction={searchMoviesFunction} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />
      <InputHeader searchFunction={searchMoviesFunction} />
      {/* 1. 랜덤 영화들 나오는 부분  내가 정한 기준 불러온것들 */}
      <View style={styles.categoryWrapper}>
        <CategoryHeader title={'Now Playing'} />
      </View>
      <NowPlayingList
        data={nowPlayingMovies !== undefined ? nowPlayingMovies : []}
      />
      {/* 2. 인기 영화  3번이랑 같은 컴포넌트*/}
      <View style={styles.categoryWrapper}>
        <CategoryHeader title={'Popular'} />
      </View>

      {/* 3. 개봉 예정 영화들 */}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  inputHeaderContainer: {},

  categoryWrapper: {
    flex: 1,
    marginTop: 20,
  },
});
