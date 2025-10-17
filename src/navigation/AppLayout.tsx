import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomNavigation from '../components/organisms/BottomNavigation/BottomNavigation';

interface AppLayoutProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
  children: React.ReactNode;
}

export const AppLayout = ({
  activeTab,
  onTabPress,
  children,
}: AppLayoutProps) => {
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
