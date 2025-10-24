import { StyleSheet } from 'react-native';

export const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: isDark ? '#111' : '#f9f9f9',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: isDark ? '#333' : '#ccc',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
  });
