import { Genre } from './Genre';
import { Movie } from './Movie';
import { Options } from './Options';
import { Video } from './Video';

export interface IMovieRepository {
  getPopularMovies(page: number): Promise<Movie[]>;
  getGenres(): Promise<Genre[]>;
  getMoviesByStudio(studioId: number, page: number): Promise<Movie[]>;
  getTopRatedMovies(page: number): Promise<Movie[]>;
  getMoviesByQuery(query: string): Promise<Movie[]>;
  getFilteredMovies(params: Options): Promise<Movie[]>;
  getMovieVideos(movieId: number): Promise<Video[]>;
}
