import {useQuery} from '@tanstack/react-query';
import moment from 'moment';
import React, {Dispatch, SetStateAction} from 'react';
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getMovieDate, getSeats} from '../../api/apiMovie';
import AvailableSeat from '../../assets/images/availableSeat.svg';
import SelectedSeatIcon from '../../assets/images/selectedSeat.svg';
import TakenSeat from '../../assets/images/takenSeat.svg';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import CustomIcon from '../icons/CustomIcon';
import LinearHeader from './LinearHeader';
import BasicWrapper from '../BasicWrapper';

type Props = {
  poster: string;
  handleGoBack: () => void;
  movieId: number;
  setPage: Dispatch<SetStateAction<number>>;
  seatId: number[];
  setSeatId: Dispatch<SetStateAction<number[]>>;
  setShowTimeId: Dispatch<SetStateAction<number | undefined>>;
  totalPrice: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
};

const SelectSeatComponent = ({
  poster,
  handleGoBack,
  movieId,
  setPage,
  seatId,
  setSeatId,
  setShowTimeId,
  totalPrice,
  setTotalPrice,
}: Props) => {
  const [availableDate, setAvailableDate] = React.useState<
    {
      date: string;
      dayOfWeek: string;
    }[]
  >([]);
  const [selectedDateIndex, setSelectedDateIndex] = React.useState<number>();

  const [selectedTimeIndex, setSelectedTimeIndex] = React.useState<number>();

  const {data: movieDate, refetch: dateRefetch} = useQuery({
    queryKey: ['movieDate'],
    queryFn: () => getMovieDate(movieId),
  });
  const {data: movieSeats, refetch: seatRefetch} = useQuery({
    queryKey: ['movieSeats'],
    queryFn: () => {
      if (selectedDateIndex !== undefined && selectedTimeIndex !== undefined) {
        return getSeats(
          movieDate.result[availableDate[selectedDateIndex].date][
            selectedTimeIndex
          ].id,
        );
      }
      return getSeats(0);
    },
  });

  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.timeWrapper,
          item.index === selectedTimeIndex && {backgroundColor: COLORS.Orange},
        ]}
        onPress={() => {
          setSelectedTimeIndex(item.index);
          setSeatId([]);
        }}>
        <Text style={{color: COLORS.White}}>
          {item.item.start_time.slice(0, 5)}
        </Text>
      </TouchableOpacity>
    );
  };

  const isSeatSelected = (id: number) => {
    if (seatId !== undefined) {
      return seatId?.some(seat => seat === id);
    }
  };

  React.useEffect(() => {
    if (selectedTimeIndex !== undefined) {
      seatRefetch();
      if (selectedDateIndex !== undefined) {
        setShowTimeId(
          movieDate.result[availableDate[selectedDateIndex].date][
            selectedTimeIndex
          ].id,
        );
      }
    }
  }, [selectedTimeIndex]);

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

  React.useEffect(() => {
    if (seatId.length > 0) {
      let price = seatId.length * movieDate?.price;
      setTotalPrice(price);
    }
  }, [seatId]);

  const handleSelectSeat = (id: number) => {
    let temp = [...seatId];
    if (seatId.length === 0) {
      temp.push(id);
    } else if (seatId.length > 0 && seatId?.some(seat => seat === id)) {
      temp = temp.filter(el => el !== id);
    } else if (seatId.length > 0 && !seatId?.some(seat => seat === id)) {
      temp.push(id);
    }
    setSeatId(temp);
  };

  return (
    <BasicWrapper>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <LinearHeader imagePath={poster} action={handleGoBack} />

        <View style={styles.movieSeatWrapper}>
          <View>
            {movieSeats !== undefined &&
              movieSeats.length > 0 &&
              movieSeats.map(el => {
                return (
                  <View style={styles.movieSeatStyle} key={JSON.stringify(el)}>
                    {el.map(secondEl => {
                      if (!el.is_reserved) {
                        return (
                          <TouchableOpacity
                            key={JSON.stringify(secondEl)}
                            onPress={() => {
                              handleSelectSeat(secondEl.id);
                            }}>
                            {isSeatSelected(secondEl.id) ? (
                              <SelectedSeatIcon />
                            ) : (
                              <AvailableSeat />
                            )}
                          </TouchableOpacity>
                        );
                      } else {
                        return <TakenSeat />;
                      }
                    })}
                  </View>
                );
              })}
          </View>
        </View>

        <View style={styles.seatInfoContainer}>
          <View style={styles.seatInfoWrapper}>
            <CustomIcon name="radio" style={styles.seatInfoIcon} />
            <Text style={styles.seatInfoText}>Available</Text>
          </View>
          <View style={styles.seatInfoWrapper}>
            <CustomIcon
              name="radio"
              style={[styles.seatInfoIcon, {color: COLORS.Grey}]}
            />
            <Text style={styles.seatInfoText}>Taken</Text>
          </View>
          <View style={styles.seatInfoWrapper}>
            <CustomIcon
              name="radio"
              style={[styles.seatInfoIcon, {color: COLORS.Orange}]}
            />
            <Text style={styles.seatInfoText}>Selected</Text>
          </View>
        </View>

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
                  setSelectedTimeIndex(undefined);
                  setSeatId([]);
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
        <View style={styles.dateWrapper}>
          {selectedDateIndex !== undefined &&
          movieDate.result[availableDate[selectedDateIndex].date].length > 0 ? (
            <FlatList
              data={movieDate.result[availableDate[selectedDateIndex].date]}
              renderItem={item => renderItem(item)}
              horizontal
              contentContainerStyle={styles.timeContainer}
            />
          ) : (
            <View style={styles.noTicketBox}>
              <Text style={styles.emptyText}>
                Sorry, no tickets available at this date
              </Text>
            </View>
          )}
        </View>
        <View style={styles.buttonPriceContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.totalPriceText}>Total Price</Text>
            <Text style={styles.price}>{totalPrice} $</Text>
          </View>
          <TouchableOpacity
            style={styles.buttonWrapper}
            // disabled={seatId.length === 0}
            onPress={() => {
              setPage(prev => prev + 1);
            }}>
            <Text style={styles.buttonText}>
              {seatId.length > 0 ? 'Buy Tickets' : 'Choose seats'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BasicWrapper>
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
  movieSeatWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieSeatStyle: {
    flexDirection: 'row',
    width: 288,
    justifyContent: 'space-between',
    marginBottom: 15,
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
    height: Platform.OS === 'ios' ? 46 : 'auto',
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
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },
  seatInfoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: SPACING.space_36,
    marginBottom: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  seatInfoWrapper: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  seatInfoIcon: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  seatInfoText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.White,
  },
  timeWrapper: {
    height: 37,
    width: 78,
    borderWidth: 1,
    borderColor: '#FFFFFF80',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeContainer: {
    gap: 10,
  },
  noTicketBox: {
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateWrapper: {
    marginVertical: 15,
  },
  emptyText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_12,
    textAlign: 'center',
  },
});
