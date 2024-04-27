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
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import {getMovieDate, getSeats} from '../../api/apiMovie';
import {useQuery} from '@tanstack/react-query';
import moment from 'moment';

type Props = {
  poster: string;
  handleGoBack: () => void;
  movieId: number;
};

const SelectSeatComponent = ({poster, handleGoBack, movieId}: Props) => {
  const [availableDate, setAvailableDate] = React.useState<
    {
      date: string;
      dayOfWeek: string;
    }[]
  >([]);
  const [selectedDateIndex, setSelectedDateIndex] = React.useState<number>();

  const {data: movieDate, refetch: dateRefetch} = useQuery({
    queryKey: ['movieDate'],
    queryFn: () => getMovieDate(movieId),
  });
  const {data: movieSeats, refetch: seatRefetch} = useQuery({
    queryKey: ['movieSeats'],
    queryFn: () => getSeats(movieId),
  });

  React.useEffect(() => {
    if (movieDate !== undefined) {
      let result = [];
      for (const date in movieDate?.result) {
        const tempDate = moment(date);
        result.push({
          date: tempDate.format('YYYY-MM-DD'),
          dayOfWeek: tempDate.format('dddd'),
        });
      }
      setAvailableDate(result);
    }
  }, [movieDate]);
  console.log(movieSeats);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.topWrapper}>
        <LinearHeader imagePath={poster} action={handleGoBack} />
        <FlatList
          data={availableDate}
          keyExtractor={item => item.date}
          horizontal
          bounces={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedDateIndex(index);
                }}>
                <View
                  style={[
                    styles.dateContainer,
                    index === selectedDateIndex && {
                      backgroundColor: COLORS.Orange,
                    },
                  ]}>
                  <Text style={styles.dateText}>{item.date.split('-')[2]}</Text>
                  <Text style={styles.dayText}>
                    {item.dayOfWeek.slice(0, 3)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <View style={styles.buttonPriceContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.totalPriceText}>Total Price</Text>
            <Text style={styles.price}>$ {movieDate.price}.00</Text>
          </View>
          <TouchableOpacity style={styles.buttonWrapper} onPress={() => {}}>
            <Text style={styles.buttonText}>Buy Tickets</Text>
          </TouchableOpacity>
        </View>
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
  buttonPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 46,
    paddingHorizontal: SPACING.space_24,
    // paddingBottom: SPACING.space_24,
  },
  priceContainer: {
    alignItems: 'center',
  },
  totalPriceText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
  },
  price: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  buttonWrapper: {
    borderRadius: BORDERRADIUS.radius_25,
    width: 219,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.Orange,
  },
  buttonText: {
    // paddingHorizontal: SPACING.space_24,
    // paddingVertical: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },
});
