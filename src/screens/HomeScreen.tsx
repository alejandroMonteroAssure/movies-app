import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
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

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const movieRepository = new TMDBRepository();
const getPopularMovies = new GetPopularMovies(movieRepository);
const getGenres = new GetGenres(movieRepository);

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const [activeGenreId, setActiveGenreId] = useState<number>(0);

  const fetchMovies = async () => {
    const data = await getPopularMovies.execute(1);
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
        </ScrollView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
