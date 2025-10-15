import { AxiosError } from 'axios';
import { IMovieRepository } from '../domain/IMovieRepository';
import { Movie } from '../domain/Movie';
import { mapToDomain } from './Mappers';
import { Genre } from '../domain/Genre';
import { httpClient, handleAxiosError } from './httpClient';

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

  async getFilteredMovies(options: {
    genreId?: number;
    companyId?: number;
    year?: number;
    sortBy?: string;
    page?: number;
    minVoteAverage?: number;
    maxVoteAverage?: number;
  }): Promise<Movie[]> {
    const {
      genreId,
      companyId,
      year,
      sortBy = 'popularity.desc',
      page = 1,
      minVoteAverage,
      maxVoteAverage,
    } = options;

    try {
      const params: Record<string, any> = {
        language: 'es-ES',
        sort_by: sortBy,
        page,
        include_adult: false,
      };

      if (genreId) params.with_genres = genreId;
      if (companyId) params.with_companies = companyId;
      if (year) params.year = year;
      if (minVoteAverage) params['vote_average.gte'] = minVoteAverage;
      if (maxVoteAverage) params['vote_average.lte'] = maxVoteAverage;

      const response = await httpClient.get('/discover/movie', { params });
      return response.data.results.map(mapToDomain);
    } catch (error) {
      handleAxiosError(error);
      return [];
    }
  }
}
