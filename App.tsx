import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { WishlistProvider } from './src/context/WishlistContext';

const App = () => {
  return (
    <WishlistProvider>
      <AppNavigator />
    </WishlistProvider>
  );
};

export default App;
