import {API_KEY} from '@env';
import {apiClient, customApiClient} from './apiClient';

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

export const genres: {[key: number]: string} = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentry',
  878: 'Science Fiction',
  9648: 'Mystry',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10770: 'TV Movie',
};

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

export const searchMovies = async (keyword: string) => {
  const endPoint = `movie?keyword=${keyword}`;

  try {
    const response = (await customApiClient.get(`${endPoint}`)).data.results;
    return response;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const getMovies = async (
  category: string,
  page: number,
): Promise<IMovie[]> => {
  // const endPoint = `/movie/${category}?api_key=${API_KEY}&page=${page}&language=ko-KR`;
  const endPoint = `/movie/${category}?api_key=${API_KEY}&page=${page}&language=ko-KR`;
  try {
    const response = (await customApiClient.get(endPoint)).data.results;
    return response;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const movieDetails = async (id: number) => {
  const endPoint = `/movie/${id}`;
  try {
    const response = (await customApiClient.get(endPoint)).data;
    return response;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const getMovie = async (category: string): Promise<IMovie[]> => {
  const endPoint = `/movie/${category}`;
  try {
    const response = (await customApiClient.get(endPoint)).data.results;
    return response;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const getMovieDate = async (movieId: number) => {
  const endPoint = `booking/showtimes?movieId=${movieId}`;
  try {
    const response = (await customApiClient.get(endPoint)).data;
    return response;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const getSeats = async (showtimeId: number) => {
  const endPoint = `booking/seats/${showtimeId}`;

  try {
    const response = (await customApiClient.get(endPoint)).data;

    return response;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
