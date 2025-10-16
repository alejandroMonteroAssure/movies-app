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
};

export default function BottomSheet({
  open,
  onClose,
  children,
}: BottomSheetProps) {
  const insets = useSafeAreaInsets();
  const screenH = Dimensions.get('window').height;

  const DEFAULT_HEIGHT = screenH * 0.5;
  const MIN_HEIGHT = screenH * 0.25;
  const MAX_HEIGHT = screenH * 0.85;

  const heightAnim = useRef(new Animated.Value(DEFAULT_HEIGHT)).current;
  const gestureStartHeight = useRef(0);

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        gestureStartHeight.current = (heightAnim as any)._value;
      },

      onPanResponderMove: (_, gestureState) => {
        let newHeight = gestureStartHeight.current - gestureState.dy;

        if (newHeight < MIN_HEIGHT) {
          onClose();
        } else if (newHeight > MAX_HEIGHT) {
          newHeight = MAX_HEIGHT;
        }
        heightAnim.setValue(newHeight);
      },

      onPanResponderRelease: (_, gestureState) => {
        const finalHeight = gestureStartHeight.current - gestureState.dy;
        const midPoint = (DEFAULT_HEIGHT + MAX_HEIGHT) / 2;

        if (gestureState.vy > 0.5 && finalHeight < MIN_HEIGHT) {
          onClose();
          return;
        }

        let targetHeight = finalHeight > midPoint ? MAX_HEIGHT : DEFAULT_HEIGHT;

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