import AsyncStorage from '@react-native-async-storage/async-storage';
import {customApiClient} from './apiClient';

export const signUp = async (
  userName: string,
  email: string,
  password: string,
) => {
  const endPoint = 'auth/signup';
  try {
    const response = await customApiClient
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
    console.error('SignUp:', error);

    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  const endPoint = 'auth/login';

  const currentTime = new Date().getTime();

  const twoDaysLater = currentTime + 2 * 24 * 60 * 60 * 1000;

  try {
    const response = await customApiClient.post(endPoint, {
      email: email,
      password: password,
    });
    await AsyncStorage.setItem('accessToken', response.data.accessToken);
    await AsyncStorage.setItem('tokenExpired', twoDaysLater.toString());
    return response.status;
  } catch (error) {
    console.error('Sign In:', error);

    throw error;
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('accessToken');
};
