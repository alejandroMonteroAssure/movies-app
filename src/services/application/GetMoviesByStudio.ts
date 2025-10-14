import { IMovieRepository } from "../domain/IMovieRepository";
import { Movie } from "../domain/Movie";

export class GetMoviesByStudio{
    constructor(private movieRepository: IMovieRepository) {}

    async execute(studioId: number, page: number): Promise<Movie[]> {
        return this.movieRepository.getMoviesByStudio(studioId, page);
    }
}