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

export const queryKey = [
  'id',
  'adult',
  'backdrop_path',
  'genre_ids',
  'original_language',
  'original_title',
  'overview',
  'popularity',
  'poster_path',
  'release_date',
  'title',
  'video',
  'vote_average',
  'vote_count',
];

export const searchMovies = async (keyword: string): Promise<IMovie[]> => {
  const endPoint = `search/movie?api_key=${API_KEY}&query=${keyword}`;
  const response = (await apiClient.get(endPoint)).data.result;

  return response;
};

export const getMovies = async (category: string): Promise<IMovie[]> => {
  const endPoint = `/movie/${category}?api_key=${API_KEY}`;

  try {
    const response = (await apiClient.get(endPoint)).data.results;
    return response;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error; // Rethrow the error to handle it at a higher level if needed
  }
};

export const getNowPlayingMovies = async (): Promise<IMovie[]> => {
  const endPoint = `/movie/now_playing?api_key=${API_KEY}`;
  const response = (await apiClient.get(endPoint)).data;

  console.log(response);
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
