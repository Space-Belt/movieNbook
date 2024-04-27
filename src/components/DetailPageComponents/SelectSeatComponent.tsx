import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearHeader from './LinearHeader';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme/theme';
import {getMovieDate} from '../../api/apiMovie';
import {useQuery} from '@tanstack/react-query';

type Props = {
  poster: string;
  handleGoBack: () => void;
  movieId: number;
};

const SelectSeatComponent = ({poster, handleGoBack, movieId}: Props) => {
  const [availableDate, setAvailableDate] = React.useState<string[]>([]);
  const {data: movieDate, refetch: dateRefetch} = useQuery({
    queryKey: ['movieDate'],
    queryFn: () => getMovieDate(movieId),
  });

  React.useEffect(() => {
    if (movieDate !== undefined) {
      setAvailableDate(Object.keys(movieDate?.result));
    }
  }, [movieDate]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.topWrapper}>
        <LinearHeader imagePath={poster} action={handleGoBack} />
        <FlatList
          data={availableDate}
          keyExtractor={item => item.date}
          horizontal
          bounces={false}
          // contentContainerStyle={styles.containerGap24}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => {}}>
                <View style={[styles.dateContainer]}>
                  <Text style={styles.dateText}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default SelectSeatComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  topWrapper: {height: 471},
  containerGap24: {
    gap: SPACING.space_24,
  },
  dateContainer: {
    width: SPACING.space_10 * 7,
    height: SPACING.space_10 * 10,
    borderRadius: SPACING.space_10 * 10,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  dayText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
});
