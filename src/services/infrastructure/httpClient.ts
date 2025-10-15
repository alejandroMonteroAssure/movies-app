import axios, { AxiosError } from 'axios';
import { TMDB_ACCESS_TOKEN, TMDB_BASE_URL } from '@env';

export const httpClient = axios.create({
  baseURL: `${TMDB_BASE_URL}/3`,
  headers: {
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export function handleAxiosError(error: unknown) {
  if (error instanceof AxiosError) {
    console.error('TMDB API error:', error.response?.data || error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
