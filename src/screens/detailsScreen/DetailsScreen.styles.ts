import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../components/constants/colors';

const screenH = Dimensions.get('window').height;
export const DetailsScreenStyles = StyleSheet.create({
  container: {
    minHeight: screenH,
    position: 'relative',
  },
  bgDark: {
    backgroundColor: colors.background,
  },
  bgBase: {
    backgroundColor: colors.backgroundLight,
  },
  headerContainer: {
    marginTop: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  backBtn: {
    position: 'absolute',
    padding: 10,
    top: 40,
    left: 16,
    backgroundColor: colors.goBackBg,
    borderRadius: 20,
  },
  overview: {
    padding: 20,
  },
  metaRow: {
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  videoContainer: {
    marginBottom: 0,
  },
});
