import { Text } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const CustomBackButton = ({ customBack }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (customBack) {
          customBack(); // Use custom back function if provided
        } else {
          router.back(); // Otherwise, use default back behavior
        }
      }}
      style={{
        top: 0,
        left: 0,
        padding: 0,
        zIndex: 1,
      }}
    >
      <Text style={{ fontSize: 25 }}>←</Text>
    </TouchableOpacity>
  );
};

export default CustomBackButton;
