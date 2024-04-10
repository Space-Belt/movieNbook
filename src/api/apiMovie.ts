import {API_KEY} from '@env';
import {apiClient} from './apiClient';

export interface IMovie {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const searchMovies = async (keyword: string): Promise<IMovie[]> => {
  const endPoint = `search/movie?api_key=${API_KEY}&query=${keyword}`;
  const response = (await apiClient.get(endPoint)).data.result;

  return response;
};

export const getNowPlayingMovies = async (): Promise<IMovie> => {
  const endPoint = `/movie/now_playing?api_key=${API_KEY}`;
  const response = (await apiClient.get(endPoint)).data;

  // console.log(response);
  return response;
};

export const getPopularMovies = async (): Promise<IMovie> => {
  const endPoint = `/movie/popular?api_key=${API_KEY}`;
  const response = (await apiClient.get(endPoint)).data.result;

  return response;
};

export const getUpcomingMovies = async (): Promise<IMovie> => {
  const endPoint = `/movie/upcoming?api_key=${API_KEY}`;
  const response = (await apiClient.get(endPoint)).data.result;

  return response;
};
