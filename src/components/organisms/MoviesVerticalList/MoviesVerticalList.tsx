import { FlatList, View } from 'react-native';
import { Movie } from '../../../services/domain/Movie';
import { CustomText } from '../../atoms/CustomText/CustomText';
import MovieItem from '../../molecules/movieItem/MovieItem';
import { MoviesVerticalListStyles } from './MoviesVerticalList.styles';
import { IconButton } from '../../atoms/IconButton/IconButton';

type MoviesListProps = {
  listTitle: string;
  movies: Movie[];
};

const MoviesVerticalList = ({ listTitle, movies }: MoviesListProps) => {
  return (
    <View>
      <CustomText variant="subtitle">{listTitle}</CustomText>

      <FlatList
        data={movies}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={MoviesVerticalListStyles.itemContainer}>
            <MovieItem item={item} isVerticalMode={true} />
            <IconButton
              icon="trash"
              label="Remove"
              active={false}
              onPress={() => console.log('delete', item.id)}
            />
          </View>
        )}
        contentContainerStyle={MoviesVerticalListStyles.listContent}
      />
    </View>
  );
};

export default MoviesVerticalList;
