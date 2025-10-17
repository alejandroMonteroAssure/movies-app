import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { SearchScreen } from '../screens/SearchScreen/SearchScreen';
import { AppLayout } from './AppLayout';
import { RootStackParamList } from './types';
import { toastConfig } from '../libs/toast.config';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const renderWithLayout = (
    Component: React.ComponentType<any>,
    name: string,
  ) => {
    return (props: any) => (
      <AppLayout activeTab={activeTab} onTabPress={setActiveTab}>
        <Component {...props} />
      </AppLayout>
    );
  };

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="Home"
            component={renderWithLayout(HomeScreen, 'Home')}
          />
          <Stack.Screen
            name="Search"
            component={renderWithLayout(SearchScreen, 'Search')}
          />
          <Stack.Screen
            name="Details"
            component={renderWithLayout(DetailsScreen, 'Details')}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <Toast config={toastConfig} visibilityTime={2500} />
    </>
  );
};

export default AppNavigator;
