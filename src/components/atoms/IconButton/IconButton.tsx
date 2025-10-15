import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CustomText } from '../CustomText/CustomText';
import { colors } from '../../constants/colors';
import { styles } from './IconButton.styles';

interface IconButtonProps {
  icon: string;
  label?: string;
  color?: string;
  active?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export const IconButton = ({
  icon,
  label,
  color = '#bbb',
  active = false,
  onPress,
  style,
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      <Icon name={icon} size={26} color={active ? colors.primary : color} />
      {label && (
        <CustomText
          variant="body"
          style={[styles.label, { color: active ? colors.primary : color }]}
        >
          {label}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};
