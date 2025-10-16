import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  content: {
    gap: 12,
    paddingBottom: 8,
  },
  closeBtn: {
    position: 'absolute',
    right: 4,
    top: 4,
    zIndex: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  closeText: {
    color: '#bbb',
    fontSize: 22,
  },
  posterWrap: {
    alignItems: 'center',
  },
  poster: {
    width: 320,
    height: 480,
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  closeBtnCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255, 0.23)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    color: '#ddd',
    fontSize: 18,
    lineHeight: 18,
  },
  title: {
    color: '#ddd',
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: '#222',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#333',
  },
  chipText: {
    color: '#bbb',
    fontSize: 12,
  },
  overview: {
    color: '#ddd',
    lineHeight: 20,
  },
});
