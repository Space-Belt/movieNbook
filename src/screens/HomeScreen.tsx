import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import * as React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {IMovie, getMovie, getMovies, queryKey} from '../api/apiMovie';
import CategoryHeader from '../components/CategoryHeader';
import NowPlayingList from '../components/MainPageComponents/NowPlayingList';
import {COLORS, SPACING} from '../theme/theme';
import LoggedInHeader from '../components/MainPageComponents/LoggedInHeader';
import ReusableList from '../components/MainPageComponents/ReusableList';

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
    queryKey: ['nowPlayingMoviesKey'],
    queryFn: () => getMovie('now-playing', 1),
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: popularMovies,
    isLoading: popularLoading,
    isError: popularIsError,
    error: popularError,
    isSuccess: popularSuccess,
  } = useQuery({
    queryKey: ['popularMoviesKey'],
    queryFn: () => getMovies('popular', 2),
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: upcomingMovies,
    isLoading: upcomingLoading,
    isError: upcomingIsError,
    error: upcomingError,
    isSuccess: upcomingSuccess,
  } = useQuery({
    queryKey: ['upcomingMoviesKey'],
    queryFn: () => getMovies('upcoming', 3),
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
    if (nowPlayingMovies !== undefined) {
      setNowPlayingMoviesList(nowPlayingMovies);
    }
  }, [nowPlayingMovies]);

  React.useEffect(() => {
    if (popularMovies !== undefined) {
      setPopularMoviesList(popularMovies);
    }
  }, [popularMovies]);

  React.useEffect(() => {
    if (upcomingMovies !== undefined) {
      setUpcomingMoviesList(upcomingMovies);
    }
  }, [upcomingMovies]);

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
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />
      <LoggedInHeader />
      <View style={styles.categoryWrapper}>
        <CategoryHeader title={'Now Playing'} />
      </View>
      <NowPlayingList
        data={nowPlayingMovies !== undefined ? nowPlayingMovies : []}
      />
      <View style={styles.categoryWrapper}>
        <CategoryHeader title={'Popular'} />
      </View>
      <ReusableList data={popularMovies !== undefined ? popularMovies : []} />
      <View style={styles.categoryWrapper}>
        <CategoryHeader title={'Upcoming'} />
      </View>
      <ReusableList data={upcomingMovies !== undefined ? upcomingMovies : []} />
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
    marginTop: 25,
    marginBottom: 25,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});
