import { Dimensions, View } from 'react-native';
import { Movie } from '../../services/domain/Movie';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import MovieBanner from '../atoms/MovieBanner/MovieBanner';
import {
  bottomGradientColors,
  moviesCarrouselStyles,
  topGradientColors,
} from './MoviesCarrousel.styles';
import { CustomText } from '../atoms/CustomText/CustomText';
import { Button } from '../atoms/Button/Button';
import {
  useSharedValue,
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import { useWishlist } from '../../context/WishlistContext';
import { useNavigation } from '@react-navigation/native';

type MoviesCarrouselProps = {
  popularMovies: Movie[];
  onPressDetails: (movie: Movie) => void;
};

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function MoviesCarrousel({
  popularMovies,
  onPressDetails,
}: MoviesCarrouselProps) {
  const insets = useSafeAreaInsets();
  const ref = React.useRef<ICarouselInstance>(null);
  const width = Dimensions.get('window').width;
  const progress = useSharedValue<number>(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const { addToWishlist } = useWishlist();
  const navigation = useNavigation<any>();

  const movie = popularMovies[activeIndex];

  if (!movie) return null;

  const handleSelectPage = (index: number) => {
    setActiveIndex(index);
    ref.current?.scrollTo({ index, animated: true });
  };

  const handleAddWishlist = () => {
    addToWishlist(popularMovies[activeIndex]);
  };

  const handleNavigation = (tabName: string) => {
    navigation.navigate(tabName as never);
  };

  return (
    <View style={{ position: 'relative' }}>
      <LinearGradient
        colors={topGradientColors}
        locations={[0, 0.5, 1]}
        style={moviesCarrouselStyles.topGradientContainer}
      />
      <Carousel
        ref={ref}
        width={width}
        height={430}
        loop
        autoPlay
        autoPlayInterval={5000}
        data={popularMovies}
        onSnapToItem={index => setActiveIndex(index)}
        onProgressChange={progress}
        renderItem={({ index }) => {
          const movie = popularMovies[index];
          return <MovieBanner movie={movie} width={width} height={430} />;
        }}
      />
      <LinearGradient
        colors={bottomGradientColors}
        locations={[0, 0.14, 0.52, 1]}
        style={moviesCarrouselStyles.bottomGradientContainer}
      >
        <View style={moviesCarrouselStyles.rowBetween}>
          <Button
            title="My List"
            variant="fourth"
            onPress={() => handleNavigation('Wishlist')}
          />
          <Button
            title="Discover"
            variant="fourth"
            onPress={() => handleNavigation('Search')}
          />
        </View>

        <View style={moviesCarrouselStyles.buttonsContainer}>
          <Button
            title="+ Wishlist"
            variant="secondary"
            onPress={handleAddWishlist}
          />
          <Button
            title="Details"
            variant="primary"
            onPress={() => onPressDetails(movie)}
          />
        </View>
      </LinearGradient>
      <Pagination.Basic
        progress={progress}
        data={popularMovies}
        dotStyle={moviesCarrouselStyles.paginationDot}
        activeDotStyle={moviesCarrouselStyles.activeDot}
        containerStyle={moviesCarrouselStyles.paginationContainer}
        onPress={handleSelectPage}
      />
    </View>
  );
}
