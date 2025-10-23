import { StyleSheet, Dimensions } from 'react-native';

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
  otherStudiosContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
  }
});