import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../components/constants/colors';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export const seeMoreScreenStyles = StyleSheet.create({
  screen: { flex: 1},
  hero: {
    width,
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.6,
  },
  topGradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 105,
    zIndex: 2,
  },
  backBtn: {
    position: 'absolute',
    padding: 10,
    top: 50,
    left: 25,
    backgroundColor: colors.goBackBg,
    borderRadius: 9999,
    zIndex: 10,
  },
  bottomGradientContainer: {
    marginTop: -40,
    height: 60,
    paddingVertical: 10,
    alignSelf: 'stretch',
  },
  loadingContainer: {
    paddingVertical: 24,
  },
  gridContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  studioTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  sortChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  sortChipText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export const topGradientColors = [
  'rgba(0,0,0,0.6)',
  'rgba(0,0,0,0.4)',
  'rgba(0,0,0,0)',
];
export const bottomGradientColorsDarkMode = [
  'rgba(0,0,0,0)',
  'rgba(0,0,0,0.5)',
  'rgba(0,0,0,0.9)',
  'rgba(0,0,0,1)',
];


export const bottomGradientColorsLightMode = [
  'rgba(255,255,255,0)',
  'rgba(255,255,255,0.5)',
  'rgba(255,255,255,0.9)',
  'rgba(255,255,255,1)',
];
