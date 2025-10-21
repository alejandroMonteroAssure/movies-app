import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import MoviesVerticalList from '../../components/organisms/MoviesVerticalList/MoviesVerticalList';
import { useWishlist } from '../../context/WishlistContext';
import { RootStackParamList } from '../../navigation/types';
import { WishlistScreenStyle } from './WishlistScreen.styles';
import { useTheme } from '../../context/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Wishlist'>;

const WishlistScreen: React.FC<Props> = ({ route, navigation }) => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  const backgroundColor = isDark ? '#000' : '#fff';

  return (
    <GestureHandlerRootView style={[WishlistScreenStyle.root, { backgroundColor }]}>
      <SafeAreaView style={[WishlistScreenStyle.safeArea, { backgroundColor }]}>
        <View style={WishlistScreenStyle.content}>
          <MoviesVerticalList
            listTitle="My List"
            movies={wishlist}
            onRemoveMovie={removeFromWishlist}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default WishlistScreen;
