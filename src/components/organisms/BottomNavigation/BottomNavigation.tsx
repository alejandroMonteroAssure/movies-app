import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from '../../atoms/IconButton/IconButton';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from './BottomNavigation.styles';

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, onTabPress }: BottomNavigationProps) => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  const tabs = [
    { name: 'Home', icon: 'home-outline', activeIcon: 'home' },
    { name: 'Search', icon: 'search-outline', activeIcon: 'search' },
    { name: 'Wishlist', icon: 'heart-outline', activeIcon: 'heart' },
    { name: 'Profile', icon: 'person-outline', activeIcon: 'person' },
  ];

  const handlePress = (tabName: string) => {
    onTabPress(tabName);
    navigation.navigate(tabName as never);
  };

  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <IconButton
          key={tab.name}
          icon={activeTab === tab.name ? tab.activeIcon : tab.icon}
          label={tab.name}
          active={activeTab === tab.name}
          onPress={() => handlePress(tab.name)}
          color={isDark ? '#fff' : '#000'}
        />
      ))}
    </View>
  );
};

export default BottomNavigation;
