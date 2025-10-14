import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#000000',
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
  },
  bottomSection: {
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
  title: {
    color: '#ffffff',
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    color: '#a0a0a0',
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 20,
  },
});
