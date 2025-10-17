import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Movie } from '../domain/Movie';

const WISHLIST_KEY = '@wishlist_movies';

export const wishlistStorage = {
  async getAll(): Promise<Movie[]> {
    try {
      const json = await AsyncStorage.getItem(WISHLIST_KEY);
      return json ? JSON.parse(json) : [];
    } catch (err) {
      console.error('Error reading wishlist', err);
      return [];
    }
  },

  async saveAll(list: Movie[]) {
    try {
      await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
    } catch (err) {
      console.error('Error saving wishlist', err);
    }
  },
};
