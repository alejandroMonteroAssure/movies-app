import { StyleProp, Text, TextStyle } from 'react-native';
import { styles } from './CustomText.styles';
import { useTheme } from '../../../context/ThemeContext';

interface CustomTextrops {
  children: string | React.ReactNode;
  variant?: 'title' | 'subtitle' | 'body';
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

export const CustomText = ({
  children,
  variant = 'body',
  style,
  numberOfLines,
}: CustomTextrops) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getVariantStyle = () => {
    switch (variant) {
      case 'title':
        return styles.title;
      case 'subtitle':
        return styles.subtitle;
      case 'body':
      default:
        return styles.body;
    }
  };

  return (
    <Text
      style={[isDark ? styles.base : styles.baseDark, getVariantStyle(), style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};
