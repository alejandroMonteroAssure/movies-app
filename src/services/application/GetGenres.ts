import { Genre } from "../domain/Genre";
import { IMovieRepository } from "../domain/IMovieRepository";

export class GetGenres{
    constructor(private movieRepository: IMovieRepository) {}

    async execute(): Promise<Genre[]> {
        return this.movieRepository.getGenres();
    }
}