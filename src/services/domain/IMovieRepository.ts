import { Genre } from "./Genre";
import { Movie } from "./Movie";

export interface IMovieRepository {
    getPopularMovies(page: number): Promise<Movie[]>;
    getGenres(): Promise<Genre[]>;
    getMoviesByStudio(studioId: number, page: number): Promise<Movie[]>;
}