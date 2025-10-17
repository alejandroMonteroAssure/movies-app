import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from '../../atoms/IconButton/IconButton';
import { styles } from './BottomNavigation.style';

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, onTabPress }: BottomNavigationProps) => {
  const navigation = useNavigation<any>();

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
        />
      ))}
    </View>
  );
};

export default BottomNavigation;
