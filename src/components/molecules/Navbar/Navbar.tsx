import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { Genre } from '../../../services/domain/Genre';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomText } from '../../atoms/CustomText/CustomText';
import { navbarStyles } from './Navbar.styles';

type NavbarProps = {
  genres: Genre[];
  activeId?: number;
  onSelect?: (id: number) => void;
};

export default function Navbar({ genres, activeId, onSelect }: NavbarProps) {
  return (
    <View style={navbarStyles.container} pointerEvents="box-none">
      <View style={navbarStyles.containerInner}>
        <BlurView
          style={navbarStyles.blur}
          blurType="light"
          blurAmount={15}
          reducedTransparencyFallbackColor="rgba(232, 223, 223, 0.85)"
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              ...navbarStyles.scrollViewContent,
            }}
          >
            {genres.map(g => {
              const active = g.id === activeId;
              return (
                <Pressable
                  key={g.id}
                  onPress={() => onSelect?.(g.id)}
                  style={{
                    ...navbarStyles.pressable,
                    backgroundColor: active ? '#FFFFFF' : 'transparent',
                  }}
                >
                  <CustomText
                    numberOfLines={2}
                    style={{
                      color: active ? '#000' : '#FFFFFF',
                      fontWeight: active ? '500' : '400',
                      ...navbarStyles.title,
                    }}
                  >
                    {g.name}
                  </CustomText>
                </Pressable>
              );
            })}
          </ScrollView>
        </BlurView>
      </View>
    </View>
  );
}
