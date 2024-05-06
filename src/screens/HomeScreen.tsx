import {useQuery} from '@tanstack/react-query';
import * as React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {getMovie, getMovies} from '../api/apiMovie';
import CategoryHeader from '../components/CategoryHeader';
import LoggedInHeader from '../components/MainPageComponents/LoggedInHeader';
import NowPlayingList from '../components/MainPageComponents/NowPlayingList';
import ReusableList from '../components/MainPageComponents/ReusableList';
import {COLORS, SPACING} from '../theme/theme';
import BasicWrapper from '../components/BasicWrapper';

export const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const {data: nowPlayingMovies, isLoading: nowPlayingLoading} = useQuery({
    queryKey: ['nowPlayingMoviesKey'],
    queryFn: () => getMovie('now-playing', 1),
    staleTime: 5 * 60 * 1000,
  });

  const {data: popularMovies, isLoading: popularLoading} = useQuery({
    queryKey: ['popularMoviesKey'],
    queryFn: () => getMovies('popular', 2),
    staleTime: 5 * 60 * 1000,
  });

  const {data: upcomingMovies, isLoading: upcomingLoading} = useQuery({
    queryKey: ['upcomingMoviesKey'],
    queryFn: () => getMovies('upcoming', 3),
    staleTime: 5 * 60 * 1000,
  });

  if (nowPlayingLoading || popularLoading || upcomingLoading) {
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
    <BasicWrapper>
      <ScrollView style={styles.container}>
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
        <ReusableList
          data={upcomingMovies !== undefined ? upcomingMovies : []}
        />
      </ScrollView>
    </BasicWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeWrapper: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
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
    paddingHorizontal: 15,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});
