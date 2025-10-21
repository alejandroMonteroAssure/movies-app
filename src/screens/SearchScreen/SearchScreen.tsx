import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SearchBar } from '../../components/molecules/SearchBar/SearchBar';
import MovieItem from '../../components/molecules/movieItem/MovieItem';
import { Movie } from '../../services/domain/Movie';
import { TMDBRepository } from '../../services/infrastructure/TMDBRepository';
import { GetMoviesByQuery } from '../../services/application/getMoviesByQuery';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { styles } from './SearchScreen.styles';
import { useTheme } from '../../context/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

export const SearchScreen: React.FC<Props> = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const movieRepository = new TMDBRepository();
  const getMoviesByQuery = new GetMoviesByQuery(movieRepository);

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const backgroundColor = isDark ? '#000' : '#fff';
  const textColor = isDark ? '#fff' : '#000';
  const secondaryText = isDark ? '#aaa' : '#555';

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await getMoviesByQuery.execute(query);
      setResults(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView style={[styles.root, { backgroundColor }]}>
      <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
        <SearchBar
          query={query}
          onChangeText={setQuery}
          onSearch={handleSearch}
        />

        {loading && (
          <View style={styles.messageContainer}>
            <Text style={[styles.messageText, { color: secondaryText }]}>
              Cargando...
            </Text>
          </View>
        )}

        {!loading && results.length === 0 && query.trim().length > 0 && (
          <View style={styles.messageContainer}>
            <Text style={[styles.messageText, { color: secondaryText }]}>
              No se encontraron resultados
            </Text>
          </View>
        )}

        {!loading && results.length > 0 && (
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            style={{ backgroundColor }}
          >
            <View style={styles.grid}>
              {results.map(movie => (
                <View key={movie.id} style={styles.movieItemContainer}>
                  <MovieItem item={movie} />
                </View>
              ))}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
