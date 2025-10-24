import { View, Text } from 'react-native';
import React, { Children } from 'react';
import { CustomText } from '../CustomText/CustomText';
import { ChipStyles } from './Chip.styles';

type ChipProps = {
    children: string | React.ReactNode;
}

const Chip = ({children} : ChipProps) => {
  return (
    <View style={ChipStyles.chip}>
      <CustomText style={ChipStyles.chipText}>
        {children}
      </CustomText>
    </View>
  );
};

export default Chip;
