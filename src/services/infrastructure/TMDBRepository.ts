import axios, { AxiosError } from "axios";
import { IMovieRepository } from "../domain/IMovieRepository";
import { Movie } from "../domain/Movie";
import { TMDB_ACCESS_TOKEN, TMDB_API_KEY, TMDB_BASE_URL } from '@env';
import { mapToDomain } from "./Mappers";
import { Genre } from "../domain/Genre";


export class TMDBRepository implements IMovieRepository {
    async getPopularMovies(page: number): Promise<Movie[]> {
        try {
            const response = await axios.get(`${TMDB_BASE_URL}/3/movie/popular`, {
                headers: {
                    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                params: {
                    language: 'es-ES',
                    page: page,
                }
            });
            return response.data.results.map(mapToDomain);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                console.error('TMDB API error:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            return [];
        }
    }

    async getGenres(): Promise<Genre[]> {
        try {
            const response = await axios.get(
                `${TMDB_BASE_URL}/3/genre/movie/list`,
                {
                    headers: {
                    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                    },
                params: { language: 'en-US' },
                }
            );
            return response.data.genres;
        }
        catch (error) {
            if (error instanceof AxiosError) {
                console.error('TMDB API error genre:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            return [];
        }
    }

    async getMoviesByStudio(studioId: number, page: number): Promise<Movie[]> {
        try{
            const response = await axios.get(`${TMDB_BASE_URL}/3/company/${studioId}/movies`, 
                {params: { api_key: TMDB_API_KEY, page: page }}
            );

            return response.data.results.map(mapToDomain);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                console.error('TMDB API error:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            return [];
        }
    }
}