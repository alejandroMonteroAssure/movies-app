import React, { useRef } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Animated,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useInfoByStudio } from '../../hooks/useInfoByStudio';
import {
  seeMoreScreenStyles,
} from './SeeMoreScreen.styles';
import { useMoviesByStudio } from '../../hooks/useMoviesByStudio';
import { CustomText } from '../../components/atoms/CustomText/CustomText';
import { useTheme } from '../../context/ThemeContext';
import { useStudiosInfo } from '../../hooks/useStudiosInfo';
import StudioHeader from '../../components/organisms/StudioHeader/StudioHeader';
import MoviesGrid from '../../components/organisms/MoviesGrid/MoviesGrid';
import StudioItem from '../../components/molecules/StudioItem/StudioItem';
import { Studio } from '../../services/domain/Studio';
import { colors } from '../../components/constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'SeeMore'>;

const SeeMoreScreen: React.FC<Props> = ({ route, navigation }) => {

  const { studio } = route.params;
  const { studioInfo } = useInfoByStudio(studio);
  const { studiosInfo, loading: loadingStudios } = useStudiosInfo();
  const { movies, loading: loadingMovies } = useMoviesByStudio(studio, false);

  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<React.ElementRef<typeof ScrollView> | null>(null);

  const { theme } = useTheme();

  const handlePressOnStudio = (studio: Studio) => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
    navigation.navigate('SeeMore', {
      studio: studio.name.split(' ')[0],
    })
  }
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <StudioHeader
        studioInfo={studioInfo}
        scrollY={scrollY}
        theme={theme}
      />
      <Animated.ScrollView
        ref={scrollRef}
        style={[
          seeMoreScreenStyles.screen,
          { backgroundColor: theme === 'dark' ? colors.black : colors.white },
        ]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
      >
        <View style={seeMoreScreenStyles.headerRow}>
          <CustomText variant="title" style={seeMoreScreenStyles.studioTitle}>
            {studioInfo.name}
          </CustomText>
        </View>
        {loadingMovies ? (
          <View style={seeMoreScreenStyles.loadingContainer}>
            <ActivityIndicator size="small" color={colors.white} />
          </View>
        ) : (
          <MoviesGrid movies={movies} />
        )}
        <View style={seeMoreScreenStyles.headerRow}>
          <CustomText variant="title" style={seeMoreScreenStyles.studioTitle}>
            Other Studios
          </CustomText>
        </View>
        {loadingStudios ? (
          <View style={seeMoreScreenStyles.loadingContainer}>
            <ActivityIndicator size="small" color={colors.white} />
          </View>
        ) : (
          <FlatList
            data={studiosInfo}
            keyExtractor={studio => String(studio.id)}
            horizontal
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={seeMoreScreenStyles.otherStudiosContainer}
            renderItem={({ item }) => (
              <StudioItem
                onPress={() => handlePressOnStudio(item)}
                studio={item}
              />
            )}
            initialNumToRender={studiosInfo.length}
            removeClippedSubviews={false}
          />
        )}
      </Animated.ScrollView>
    </View>
  );
};

export default SeeMoreScreen;
