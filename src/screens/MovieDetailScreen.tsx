import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import {RootStackParamList} from './MainScreen';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {useQuery} from '@tanstack/react-query';
import {movieDetails, searchMovies} from '../api/apiMovie';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import {baseImagePath} from '../api/apicalls';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/icons/CustomIcon';
import {useFocusEffect} from '@react-navigation/native';
import LinearHeader from '../components/DetailPageComponents/LinearHeader';

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
    <ScrollView style={styles.container}>
      <LinearHeader
        imagePath={movieDetail?.backdrop_path}
        action={handleGoBack}
      />
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
  iconContainer: {
    position: 'absolute',
    top: SPACING.space_20 * 2,
    left: SPACING.space_36,
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
});
