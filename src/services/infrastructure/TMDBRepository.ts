import { AxiosError } from 'axios';
import { IMovieRepository } from '../domain/IMovieRepository';
import { Movie } from '../domain/Movie';
import { mapToDomain } from './Mappers';
import { Genre } from '../domain/Genre';
import { httpClient, handleAxiosError } from './httpClient';
import { Options } from '../domain/Options';

export class TMDBRepository implements IMovieRepository {
  async getPopularMovies(page: number): Promise<Movie[]> {
    try {
      const response = await httpClient.get('/movie/popular', {
        params: { language: 'es-ES', page },
      });
      return response.data.results.map(mapToDomain);
    } catch (error) {
      handleAxiosError(error);
      return [];
    }
  }

  async getGenres(): Promise<Genre[]> {
    try {
      const response = await httpClient.get('/genre/movie/list', {
        params: { language: 'es-ES' },
      });
      return response.data.genres;
    } catch (error) {
      handleAxiosError(error);
      return [];
    }
  }

  async getMoviesByStudio(studioId: number, page: number): Promise<Movie[]> {
    try {
      const response = await httpClient.get(`/company/${studioId}/movies`, {
        params: { page },
      });

      return response.data.results.map(mapToDomain);
    } catch (error) {
      handleAxiosError(error);
      return [];
    }
  }

  async getTopRatedMovies(page: number): Promise<Movie[]> {
    try {
      const response = await httpClient.get('/movie/top_rated', {
        params: { language: 'es-ES', page },
      });
      return response.data.results.map(mapToDomain);
    } catch (error) {
      handleAxiosError(error);
      return [];
    }
  }
  async getMoviesByQuery(query: string): Promise<Movie[]> {
    try {
      const response = await httpClient.get('/search/movie', {
        params: { language: 'es-ES', query },
      });
      return response.data.results.map(mapToDomain);
    } catch (error) {
      handleAxiosError(error);
      return [];
    }
  }

  async getFilteredMovies(params: Options): Promise<Movie[]> {
    try {
      const response = await httpClient.get('/discover/movie', {
        params: {
          language: 'es-ES',
          include_adult: false,
          include_video: false,
          sort_by: 'popularity.desc',
          ...params,
        },
      });

      return response.data.results.map(mapToDomain);
    } catch (error) {
      handleAxiosError(error);
      return [];
    }
  }
}
