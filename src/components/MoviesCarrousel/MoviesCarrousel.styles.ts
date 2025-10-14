import { StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

export const moviesCarrouselStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    marginHorizontal: 24,
    gap: 20,
  },

  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },

  topGradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 105,
    zIndex: 2,
  },

  bottomGradientContainer: {
    marginTop: -100,
    height: 120,
    paddingVertical: 10,
  },

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    gap: 5,
  },
  paginationDot: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 50,
    width: 10,
    height: 10,
  },
  activeDot: {
    backgroundColor: colors.buttonPrimary,
    borderRadius: 50,
    width: 10,
    height: 10,
  },
});
export const topGradientColors = [
  'rgba(0,0,0,0.6)',
  'rgba(0,0,0,0.4)',
  'rgba(0,0,0,0)',
];
export const bottomGradientColors = [
  'rgba(0,0,0,0)',
  'rgba(0,0,0,0.5)',
  'rgba(0,0,0,0.9)',
  'rgba(0,0,0,1)',
];
