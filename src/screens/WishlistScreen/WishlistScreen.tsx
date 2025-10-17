import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import MoviesVerticalList from '../../components/organisms/MoviesVerticalList/MoviesVerticalList';
import BottomNavigation from '../../components/organisms/BottomNavigation/BottomNavigation';
import { useWishlist } from '../../context/WishlistContext';
import { RootStackParamList } from '../../navigation/types';
import { WishlistScreenStyle } from './WishlistScreen.style';

type Props = NativeStackScreenProps<RootStackParamList, 'Wishlist'>;

const WishlistScreen: React.FC<Props> = ({ route, navigation }) => {
  const { wishlist } = useWishlist();

  return (
    <GestureHandlerRootView style={WishlistScreenStyle.root}>
      <SafeAreaView style={WishlistScreenStyle.safeArea}>
        <View style={WishlistScreenStyle.content}>
          <MoviesVerticalList listTitle="My List" movies={wishlist} />
        </View>
        <BottomNavigation />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default WishlistScreen;
