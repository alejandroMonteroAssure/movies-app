import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: '#000',
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
    color: '#fff',
    fontSize: 16,
  },
});
