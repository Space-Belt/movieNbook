import AsyncStorage from '@react-native-async-storage/async-storage';
import {authApiClient} from './apiClient';

export const signUp = async (
  userName: string,
  email: string,
  password: string,
) => {
  const endPoint = 'auth/signup';
  try {
    const response = await authApiClient
      .post(endPoint, {
        username: userName,
        email: email,
        password: password,
      })
      .then(res => {
        console.log(res.data);
      });

    return response;
  } catch (error) {
    console.log(error);
    console.error('Error fetching movies:', error);
    return 500;
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  const endPoint = 'auth/login';
  try {
    const response = await authApiClient.post(endPoint, {
      email: email,
      password: password,
    });

    await AsyncStorage.setItem('accessToken', response.data.accessToken);

    return response.status;
  } catch (error) {
    console.log(error);
    console.error('Error fetching movies:', error);

    throw error;
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('accessToken');
};
