import { StyleProp, Text, TextStyle } from 'react-native';
import { styles } from './CustomTextStyles';

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
      style={[styles.base, getVariantStyle(), style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};
