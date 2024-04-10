import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {searchMovies} from '../api/apiMovie';
import InputHeader from '../components/InputHeader';
import {COLORS} from '../theme/theme';

const {width, height} = Dimensions.get('window');

const getNowPlayingMoviesList = async (keyword: string) => {
  searchMovies(keyword);
};

const HomeScreen = () => {
  const navigation = useNavigation();

  const [nowPlayingMoviesList, setNowPlayingMoviesList] =
    React.useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] =
    React.useState<any>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] =
    React.useState<any>(undefined);

  const searchMoviesFunction = () => {
    // navigation.navigate('Search');
    searchMovies('a');
  };

  if (
    nowPlayingMoviesList == undefined &&
    nowPlayingMoviesList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null &&
    upcomingMoviesList == undefined &&
    upcomingMoviesList == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />
        <View>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />

      <View style={styles.loadingContainer}></View>
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
});
