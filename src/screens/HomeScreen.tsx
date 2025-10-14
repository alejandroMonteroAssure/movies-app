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
import { BlackFridayCard } from '../components/BlackFridayCard/BlackFridayCard';
import MoviesList from '../components/organisms/moviesList/MoviesList';
import { useMoviesByStudio } from '../hooks/useMoviesByStudio';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const movieRepository = new TMDBRepository();
const getPopularMovies = new GetPopularMovies(movieRepository);

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const { movies, loading } = useMoviesByStudio('Marvel');

  const fetchMovies = async () => {
    const data = await getPopularMovies.execute(1);
    setPopularMovies(data.slice(0, 5));
  };

  useEffect(() => {
    fetchMovies();
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
          <MoviesCarrousel popularMovies={popularMovies} />

          <BlackFridayCard onCheckDetails={handleCheckDetails} />

          <MoviesList data={movies} listTitle='Marvel Studios'/>
        </ScrollView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
