import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomNavigation from '../components/organisms/BottomNavigation/BottomNavigation';
import { useNavigationState } from '@react-navigation/native';

interface AppLayoutProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
  children: React.ReactNode;
  setActiveTab: (tab: string) => void;
}

export const AppLayout = ({
  activeTab,
  onTabPress,
  setActiveTab,
  children,
}: AppLayoutProps) => {
  const currentRoute = useNavigationState(state => {
    const route = state.routes[state.index];
    return route.name;
  });

  useEffect(() => {
    if (['Home', 'Search', 'Wishlist', 'Profile'].includes(currentRoute)) {
      setActiveTab(currentRoute);
    }
  }, [currentRoute]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      <BottomNavigation activeTab={activeTab} onTabPress={onTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
});
