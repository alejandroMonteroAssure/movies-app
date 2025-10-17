import { FlatList, View } from 'react-native';
import { Movie } from '../../../services/domain/Movie';
import { CustomText } from '../../atoms/CustomText/CustomText';
import { Button } from '../../atoms/Button/Button';
import MovieItem from '../../molecules/movieItem/MovieItem';
import { MoviesVerticalListStyles } from './MoviesVerticalList.styles';

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
        renderItem={({ item }) => <MovieItem item={item} />}
        contentContainerStyle={MoviesVerticalListStyles.listContent}
      />
    </View>
  );
};

export default MoviesVerticalList;
