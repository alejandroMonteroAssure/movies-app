import { ScrollView } from 'react-native-gesture-handler';
import { Movie } from '../../../services/domain/Movie';
import BottomSheet from '../../atoms/BottomSheet/BottomSheet';
import MovieBanner from '../../atoms/MovieBanner/MovieBanner';
import { Dimensions, View } from 'react-native';
import { styles } from './DetailsModal.styles';
import { CustomText } from '../../atoms/CustomText/CustomText';
import { useState } from 'react';
import Chip from '../../atoms/chip/Chip';

type DetailsModalProps = {
  open: boolean;
  onClose: () => void;
  movie?: Movie;
};

export default function DetailsModal({
  open,
  onClose,
  movie,
}: DetailsModalProps) {
  if (!open) return null;
  const screenH = Dimensions.get('window').height;
  const screenW = Dimensions.get('window').width;
  const DEFAULT_H = Math.floor(screenH * 0.5);
  const [contentH, setContentH] = useState<number>(DEFAULT_H);

  return (
    <BottomSheet open={open} onClose={onClose} contentHeight={contentH}>
      <View style={[styles.container]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          onLayout={event => {
            const measuredHeight = event.nativeEvent.layout.height;
            setContentH(measuredHeight + measuredHeight * 0.10);
          }}
        >
          <View style={styles.posterWrap}>
            <MovieBanner
              movie={movie!}
              width={screenW * 0.75}
              height={screenW * 1}
              customStyle={{ borderRadius: 16 }}
              posterImg
            />
          </View>
          <CustomText variant="title" style={styles.title}>
            {movie?.originalTitle}
          </CustomText>
          <View style={styles.metaRow}>
            <Chip>{new Date(movie!.releaseDate).getFullYear()}</Chip>
            <Chip>
              ★ {movie!.voteAverage.toFixed(1)}
            </Chip>
            <Chip>{movie!.originalLanguage.toUpperCase()}</Chip>
            <CustomText style={styles.overview}>{movie!.overview}</CustomText>
          </View>
          <View style={{height: screenH * 0.1}}/>

        </ScrollView>
      </View>
    </BottomSheet>
  );
}
