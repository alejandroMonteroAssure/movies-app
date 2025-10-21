import { StyleSheet } from 'react-native';
import { colors } from '../../components/constants/colors';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    paddingBottom: 0,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  movieItemContainer: {
    padding: 8,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    color: colors.white,
    fontSize: 16,
  },
});
