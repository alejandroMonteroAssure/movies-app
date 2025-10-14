import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Movie } from '../../../services/domain/Movie'
import { MovieItemStyles } from './MovieItem.styles'
import { CustomText } from '../../atoms/CustomText/CustomText'
import MovieBanner from '../../atoms/MovieBanner/MovieBanner'

type MovieItemProps = {
    item: Movie,
}

const MovieItem = ({item} : MovieItemProps) => {
    return (
        <TouchableOpacity style={MovieItemStyles.card} onPress={() => console.log(item.originalTitle)}>
            <MovieBanner movie={item} width={120} customStyle={MovieItemStyles.poster}/>
            <CustomText numberOfLines={1}>{item.originalTitle}</CustomText>
        </TouchableOpacity>
    )
}

export default MovieItem