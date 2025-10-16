import React, { useEffect, useState } from 'react';
import { Text, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MoviesCarrousel from '../components/MoviesCarrousel/MoviesCarrousel';
import { Movie } from '../services/domain/Movie';
import { TMDBRepository } from '../services/infrastructure/TMDBRepository';
import { GetPopularMovies } from '../services/application/GetPopularMovies';
import { GetGenres } from '../services/application/GetGenres';
import { Genre } from '../services/domain/Genre';
import Navbar from '../components/Navbar/Navbar';
import { BlackFridayCard } from '../components/BlackFridayCard/BlackFridayCard';
import MoviesList from '../components/organisms/moviesList/MoviesList';
import BottomNavigation from '../components/organisms/BottomNavigation/BottomNavigation';
import { GetFilteredMovies } from '../services/application/GetFileredMovies';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const movieRepository = new TMDBRepository();
const getPopularMovies = new GetPopularMovies(movieRepository);
const getGenres = new GetGenres(movieRepository);
const getFilteredMovies = new GetFilteredMovies(movieRepository);

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [activeGenreId, setActiveGenreId] = useState<number>(0);

  const isFiltered = activeGenreId !== 0;

  const fetchMovies = async () => {
    let data: Movie[] = [];

    if (isFiltered) {
      data = await getFilteredMovies.execute({
        with_genres: activeGenreId,
        sort_by: 'popularity.desc',
        page: 1,
      });
    } else {
      data = await getPopularMovies.execute(1);
    }

    setPopularMovies(data.slice(0, 5));
  };

  const fetchGenres = async () => {
    const data = await getGenres.execute();
    setGenres(data);
  };

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [activeGenreId]);

  function handleCheckDetails(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000' }}>
      <SafeAreaProvider>
        <ScrollView
          style={{ flex: 1, backgroundColor: '#000' }}
          contentContainerStyle={{ paddingBottom: 24 }}
          nestedScrollEnabled
        >
          <Navbar
            genres={[{ id: 0, name: 'All' }, ...genres]}
            activeId={activeGenreId}
            onSelect={setActiveGenreId}
          />

          <MoviesCarrousel popularMovies={popularMovies} />

          {isFiltered ? (
            <>
              <MoviesList
                listTitle="Universal Pictures"
                params={{
                  with_genres: activeGenreId,
                  with_companies: 33,
                  sort_by: 'popularity.desc',
                }}
              />
              <MoviesList
                listTitle="Warner Bros"
                params={{
                  with_genres: activeGenreId,
                  with_companies: 174,
                  sort_by: 'popularity.desc',
                }}
              />
              <MoviesList
                listTitle="Paramount Pictures"
                params={{
                  with_genres: activeGenreId,
                  with_companies: 4,
                  sort_by: 'popularity.desc',
                }}
              />
            </>
          ) : (
            <>
              <MoviesList
                listTitle="Marvel Studios"
                params={{ with_companies: 420 }}
              />
              <MoviesList
                listTitle="Best Movies"
                params={{ sort_by: 'vote_average.desc' }}
                isTopRated={true}
              />
              <BlackFridayCard onCheckDetails={handleCheckDetails} />
            </>
          )}
        </ScrollView>
        <BottomNavigation />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
