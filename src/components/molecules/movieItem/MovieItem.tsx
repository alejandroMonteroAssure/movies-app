import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Movie } from '../../../services/domain/Movie';
import { MovieItemStyles } from './MovieItem.styles';
import { CustomText } from '../../atoms/CustomText/CustomText';
import MovieBanner from '../../atoms/MovieBanner/MovieBanner';

type MovieItemProps = {
  item: Movie;
  isVerticalMode?: boolean;
};

const MovieItem = ({ item, isVerticalMode = false }: MovieItemProps) => {
  return isVerticalMode ? (
    <TouchableOpacity
      style={MovieItemStyles.verticalCard}
      onPress={() => console.log(item.originalTitle)}
    >
      <MovieBanner
        movie={item}
        width={150}
        customStyle={MovieItemStyles.verticalPoster}
        posterImg
      />
      <CustomText numberOfLines={2} style={{ flexShrink: 1 }}>
        {item.originalTitle}
      </CustomText>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={MovieItemStyles.card}
      onPress={() => console.log(item.originalTitle)}
    >
      <MovieBanner
        movie={item}
        width={120}
        customStyle={MovieItemStyles.poster}
        posterImg
      />
      <CustomText numberOfLines={1}>{item.originalTitle}</CustomText>
    </TouchableOpacity>
  );
};

export default MovieItem;
