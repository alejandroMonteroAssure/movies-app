import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 30,
    paddingInline: 20,
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
  },
  title: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 20,
  },
});
