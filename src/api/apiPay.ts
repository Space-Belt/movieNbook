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

    return payWay;
  } catch (error) {
    console.log(error);
  }
};
