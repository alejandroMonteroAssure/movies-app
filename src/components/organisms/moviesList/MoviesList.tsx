import { ActivityIndicator, FlatList, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../constants/colors';
import { Movie } from '../../../services/domain/Movie';
import { MoviesListStyles } from './MoviesList.styles';
import { CustomText } from '../../atoms/CustomText/CustomText';
import { Button } from '../../atoms/Button/Button';
import MovieBanner from '../../atoms/MovieBanner/MovieBanner';
import MovieItem from '../../molecules/movieItem/MovieItem';
import { Options } from '../../../services/domain/Options';
import { TMDBRepository } from '../../../services/infrastructure/TMDBRepository';
import { GetFilteredMovies } from '../../../services/application/GetFileredMovies';

type MoviesListProps = {
  listTitle: string;
  params: Options;
};

const movieRepository = new TMDBRepository();
const getFilteredMovies = new GetFilteredMovies(movieRepository);

const MoviesList = ({ listTitle, params }: MoviesListProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const data = await getFilteredMovies.execute(params);
      setMovies(data.slice(0, 10));
    } catch (error) {
      console.error('Error fetching movies list:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [JSON.stringify(params)]);

  return (
    <View style={MoviesListStyles.sectionMovies}>
      <View style={MoviesListStyles.headerMovie}>
        <CustomText variant="subtitle">{listTitle}</CustomText>
        <Button
          onPress={() => console.log('see more', movies)}
          title="See more"
          variant="tertiary"
        />
      </View>

      {loading ? (
        <ActivityIndicator color={colors.primary} size="large" />
      ) : (
        <FlatList
          data={movies}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <MovieItem item={item} />}
          contentContainerStyle={MoviesListStyles.listContent}
        />
      )}
    </View>
  );
};

export default MoviesList;
