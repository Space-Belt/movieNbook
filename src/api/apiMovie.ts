import {API_KEY} from '@env';
import {apiClient} from './apiClient';

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

export const searchMovies = async (keyword: string): Promise<IMovie[]> => {
  const endPoint = `search/movie?api_key=${API_KEY}&query=${keyword}`;
  const response: any = [];
  const totalPage = (await apiClient.get(endPoint)).data.total_pages;
  for (let i = 1; i <= totalPage; i++) {
    const temp = (await apiClient.get(`${endPoint}&page=${i}&language=ko-KR`))
      .data.results;
    response.push(...temp);
  }
  return response;
};

export const getMovies = async (
  category: string,
  page: number,
): Promise<IMovie[]> => {
  const endPoint = `/movie/${category}?api_key=${API_KEY}&page=${page}&language=ko-KR`;
  try {
    const response = (await apiClient.get(endPoint)).data.results;
    return response;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const movieDetails = async (id: number) => {
  const endPoint = `/movie/${id}?api_key=${API_KEY}&language=ko-KR`;
  try {
    const response = (await apiClient.get(endPoint)).data;
    return response;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const getCastings = async (id: number) => {
  const endPoint = `/movie/${id}/credits?api_key=${API_KEY}&language=ko-KR`;
  try {
    const response = (await apiClient.get(endPoint)).data;
    return response;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
