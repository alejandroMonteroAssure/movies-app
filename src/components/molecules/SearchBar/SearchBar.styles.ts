import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    marginHorizontal: 16,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: colors.textSecondary,
    borderWidth: 2,
  },
  iconButton: {
    marginLeft: 8,
  },
});
