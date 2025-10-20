import { StyleSheet } from 'react-native';

export const MovieItemStyles = StyleSheet.create({
  card: {
    marginRight: 15,
    width: 120,
    alignItems: 'center',
  },
  poster: {
    height: 180,
    borderRadius: 10,
    marginBottom: 8,
  },
  verticalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginBottom: 15,
  },
  verticalPoster: {
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
});
