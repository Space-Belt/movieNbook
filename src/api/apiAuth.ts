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
        console.log(res.status);
      });

    return response;
  } catch (error) {
    console.log(error);
    console.error('Error fetching movies:', error);
    return 500;
    throw error;
  }
};
