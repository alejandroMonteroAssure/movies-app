import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { WishlistProvider } from './src/context/WishlistContext';
import { AppThemeProvider } from './src/context/ThemeContext';

const App = () => {
  return (
    <AppThemeProvider>
      <WishlistProvider>
        <AppNavigator />
      </WishlistProvider>
    </AppThemeProvider>
  );
};

export default App;
