import { IMovieRepository } from '../domain/IMovieRepository';
import { Movie } from '../domain/Movie';

export class GetMoviesByQuery {
  constructor(private movieRepository: IMovieRepository) {}

  async execute(query: string): Promise<Movie[]> {
    return this.movieRepository.getMoviesByQuery(query);
  }
}
