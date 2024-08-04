import AsyncStorage from '@react-native-async-storage/async-storage';
import {customApiClient} from './apiClient';

export const getMyInfo = async () => {
  const endPoint = 'user/me';
  const token = await AsyncStorage.getItem('accessToken');
  try {
    const response = await customApiClient.get(endPoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const changeInfo = async (image: FormData, name: string) => {
  const endPoint = 'user/me';
  const token = await AsyncStorage.getItem('accessToken');
  try {
    const response = await customApiClient.patch(
      endPoint,
      {
        file: image,
        user_name: name,
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
  }
};
