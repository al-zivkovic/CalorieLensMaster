import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import * as Haptics from 'expo-haptics';

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  const onPressWithHaptics = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (handlePress) {
      handlePress();
    }
  }

  return (
    <TouchableOpacity 
        onPress={onPressWithHaptics}
        activeOpacity={0.7}
        className={`bg-secondary rounded-full shadow-md shadow-neutral-400/70 min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}
    >
    <Text className={`text-primary font-semibold text-lg ${textStyles}`}>
        {title}
    </Text>
    </TouchableOpacity>
  )
}

export default CustomButton