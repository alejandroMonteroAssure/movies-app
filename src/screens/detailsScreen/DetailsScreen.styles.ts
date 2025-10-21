import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../components/constants/colors';

const { width, height } = Dimensions.get('window');
export const DetailsScreenStyles = StyleSheet.create({
  container: {
    minHeight: height,
    position: 'relative',
  },
  bgDark: {
    backgroundColor: colors.background,
  },
  bgBase: {
    backgroundColor: colors.white,
  },
  headerContainer: {
    marginTop: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    marginRight: 10,
    width: 100
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
    top: 30,
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
  bannerContainer: {
    position: 'relative',
    width: '100%',
    height: width,
  },

  bannerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 0,
  },
});
