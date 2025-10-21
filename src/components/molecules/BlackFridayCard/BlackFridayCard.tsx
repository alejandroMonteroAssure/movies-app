import React from 'react';
import { View, ImageBackground } from 'react-native';
import { CustomText } from '../../atoms/CustomText/CustomText';
import { Button } from '../../atoms/Button/Button';
import { styles } from './styles';
import { useTheme } from '../../../context/ThemeContext';

interface BlackFridayCardProps {
  onCheckDetails: () => void;
}

export const BlackFridayCard = ({ onCheckDetails }: BlackFridayCardProps) => {
  const { theme } = useTheme();
  const cardColor = (theme === 'dark' ? '#000000': '#ffffff');
  const secondaryCardColor = (theme === 'dark' ? '#1a1a1a': '#ffffff');

  return (
    <View style={[styles.container, { backgroundColor: cardColor }]}>
      <ImageBackground
        source={require('../../../../assets/images/blackfriday.jpg')}
        style={styles.imageBackground}
        imageStyle={styles.image}
      ></ImageBackground>

      <View style={[styles.bottomSection, {backgroundColor: secondaryCardColor}]}>
        <CustomText variant="subtitle" style={styles.title}>
          Black friday is here!
        </CustomText>

        <CustomText variant="body" style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.{'\n'}
          Viverra socils pulvinar auctor nibh nibh iaculis id.
        </CustomText>

        <Button
          title="Check details"
          onPress={onCheckDetails}
          variant="primary"
        />
      </View>
    </View>
  );
};
