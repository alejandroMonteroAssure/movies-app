import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Movie } from '../services/domain/Movie';
import { wishlistStorage } from '../services/infrastructure/WishlistStorage';

type WishlistContextType = {
  wishlist: Movie[];
  addToWishlist: (movie: Movie) => Promise<void>;
  removeFromWishlist: (id: number) => Promise<void>;
  isInWishlist: (id: number) => boolean;
  clearWishlist: () => Promise<void>;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

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
    if (!wishlist.some(m => m.id === movie.id)) {
      const updated = [...wishlist, movie];
      await saveWishlist(updated);
    }
  };

  const removeFromWishlist = async (id: number) => {
    const updated = wishlist.filter(m => m.id !== id);
    await saveWishlist(updated);
  };

  const clearWishlist = async () => {
    await saveWishlist([]);
  };

  const isInWishlist = (id: number) => wishlist.some(m => m.id === id);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};
