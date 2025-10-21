import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Dimensions,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Animated
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useInfoByStudio } from '../../hooks/useInfoByStudio';
import { TMDB_IMAGE_BASE_URL } from '@env';
import {
  bottomGradientColors,
  seeMoreScreenStyles,
  topGradientColors,
} from './SeeMoreScreen.styles';
import LinearGradient from 'react-native-linear-gradient';
import { useMoviesByStudio } from '../../hooks/useMoviesByStudio';
import MovieBanner from '../../components/atoms/MovieBanner/MovieBanner';
import { CustomText } from '../../components/atoms/CustomText/CustomText';
import { colors } from '../../components/constants/colors';
import { IconButton } from '../../components/atoms/IconButton/IconButton';

type Props = NativeStackScreenProps<RootStackParamList, 'SeeMore'>;

const SeeMoreScreen: React.FC<Props> = ({ route, navigation }) => {
  const { height } = Dimensions.get('window');
  const { studio } = route.params;
  const { studioInfo, loading } = useInfoByStudio(studio);
  const { movies, loading: loadingMovies } = useMoviesByStudio(studio, false);
  const [ratio, setRatio] = useState<number | undefined>(undefined);
  const logoUri = `${TMDB_IMAGE_BASE_URL}/w500${studioInfo?.logoPath}`;
  const [loadingStudioImage, setLoadingStudioImage] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const screenW = Dimensions.get('window').width;

  const H_PADDING = 16;
  const GUTTER = 12;
  const CELL_W = (screenW - H_PADDING * 2 - GUTTER) / 2;

  const HEADER_MAX_HEIGHT = height * 0.6;
  const HEADER_MIN_HEIGHT = 105;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  useEffect(() => {
    let alive = true;
    Image.getSize(
      logoUri,
      (width, height) => alive && setRatio(width / height),
      () => alive && setRatio(undefined),
    );
    return () => {
      alive = false;
    };
  }, [logoUri]);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp'
  })

  const logoOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.3, 0],
    extrapolate: 'clamp'
  })

  const textOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.3, 1],
    extrapolate: 'clamp'
  })

  const logoScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  })

  const gradientOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  })

  const isTooDark = (color: string) => {
    let hex = color.replace('#', '');
    const r = parseInt(hex.substring(0,2), 16);
    const g = parseInt(hex.substring(2,4), 16);
    const b = parseInt(hex.substring(4,6), 16);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance < 128;
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <IconButton
        icon="arrow-back"
        onPress={() => navigation.goBack()}
        style={seeMoreScreenStyles.backBtn}
        color={colors.white}
      />
      <Animated.View
        style={[
          seeMoreScreenStyles.hero,
          {
            backgroundColor: studioInfo.color,
            height: headerHeight,
            justifyContent: 'center',
            alignItems: 'center'
          },
        ]}
      >
        <LinearGradient
          colors={topGradientColors}
          locations={[0, 0.5, 1]}
          style={seeMoreScreenStyles.topGradientContainer}
        />
        <Animated.Image
          source={{
            uri: `${TMDB_IMAGE_BASE_URL}/w500${studioInfo?.logoPath}`,
          }}
          style={[{ width: screenW * 0.6, aspectRatio: ratio ?? 2.5, resizeMode: 'contain', opacity: logoOpacity, transform: [{ scale: logoScale }], }]}
          resizeMode="contain"
          onLoadStart={() => setLoadingStudioImage(true)}
          onLoadEnd={() => setLoadingStudioImage(false)}
        />
        {
          loadingStudioImage && (
            <View
              style={{
                width: screenW * 0.6,
                aspectRatio: ratio ?? 2.5,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIndicator size="small" color="#999" />
            </View>
          )
        }
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            opacity: gradientOpacity,
          }}
        >
          <LinearGradient
            colors={bottomGradientColors}
            locations={[0, 0.35, 0.65, 0.7]}
            style={{ flex: 1 }}
          />
        </Animated.View>
        <Animated.Text
          style={{
            position: 'absolute',
            bottom: 20,
            fontSize: 22,
            color: (isTooDark(studioInfo.color) ? 'white': 'black'),
            fontWeight: 'bold',
            opacity: textOpacity,
          }}
        >
          {studioInfo.name}
        </Animated.Text>
      </Animated.View>
      <Animated.ScrollView style={seeMoreScreenStyles.screen}
        onScroll={
          Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
      >
        <View style={seeMoreScreenStyles.headerRow}>
          <CustomText variant="title" style={seeMoreScreenStyles.studioTitle}>
            {studioInfo.name}
          </CustomText>
        </View>
        {loadingMovies ? (
          <View style={seeMoreScreenStyles.loadingContainer}>
            <ActivityIndicator size="small" color="#fff" />
          </View>
        ) : (
          <FlatList
            data={movies}
            keyExtractor={movie => String(movie.id)}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={seeMoreScreenStyles.gridContentContainer}
            columnWrapperStyle={seeMoreScreenStyles.columnWrapper}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Details', { itemId: item.id, movie: item })
                }
              >
                <MovieBanner
                  movie={item}
                  width={CELL_W}
                  height={CELL_W * 1.5}
                  posterImg
                />
              </TouchableOpacity>
            )}
            removeClippedSubviews={false}
            windowSize={10}
            initialNumToRender={20}
            maxToRenderPerBatch={12}
            updateCellsBatchingPeriod={50}
            scrollEnabled={false}
          />
        )}
      </Animated.ScrollView>
    </View>
  );
};

export default SeeMoreScreen;
