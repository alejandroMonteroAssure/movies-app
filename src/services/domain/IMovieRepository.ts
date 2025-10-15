import { Genre } from './Genre';
import { Movie } from './Movie';

export interface IMovieRepository {
  getPopularMovies(page: number): Promise<Movie[]>;
  getGenres(): Promise<Genre[]>;
  getMoviesByStudio(studioId: number, page: number): Promise<Movie[]>;
  getTopRatedMovies(page: number): Promise<Movie[]>;
  getFilteredMovies(options: {
    genreId?: number;
    companyId?: number;
    year?: number;
    sortBy?: string;
    page?: number;
    minVoteAverage?: number;
    maxVoteAverage?: number;
  }): Promise<Movie[]>;
}
