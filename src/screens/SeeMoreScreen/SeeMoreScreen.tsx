import React, { useEffect, useState } from 'react';
import {
  View,
  Dimensions,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
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
  const { studio } = route.params;
  const { studioInfo, loading } = useInfoByStudio(studio);
  const { movies, loading: loadingMovies } = useMoviesByStudio(studio, false);
  const [ratio, setRatio] = useState<number | undefined>(undefined);
  const logoUri = `${TMDB_IMAGE_BASE_URL}/w500${studioInfo?.logoPath}`;
  const [loadingStudioImage, setLoadingStudioImage] = useState(false);

  const screenW = Dimensions.get('window').width;

  const H_PADDING = 16;
  const GUTTER = 12;
  const CELL_W = (screenW - H_PADDING * 2 - GUTTER) / 2;

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

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <IconButton
        icon="arrow-back"
        onPress={() => navigation.goBack()}
        style={seeMoreScreenStyles.backBtn}
        color={colors.white}
      />
      <ScrollView style={seeMoreScreenStyles.screen}>
        <View>
          <View
            style={[
              seeMoreScreenStyles.hero,
              { backgroundColor: studioInfo.color },
            ]}
          >
            <LinearGradient
              colors={topGradientColors}
              locations={[0, 0.5, 1]}
              style={seeMoreScreenStyles.topGradientContainer}
            />
            <Image
              source={{
                uri: `${TMDB_IMAGE_BASE_URL}/w500${studioInfo?.logoPath}`,
              }}
              style={[{ width: screenW * 0.6, aspectRatio: ratio ?? 2.5 }]}
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

          </View>
          <LinearGradient
            colors={bottomGradientColors}
            locations={[0, 0.35, 0.65, 0.8]}
            style={seeMoreScreenStyles.bottomGradientContainer}
          />
        </View>
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
      </ScrollView>
    </View>
  );
};

export default SeeMoreScreen;
