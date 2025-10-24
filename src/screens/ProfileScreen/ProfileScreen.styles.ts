import { StyleSheet } from 'react-native';
import { colors } from '../../components/constants/colors';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  scroll: {
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
  },
  email: {
    fontSize: 14,
    color: '#999',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  statLabel: {
    color: colors.white,
    fontSize: 12,
    marginTop: 4,
  },
  actions: {
    width: '100%',
    marginTop: 40,
    gap: 14,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  secondaryText: {
    color: colors.primary,
  },
  logoutButton: {
    backgroundColor: '#d9534f',
  },
  sectionTitle: {
    color: colors.white,
    marginTop: 20,
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 10,
  },
});
