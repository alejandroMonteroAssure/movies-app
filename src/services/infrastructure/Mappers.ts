import { curatedStudios } from "../domain/CuratedCompanies";
import { Movie } from "../domain/Movie";
import { Studio } from "../domain/Studio";
import { StudioDto } from "./StudioDto";
import { TMDBMovieDto } from "./TMDBMovieDto";

export function mapToDomain(movieDto: TMDBMovieDto): Movie{
    return {
        adult: movieDto.adult,
        backdropPath: movieDto.backdrop_path,
        id: movieDto.id,
        originalLanguage: movieDto.original_language,
        originalTitle: movieDto.original_title,
        overview: movieDto.overview,
        popularity: movieDto.popularity,
        posterPath: movieDto.poster_path,
        releaseDate: movieDto.release_date,
        voteAverage: movieDto.vote_average,
        voteCount: movieDto.vote_count
    }
}

export function mapStudioToDomain(studioDto: StudioDto): Studio{
    const found = curatedStudios.find((studio) => studio.id === studioDto.id);
    return {
        id: studioDto.id,
        name: studioDto.name,
        logoPath: studioDto.logo_path,
        color: found?.color ?? ""
    }
}