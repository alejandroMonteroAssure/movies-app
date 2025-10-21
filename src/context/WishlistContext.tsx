import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Movie } from '../services/domain/Movie';
import { wishlistStorage } from '../services/infrastructure/WishlistStorage';
import Toast from 'react-native-toast-message';

type WishlistContextType = {
  wishlist: Movie[];
  addToWishlist: (movie: Movie) => Promise<void>;
  removeFromWishlist: (id: number) => Promise<void>;
  isInWishlist: (id: number) => boolean;
  clearWishlist: () => Promise<void>;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Movie[]>([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    const stored = await wishlistStorage.getAll();
    setWishlist(stored);
  };

  const saveWishlist = async (newList: Movie[]) => {
    setWishlist(newList);
    await wishlistStorage.saveAll(newList);
  };

  const addToWishlist = async (movie: Movie) => {
    if (!wishlist.some(movie => movie.id === movie.id)) {
      const updated = [...wishlist, movie];
      await saveWishlist(updated);
      Toast.show({
        type: 'success',
        text1: 'Movie added!',
        text2: 'The movie has been saved successfully.',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Movie already added',
        text2: 'The movie has already been added.',
      });
    }
  };

  const removeFromWishlist = async (id: number) => {
    const updated = wishlist.filter(movie => movie.id !== id);
    setWishlist(updated);
    await saveWishlist(updated);

    Toast.show({
      type: 'info',
      text1: 'Movie removed',
      text2: 'The movie has been removed from your wishlist.',
    });
  };

  const clearWishlist = async () => {
    await saveWishlist([]);
  };

  const isInWishlist = (id: number) => wishlist.some(movie => movie.id === id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};
