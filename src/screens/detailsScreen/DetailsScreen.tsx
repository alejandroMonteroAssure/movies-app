import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { TMDBRepository } from '../../services/infrastructure/TMDBRepository';
import { GetMovieVideos } from '../../services/application/GetMovieVideos';
import { Video } from '../../services/domain/Video';
import { DetailsScreenStyles } from './DetailsScreen.styles';
import { CustomText } from '../../components/atoms/CustomText/CustomText';
import MovieBanner from '../../components/atoms/MovieBanner/MovieBanner';
import { IconButton } from '../../components/atoms/IconButton/IconButton';
import { useWishlist } from '../../context/WishlistContext';
import { colors } from '../../components/constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const movieRepository = new TMDBRepository();
const getMovieVideos = new GetMovieVideos(movieRepository);

const screenW = Dimensions.get('window').width;

const DetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { itemId, movie } = route.params;
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const fetchMovieVideos = async () => {
    setIsLoading(true);
    const data = await getMovieVideos.execute(itemId);
    setVideos(data);
    setIsLoading(false);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(movie.id)) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  };

  useEffect(() => {
    fetchMovieVideos();
  }, [itemId]);

  if (isLoading) {
    return (
      <View style={DetailsScreenStyles.center}>
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  return (
    <ScrollView style={DetailsScreenStyles.container}>
      <MovieBanner movie={movie} width={screenW} type />
      <View style={DetailsScreenStyles.headerContainer}>
        <CustomText variant="title">{movie.originalTitle}</CustomText>
        <IconButton
          icon={isInWishlist(movie.id) ? 'heart' : 'heart-outline'}
          onPress={handleWishlistToggle}
          color={isInWishlist(movie.id) ? colors.primary : colors.textSecondary}
        />
      </View>

      <CustomText style={DetailsScreenStyles.overview}>{movie.overview}</CustomText>
      <IconButton
        icon="arrow-back"
        onPress={() => navigation.goBack()}
        style={DetailsScreenStyles.backBtn}
        color={colors.white}
      />
    </ScrollView>
  );
};

export default DetailsScreen;
