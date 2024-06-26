import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const customApiClient = axios.create({
  baseURL: 'https://j10fjln2vc.execute-api.ap-northeast-2.amazonaws.com/dev/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const tempApiClient = axios.create({
  baseURL: 'https://j10fjln2vc.execute-api.ap-northeast-2.amazonaws.com/dev/',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
