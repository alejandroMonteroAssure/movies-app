import { StyleSheet } from 'react-native';

export const seeMoreScreenStyles = StyleSheet.create({
  screen: { flex: 1 },
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
  otherStudiosContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
  }
});