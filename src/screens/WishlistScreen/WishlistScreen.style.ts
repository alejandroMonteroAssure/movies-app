import { StyleSheet } from 'react-native';
import { colors } from '../../components/constants/colors';

export const WishlistScreenStyle = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: colors.background,
  },
  content: {
    padding: 8,
  },
});
