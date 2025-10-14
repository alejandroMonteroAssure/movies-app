import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.buttonPrimary,
  },
  secondary: {
    backgroundColor: colors.buttonSecondary,
  },
  tertiary: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  primaryText: {
    color: colors.textDark,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  tertiaryText: {
    color: colors.buttonPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
});
