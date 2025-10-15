import { IMovieRepository } from '../domain/IMovieRepository';
import { Movie } from '../domain/Movie';

export class GetFilteredMovies {
  constructor(private movieRepository: IMovieRepository) {}

  async execute(
    genreId?: number,
    companyId?: number,
    year?: number,
    sortBy?: string,
    page?: number,
    minVoteAverage?: number,
    maxVoteAverage?: number,
  ): Promise<Movie[]> {
    return this.movieRepository.getFilteredMovies({
      genreId,
      companyId,
      year,
      sortBy,
      page,
      minVoteAverage,
      maxVoteAverage,
    });
  }
}
