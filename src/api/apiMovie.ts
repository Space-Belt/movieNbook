import {API_KEY} from '@env';
import {apiClient} from './apiClient';

export const searchMovies = async (keyword: string): any => {
  const endPoint = `search/movie?api_key=${API_KEY}&query=${keyword}`;
  const response = await apiClient.get(endPoint);
  console.log(response.data);

  return response;
};
