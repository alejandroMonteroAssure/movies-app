import { useEffect, useState } from "react";
import { Movie } from "../services/domain/Movie";
import { TMDBRepository } from "../services/infrastructure/TMDBRepository";
import { GetMoviesByStudio } from "../services/application/GetMoviesByStudio";
import { curatedStudios } from "../services/domain/CuratedCompanies";
import { GetPopularMovies } from "../services/application/GetPopularMovies";

export const useMoviesByStudio = (company: string, isLimited: boolean) => {
  const movieRepository = new TMDBRepository();
  const getMoviesByStudio = new GetMoviesByStudio(movieRepository);
    const getPopularMovies = new GetPopularMovies(movieRepository);


  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const getIdByName = () => {
    const target = company.trim().toLowerCase();
    for (const studio of curatedStudios) {
      if (studio.name.toLowerCase().includes(target)) return studio.id;
    }
    return 0;
  };

  const fetchMoviesByStudio = async (studioId: number) => {
    try {
      const data = await getMoviesByStudio.execute(studioId, 1);
      console.log('moviesbystudio', data)
      setMovies(isLimited? data.slice(0, 10): data);
    } catch (err) {
      console.error("Error fetching movies by studio:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularMovies = async () => {
    try {
      const data = await getPopularMovies.execute(1);
      setMovies(data);
    } catch (err) {
      console.error("Error fetching popular movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const idToSearch = getIdByName();
    if(idToSearch === 0) fetchPopularMovies();
    else fetchMoviesByStudio(idToSearch);
  }, [company]);

  return { movies, loading };
};
