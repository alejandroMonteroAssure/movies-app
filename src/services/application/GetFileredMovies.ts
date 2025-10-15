import { IMovieRepository } from '../domain/IMovieRepository';
import { Movie } from '../domain/Movie';
import { Options } from '../domain/Options';

export class GetFilteredMovies {
  constructor(private movieRepository: IMovieRepository) {}

  async execute(params: Options): Promise<Movie[]> {
    return this.movieRepository.getFilteredMovies(params);
  }
}
