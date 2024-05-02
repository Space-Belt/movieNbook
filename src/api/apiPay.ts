import AsyncStorage from '@react-native-async-storage/async-storage';
import {customApiClient} from './apiClient';

export const getPayMethod = async () => {
  const endPoint = 'payment/methods';
  const token = await AsyncStorage.getItem('accessToken');

  try {
    const payWay = (
      await customApiClient.get(endPoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
    return payWay;
  } catch (error) {
    console.log(error);
  }
};

export const getPayHistory = async () => {
  const endPoint = 'user/me/orders';
  const token = await AsyncStorage.getItem('accessToken');
  try {
    const payWay = await customApiClient.get(endPoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('dfdsfsd');
    console.log(payWay);
    return payWay;
  } catch (error) {
    console.log(error);
  }
};

export const payMovie = async (
  movie_id: number,
  showtime_id: number,
  seatIds: number[],
  payment_method: 'WALLET' | 'CREDIT_CARD',
) => {
  const endPoint = 'payment/order';
  try {
    const response = await customApiClient.post(endPoint, {
      movie_id,
      showtime_id,
      seatIds,
      payment_method,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
