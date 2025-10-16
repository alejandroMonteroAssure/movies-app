import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './BottomSheet.styles';

type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  contentHeight: number
};

export default function BottomSheet({
  open,
  onClose,
  children,
  contentHeight
}: BottomSheetProps) {
  const insets = useSafeAreaInsets();
  const screenH = Dimensions.get('window').height;

  const DEFAULT_HEIGHT = screenH * 0.5;
  const MIN_HEIGHT = screenH * 0.25;
  const MAX_HEIGHT = contentHeight;
  const ABSOLUTE_SCREEN_MAX = screenH * 0.85;

  const latestHeights = useRef({
    MIN: MIN_HEIGHT,
    DEFAULT: DEFAULT_HEIGHT,
    MAX: MAX_HEIGHT,
  });

  latestHeights.current.MIN = MIN_HEIGHT;
  latestHeights.current.DEFAULT = DEFAULT_HEIGHT;
  latestHeights.current.MAX = Math.min(MAX_HEIGHT, ABSOLUTE_SCREEN_MAX);
  const INITIAL_SNAP_HEIGHT = Math.min(DEFAULT_HEIGHT, contentHeight);
  

  const heightAnim = useRef(new Animated.Value(INITIAL_SNAP_HEIGHT)).current;
  const gestureStartHeight = useRef(0);

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        gestureStartHeight.current = (heightAnim as any)._value;
      },

      onPanResponderMove: (_, gestureState) => {
        const { MIN, MAX } = latestHeights.current;
        let newHeight = gestureStartHeight.current - gestureState.dy;
        if (newHeight <= MIN) {
          onClose();
        } else if (newHeight > MAX) {
          newHeight = MAX;
        }
        heightAnim.setValue(newHeight);
      },

      onPanResponderRelease: (_, gestureState) => {
        const { MIN, MAX } = latestHeights.current;
        let targetHeight = MAX;
        if (gestureState.vy > 0.3) {
          targetHeight = MIN;
          onClose();
          return;
        } else if(gestureState.vy < -0.6){
          targetHeight = MAX;
        }
        Animated.spring(heightAnim, {
          toValue: targetHeight,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  if (!open) return null;

  return (
    <Modal
      visible
      transparent
      statusBarTranslucent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />

      <Animated.View
        style={[styles.sheetContainer, { height: heightAnim }]}
      >
        <View
          style={[
            styles.sheet,
            {
              paddingBottom: 20 + insets.bottom,
            },
          ]}
        >
          <View {...pan.panHandlers} style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>
          {children}
        </View>
      </Animated.View>
    </Modal>
  );
}