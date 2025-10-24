import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
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
import Chip from '../../components/atoms/chip/Chip';
import YoutubeIframe from 'react-native-youtube-iframe';
import { useTheme } from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const movieRepository = new TMDBRepository();
const getMovieVideos = new GetMovieVideos(movieRepository);

const screenW = Dimensions.get('window').width;

const DetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { itemId, movie } = route.params;
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[DetailsScreenStyles.container, isDark ? DetailsScreenStyles.bgDark : DetailsScreenStyles.bgBase,]}>
      <ScrollView>
        {videos.length > 0 ?
          <View style={DetailsScreenStyles.videoContainer}>
            <YoutubeIframe
              height={225}
              play={true}
              videoId={videos[0].key}
            />
          </View> :
          <View style={DetailsScreenStyles.bannerContainer}>
            <MovieBanner movie={movie} width={screenW} height={screenW} posterImg />

            <LinearGradient
              colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.8)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={DetailsScreenStyles.bannerGradient}
            />
          </View>

        }

        <View style={DetailsScreenStyles.headerContainer}>
          <CustomText variant="title" numberOfLines={2} style={DetailsScreenStyles.title}>{movie.originalTitle}</CustomText>
          <IconButton
            icon={isInWishlist(movie.id) ? 'heart' : 'heart-outline'}
            onPress={handleWishlistToggle}
            color={isInWishlist(movie.id) ? colors.primary : colors.textSecondary}
          />
        </View>

        <View style={DetailsScreenStyles.metaRow}>
          <Chip>{new Date(movie!.releaseDate).getFullYear()}</Chip>
          <Chip>★ {movie!.voteAverage.toFixed(1)}</Chip>
          <Chip>{movie!.originalLanguage.toUpperCase()}</Chip>
        </View>

        <CustomText style={DetailsScreenStyles.overview}>
          {movie.overview}
        </CustomText>

        <IconButton
          icon="arrow-back"
          onPress={() => navigation.goBack()}
          style={DetailsScreenStyles.backBtn}
          color={colors.white}
        />
      </ScrollView>
    </SafeAreaView>

  );
};

export default DetailsScreen;
