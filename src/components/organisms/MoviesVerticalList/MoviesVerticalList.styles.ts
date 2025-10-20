import { StyleSheet } from 'react-native';

export const MoviesVerticalListStyles = StyleSheet.create({
  listContent: {
    paddingVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  movieItemWrapper: {
    flex: 1,
  },
});
