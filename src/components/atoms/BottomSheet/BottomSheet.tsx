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

  const latestHeights = useRef({
    MIN: MIN_HEIGHT,
    DEFAULT: DEFAULT_HEIGHT,
    MAX: MAX_HEIGHT,
  });

  latestHeights.current.MIN = MIN_HEIGHT;
  latestHeights.current.DEFAULT = DEFAULT_HEIGHT;
  latestHeights.current.MAX = MAX_HEIGHT;
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
        console.log("on move");
        let newHeight = gestureStartHeight.current - gestureState.dy;
        console.log("new height on move is ", newHeight)

        if (newHeight < MIN) {
          onClose();
        } else if (newHeight > MAX) {
          newHeight = MAX;
          console.log("setting heigh as new height")

        }
        heightAnim.setValue(newHeight);
      },

      onPanResponderRelease: (_, gestureState) => {
        const { MIN, MAX, DEFAULT } = latestHeights.current;

        const finalHeight = gestureStartHeight.current - gestureState.dy;
        console.log("Final height is ", finalHeight);

        const midPoint = (DEFAULT + MAX) / 2;
        console.log("Mid points is ", midPoint);

        if (gestureState.vy > 0.3 && finalHeight < MIN) {
          onClose();
          return;
        }

        console.log("max height is", MAX);

        let targetHeight = finalHeight > midPoint ? MAX : finalHeight;
        console.log("target height", targetHeight);

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