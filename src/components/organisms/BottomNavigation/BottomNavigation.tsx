import React, { useState } from 'react';
import { View } from 'react-native';
import { IconButton } from '../../atoms/IconButton/IconButton';
import { styles } from './BottomNavigation.style';

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = [
    { name: 'Home', icon: 'home-outline', activeIcon: 'home' },
    { name: 'Search', icon: 'search-outline', activeIcon: 'search' },
    { name: 'Wishlist', icon: 'heart-outline', activeIcon: 'heart' },
    { name: 'Profile', icon: 'person-outline', activeIcon: 'person' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <IconButton
          key={tab.name}
          icon={activeTab === tab.name ? tab.activeIcon : tab.icon}
          label={tab.name}
          active={activeTab === tab.name}
          onPress={() => setActiveTab(tab.name)}
        />
      ))}
    </View>
  );
};

export default BottomNavigation;
