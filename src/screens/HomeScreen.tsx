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
import { useMoviesByStudio } from '../hooks/useMoviesByStudio';
import BottomNavigation from '../components/organisms/BottomNavigation/BottomNavigation';
import { GetTopRatedMovies } from '../services/application/GetTopRatedMovies';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const movieRepository = new TMDBRepository();
const getPopularMovies = new GetPopularMovies(movieRepository);
const getGenres = new GetGenres(movieRepository);
const getTopRatedMovies = new GetTopRatedMovies(movieRepository);

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const [activeGenreId, setActiveGenreId] = useState<number>(0);
  const { movies, loading } = useMoviesByStudio('Marvel');

  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);

  const fetchMovies = async () => {
    const data = await getPopularMovies.execute(1);
    setPopularMovies(data.slice(0, 5));
  };

  const fetchGenres = async () => {
    const data = await getGenres.execute();
    setGenres(data);
  };

  const fetchTopMovies = async () => {
    const data = await getTopRatedMovies.execute(1);
    setTopRatedMovies(data.slice(0, 10));
  };

  useEffect(() => {
    fetchMovies();
    fetchGenres();
    fetchTopMovies();
  }, []);

  function handleCheckDetails(): void {
    throw new Error('Function not implemented.');
  }

  if (loading) return <Text>Cargando...</Text>;

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

          <MoviesList data={movies} listTitle="Marvel Studios" />
          <MoviesList data={topRatedMovies} listTitle="Best movies" />

          <BlackFridayCard onCheckDetails={handleCheckDetails} />
        </ScrollView>
        <BottomNavigation />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
