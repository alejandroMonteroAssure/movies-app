import React, { useEffect, useRef } from 'react';
import { Animated, Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './DetailsBottomSheet.styles';
import { Movie } from '../../services/domain/Movie';

type DetailsBottomSheetProps = {
  open: boolean;
  onClose: () => void;
  movie?: Movie
};

const CLOSED_Y = 100;
const OPEN_Y = 0;
const CLOSE_DURATION = 500;

export default function DetailsBottomSheet({
  open,
  onClose,
  movie
}: DetailsBottomSheetProps) {
  const insets = useSafeAreaInsets();
  const positionY = useRef(new Animated.Value(CLOSED_Y)).current;
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    isAnimatingRef.current = true;
    Animated.spring(positionY, {
      toValue: OPEN_Y,
      damping: 20,
      useNativeDriver: true,
    }).start(() => {
      isAnimatingRef.current = false;
    });
  }, [open]);

  const handleClose = () => {
    onClose();
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    Animated.timing(positionY, {
      toValue: CLOSED_Y,
      duration: CLOSE_DURATION,
      useNativeDriver: true,
    }).start(() => {
      isAnimatingRef.current = false;
    });
  };

  if (!open) return null;

  return (
    <Modal
      visible
      transparent
      statusBarTranslucent
      animationType="none"
      onRequestClose={() => handleClose()}
    >
      <Pressable
        style={styles.backdrop}
        onPress={() => handleClose()}
      />

      <Animated.View
        style={[
          styles.sheetContainer,
          {
            transform: [
              {
                translateY: positionY.interpolate({
                  inputRange: [OPEN_Y, CLOSED_Y],
                  outputRange: [OPEN_Y, CLOSED_Y],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <View style={[styles.sheet, { paddingBottom: 16 + insets.bottom }]}>
          <View style={styles.handle} />
          
        </View>
      </Animated.View>
    </Modal>
  );
}