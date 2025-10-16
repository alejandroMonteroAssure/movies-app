import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { styles } from './Input.style';

interface InputProps extends TextInputProps {
  placeholder?: string;
}

export const Input = ({ placeholder, style, ...props }: InputProps) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor="#888"
      {...props}
    />
  );
};
