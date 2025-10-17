import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { StatusBar } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { SearchScreen } from '../screens/SearchScreen/SearchScreen';
import BottomNavigation from '../components/organisms/BottomNavigation/BottomNavigation';
import { RootStackParamList } from './types';
import SeeMoreScreen from '../screens/SeeMoreScreen/SeeMoreScreen';
import { toastConfig } from '../libs/toast.config';
import Toast from 'react-native-toast-message';
import WishlistScreen from '../screens/WishlistScreen/WishlistScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const navigationRef = useNavigationContainerRef();

  const handleStateChange = () => {
    const currentRoute = navigationRef.getCurrentRoute();
    if (!currentRoute) return;

    const { name } = currentRoute;
    if (['Home', 'Search', 'Wishlist', 'Profile'].includes(name)) {
      setActiveTab(name);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer
        ref={navigationRef}
        onStateChange={handleStateChange}
      >
        <View style={styles.content}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="SeeMore" component={SeeMoreScreen} />
          </Stack.Navigator>
        </View>
        <BottomNavigation activeTab={activeTab} onTabPress={setActiveTab} />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
});

export default AppNavigator;
