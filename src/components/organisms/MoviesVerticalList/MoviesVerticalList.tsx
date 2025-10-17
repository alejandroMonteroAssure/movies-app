import { FlatList, View } from 'react-native';
import { Movie } from '../../../services/domain/Movie';
import { CustomText } from '../../atoms/CustomText/CustomText';
import MovieItem from '../../molecules/movieItem/MovieItem';
import { MoviesVerticalListStyles } from './MoviesVerticalList.styles';
import { IconButton } from '../../atoms/IconButton/IconButton';

type MoviesListProps = {
  listTitle: string;
  movies: Movie[];
  onRemoveMovie?: (movieId: number) => void;
};

const MoviesVerticalList = ({
  listTitle,
  movies,
  onRemoveMovie,
}: MoviesListProps) => {
  return (
    <View>
      <CustomText variant="subtitle">{listTitle}</CustomText>

      {movies.length === 0 ? (
        <CustomText
          variant="body"
          style={{ textAlign: 'center', marginTop: 20 }}
        >
          No movies in your list.
        </CustomText>
      ) : (
        <FlatList
          data={movies}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={MoviesVerticalListStyles.itemContainer}>
              <MovieItem item={item} isVerticalMode />
              {onRemoveMovie && (
                <IconButton
                  icon="trash"
                  label="Remove"
                  active={false}
                  onPress={() => onRemoveMovie(item.id)}
                />
              )}
            </View>
          )}
          contentContainerStyle={MoviesVerticalListStyles.listContent}
        />
      )}
    </View>
  );
};

export default MoviesVerticalList;
