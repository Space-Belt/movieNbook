import {useMutation, useQuery} from '@tanstack/react-query';
import React, {Dispatch, SetStateAction} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getPayMethod} from '../../api/apiPay';
import CardChip from '../../assets/images/cardChip.svg';
import Visa from '../../assets/images/visa.svg';
import Wallet from '../../assets/images/wallet.svg';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import ProfileHeader from '../Profile/ProfileHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {customApiClient} from '../../api/apiClient';

type Props = {
  handleGoBack: () => void;
  setPage: Dispatch<SetStateAction<number>>;
  paymentWay: 'WALLET' | 'CREDIT_CARD' | undefined;
  setPaymentWay: Dispatch<SetStateAction<'WALLET' | 'CREDIT_CARD' | undefined>>;
  handleMakeOrder: () => Promise<any>;
  seatId: number[];
  showTimeId: number | undefined;
  movieId: number;
  totalPrice?: number;
};

const PayComponent = ({
  handleGoBack,
  setPage,
  paymentWay,
  setPaymentWay,
  handleMakeOrder,
  seatId,
  showTimeId,
  movieId,
  totalPrice,
}: Props) => {
  const {data} = useQuery({
    queryKey: ['payWay'],
    queryFn: () => getPayMethod(),
    staleTime: 60 * 60 * 1000,
  });

  const payMovie = async () => {
    const endPoint = 'payment/order';
    const token = await AsyncStorage.getItem('accessToken');
    try {
      const response = await customApiClient.post(
        endPoint,
        {
          movie_id: movieId,
          showtime_id: showTimeId,
          seatIds: seatId,
          payment_method: paymentWay,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const {mutate} = useMutation({
    mutationFn: payMovie,
    onSuccess: data => {
      console.log(data);
      setPage(prev => prev + 1);
    },
    onError(error) {
      console.log(error);
    },
  });

  const [selectedCard, setSelectedCard] = React.useState<number>();

  const [btnText, setBtnText] = React.useState<string>(
    'Choose your payment way',
  );

  const selectedCardStyle: StyleProp<ViewStyle> = {
    borderWidth: 2,
    borderColor: 'red',
  };

  const regesBtnColor: StyleProp<ViewStyle> = {
    backgroundColor: COLORS.Orange,
  };

  React.useEffect(() => {
    if (paymentWay !== undefined) {
      if (paymentWay === 'CREDIT_CARD') {
        setBtnText('Pay from Credit Card');
      } else if (paymentWay === 'WALLET') {
        if (totalPrice !== undefined && data?.wallet?.balance < totalPrice) {
          setBtnText('Insufficient Balance');
        } else if (
          totalPrice !== undefined &&
          data?.wallet?.balance > totalPrice
        ) {
          setBtnText('Pay from Wallet');
        }
      }
    }
  }, [paymentWay]);

  // React.useEffect(() => {
  //   console.log(error);
  // }, [error]);
  return (
    <View style={styles.container}>
      <View>
        <ProfileHeader
          closeBtnVisible={true}
          title=""
          handleGoBack={handleGoBack}
        />
        {data?.cards.map((el: any) => (
          <View
            key={JSON.stringify(el)}
            style={[
              styles.cardWrapper,
              selectedCard === el.id && selectedCardStyle,
            ]}>
            <Text style={styles.selectCardText}>Select Card</Text>
            <LinearGradient
              colors={['#262B33', '#0C0F14']}
              start={{x: 0, y: 90}}
              end={{x: 1, y: 90}}
              style={styles.linearGradient}>
              <TouchableOpacity
                style={styles.cardStyle}
                onPress={() => {
                  setSelectedCard(el.id);
                  setPaymentWay('CREDIT_CARD');
                }}>
                <View style={styles.cardTopIconWrapper}>
                  <CardChip />
                  <Visa />
                </View>
                <View style={styles.cardNumberTextWrapper}>
                  <Text style={styles.cardNumberText}>
                    {el.card_number.toString().slice(0, 4)}
                  </Text>
                  <Text style={styles.cardNumberText}>
                    {el.card_number.toString().slice(4, 8)}
                  </Text>
                  <Text style={styles.cardNumberText}>
                    {el.card_number.toString().slice(8, 12)}
                  </Text>
                  <Text style={styles.cardNumberText}>
                    {el.card_number.toString().slice(12, 16)}
                  </Text>
                </View>
                <View style={styles.cardBottomWrapper}>
                  <View style={styles.ownerWrapper}>
                    <Text style={styles.ownerTitle}>Card Holder Name</Text>
                    <Text style={styles.ownerName}>{el.holder_name}</Text>
                  </View>
                  <View style={styles.expireWrapper}>
                    <Text style={styles.expireTitle}>Expiry Date</Text>
                    <Text style={styles.expireText}>
                      {el.expiry_date.slice(2, 4)}/{el.expiry_date.slice(5, 7)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ))}

        <TouchableOpacity
          onPress={() => {
            setSelectedCard(1);
            setPaymentWay('WALLET');
          }}>
          <LinearGradient
            colors={['#262B33', '#0C0F14']}
            start={{x: 0, y: 25}}
            end={{x: 1, y: 25}}
            style={[
              styles.walletWrapper,
              selectedCard === 1 && selectedCardStyle,
            ]}>
            <View style={styles.walletLeftSide}>
              <Wallet />
              <Text style={styles.leftSideText}>Wallet</Text>
            </View>
            <Text style={styles.rightSideText}>$ {data?.wallet?.balance}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.priceWrapper}>
          <View>
            <Text style={styles.totalPriceTitle}>Total Price</Text>
            <View style={styles.priceTextWrapper}>
              <Text style={styles.dollorSign}>$</Text>
              <Text style={styles.moneyText}>
                {totalPrice ? totalPrice : 0}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            mutate();
          }}
          style={[styles.btnStyle, regesBtnColor]}>
          <Text style={styles.buttonText}>{btnText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PayComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
    justifyContent: 'space-between',
  },
  linearGradient: {
    padding: 10,
    marginTop: 10,
    width: '100%',
    height: 186,
    borderRadius: 15,
    // justifyContent: 'space-between',
  },
  cardWrapper: {
    borderWidth: 2,
    borderRadius: 25,
    height: 241,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#262B33',
  },
  selectCardText: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    fontWeight: '600',
  },
  cardStyle: {
    height: '100%',
    justifyContent: 'space-between',
  },
  cardTopIconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNumberTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardNumberText: {
    letterSpacing: 4,
    color: COLORS.White,
    fontSize: FONTSIZE.size_14,
    fontWeight: '600',
    marginRight: 10,
  },
  cardBottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ownerWrapper: {},
  expireWrapper: {},
  ownerTitle: {
    fontSize: FONTSIZE.size_10,
    textAlign: 'left',
    color: '#8E9295',
  },
  ownerName: {
    fontSize: FONTSIZE.size_16,
    textAlign: 'left',
    color: COLORS.White,
    fontWeight: '600',
  },
  expireTitle: {
    fontSize: FONTSIZE.size_10,
    textAlign: 'right',
    color: '#8E9295',
  },
  expireText: {
    fontSize: FONTSIZE.size_16,
    textAlign: 'right',
    color: COLORS.White,
    fontWeight: '600',
  },
  walletWrapper: {
    marginTop: 25,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  walletLeftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSideText: {
    marginLeft: 15,
    fontSize: FONTSIZE.size_14,
    fontWeight: '600',
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  rightSideText: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
  },
  priceWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  totalPriceTitle: {
    fontSize: FONTSIZE.size_14,
    color: '#737373',
  },
  priceTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dollorSign: {
    color: COLORS.Orange,
    fontWeight: '500',
    fontSize: FONTSIZE.size_24,
    marginRight: 5,
  },
  moneyText: {
    fontWeight: '500',
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  btnStyle: {
    backgroundColor: COLORS.Grey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    marginTop: 20,
    borderRadius: BORDERRADIUS.radius_20,
  },
  buttonText: {
    color: COLORS.White,
    fontWeight: '600',
  },
});
