import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Movie } from '../../../services/domain/Movie';
import { MovieItemStyles } from './MovieItem.styles';
import { CustomText } from '../../atoms/CustomText/CustomText';
import MovieBanner from '../../atoms/MovieBanner/MovieBanner';
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/types'

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type MovieItemProps = {
  item: Movie;
  isVerticalMode?: boolean;
};

const MovieItem = ({ item, isVerticalMode = false }: MovieItemProps) => {
    const navigation = useNavigation<HomeScreenNavigationProp>()

  return isVerticalMode ? (
    <TouchableOpacity
      style={MovieItemStyles.verticalCard}
      onPress={() => navigation.navigate('Details', {itemId: item.id, movie: item})}
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
      onPress={() => navigation.navigate('Details', {itemId: item.id, movie: item})}
    >
      <MovieBanner
        movie={item}
        width={120}
        customStyle={MovieItemStyles.poster}
       
      />
      <CustomText numberOfLines={1}>{item.originalTitle}</CustomText>
    </TouchableOpacity>
  );
};

export default MovieItem;
