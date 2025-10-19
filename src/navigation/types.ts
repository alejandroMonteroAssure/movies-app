import { Movie } from "../services/domain/Movie";

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Details: { itemId: number, movie: Movie };
  Wishlist: undefined;
  Profile: undefined;
  SeeMore: { studio: string};
};
