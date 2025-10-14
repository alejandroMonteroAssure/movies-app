import { StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

const PILL_PADDING = 1;
const CHIP_H = 5;

export const navbarStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  containerInner: {
    maxWidth: '85%',
    borderRadius: 9999,
    overflow: 'hidden',
    elevation: 10,
  },
  blur: {
    paddingVertical: PILL_PADDING,
    paddingHorizontal: 0,
    minHeight: PILL_PADDING * 2 + CHIP_H,
    justifyContent: 'center',
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressable: {
    marginHorizontal: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 9999,
  },
  title: {
    fontSize: 14,
  },
});
