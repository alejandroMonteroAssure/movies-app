import { FlatList, View } from 'react-native';
import React from 'react';
import { colors } from '../../constants/colors';
import { Movie } from '../../../services/domain/Movie';
import { MoviesListStyles } from './MoviesList.styles';
import { CustomText } from '../../atoms/CustomText/CustomText';
import { Button } from '../../atoms/Button/Button';
import MovieBanner from '../../atoms/MovieBanner/MovieBanner';
import MovieItem from '../../molecules/movieItem/MovieItem';

type MoviesListProps = {
  data: Movie[];
  listTitle: string;
};

const MoviesList = ({ data, listTitle }: MoviesListProps) => {
  return (
    <>
      <View style={MoviesListStyles.headerMovie}>
        <CustomText variant="subtitle">{listTitle}</CustomText>
        <Button onPress={() => console.log('see more')} title='See more' variant='tertiary'/>
      </View>
      <View style={MoviesListStyles.sectionMovies}>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => 
            <MovieItem item={item}/>
          }
          contentContainerStyle={MoviesListStyles.listContent}
        />
      </View>
    </>
  );
};

export default MoviesList;
