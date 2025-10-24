import { TouchableOpacity } from 'react-native';
import { styles } from './Button.styles';
import { CustomText } from '../CustomText/CustomText';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'fourth' | 'red';
  disabled?: boolean;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}: ButtonProps) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      case 'tertiary':
        return styles.tertiary;
      case 'fourth':
        return styles.fourth;
      case 'red':
        return styles.red;
      default:
        return styles.primary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'tertiary':
        return styles.tertiaryText;
      case 'fourth':
        return styles.fourthText;
      case 'red':
        return styles.primaryText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <CustomText style={getTextStyle()}>{title}</CustomText>
    </TouchableOpacity>
  );
};
