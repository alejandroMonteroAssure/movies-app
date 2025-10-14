import { useEffect, useState } from "react";
import { Movie } from "../services/domain/Movie";
import { TMDBRepository } from "../services/infrastructure/TMDBRepository";
import { GetMoviesByStudio } from "../services/application/GetMoviesByStudio";
import { curatedStudios } from "../services/domain/CuratedCompanies";

export const useMoviesByStudio = (company: string) => {
  const movieRepository = new TMDBRepository();
  const getMoviesByStudio = new GetMoviesByStudio(movieRepository);

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
      setMovies(data.slice(0, 10));
    } catch (err) {
      console.error("Error fetching movies by studio:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const idToSearch = getIdByName();
    fetchMoviesByStudio(idToSearch);
  }, [company]);

  return { movies, loading };
};
