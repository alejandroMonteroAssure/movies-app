import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '../../atoms/Input/Input';
import { IconButton } from '../../atoms/IconButton/IconButton';
import { styles } from './SearchBar.style';

interface SearchBarProps {
  query: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
}

export const SearchBar = ({
  query,
  onChangeText,
  onSearch,
}: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <Input
        placeholder="Search movies..."
        value={query}
        onChangeText={onChangeText}
        style={styles.input}
      />
      <IconButton icon="search" onPress={onSearch} style={styles.iconButton} />
    </View>
  );
};
