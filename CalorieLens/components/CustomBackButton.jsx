import { Text } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';

const CustomBackButton = ({ customBack }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (customBack) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
          customBack(); // Use custom back function if provided
        } else {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
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
      <Text style={{ color:"#FFF" ,fontSize: 30 }}>←</Text>
    </TouchableOpacity>
  );
};

export default CustomBackButton;
