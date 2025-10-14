import { IMovieRepository } from "../domain/IMovieRepository";
import { Movie } from "../domain/Movie";

export class GetPopularMovies{
    constructor(private movieRepository: IMovieRepository) {}

    async execute(page: number): Promise<Movie[]> {
        return this.movieRepository.getPopularMovies(page);
    }
}