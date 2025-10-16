import { ScrollView } from 'react-native-gesture-handler';
import { Movie } from '../../services/domain/Movie';
import BottomSheet from '../atoms/BottomSheet/BottomSheet';
import MovieBanner from '../atoms/MovieBanner/MovieBanner';
import { Dimensions, Pressable, View } from 'react-native';
import { styles } from './DetailsModal.type';
import { CustomText } from '../atoms/CustomText/CustomText';

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
  const MAX_H = Math.floor(screenH * 0.5);

  return (
    <BottomSheet open={open} onClose={onClose}>
      <View style={[styles.container]}>
        
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.posterWrap}>
            <MovieBanner
              movie={movie!}
              width={screenW * 0.75}
              height={screenW * 1}
              customStyle={{borderRadius: 16}}
              type
            />
          </View>
          <CustomText variant="title" style={styles.title}>
            {movie?.originalTitle}
          </CustomText>
          <View style={styles.metaRow}>
            <View style={styles.chip}>
              <CustomText style={styles.chipText}>
                {new Date(movie!.releaseDate).getFullYear()}
              </CustomText>
            </View>
            <View style={styles.chip}>
              <CustomText style={styles.chipText}>
                ★ {movie!.voteAverage.toFixed(1)}
              </CustomText>
            </View>
            <View style={styles.chip}>
              <CustomText style={styles.chipText}>
                {movie!.originalLanguage.toUpperCase()}
              </CustomText>
            </View>
            <CustomText style={styles.overview}>{movie!.overview}</CustomText>
          </View>
        </ScrollView>
      </View>
    </BottomSheet>
  );
}
