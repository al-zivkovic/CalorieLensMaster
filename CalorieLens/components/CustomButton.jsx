import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import * as Haptics from 'expo-haptics';

const CustomButton = ({ 
    title,
    handlePress,
    containerStyles,
    textStyles,
    isLoading 
  }) => {
  const onPressWithHaptics = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    if (handlePress) {
      handlePress();
    }
  }

  return (
    <TouchableOpacity 
        onPress={onPressWithHaptics}
        activeOpacity={0.7}
        className={`bg-secondary rounded-full min-h-[50px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}
    >
    <Text className={`text-white font-JakartaSemiBold text-lg ${textStyles}`}>
        {title}
    </Text>
    </TouchableOpacity>
  )
}

export default CustomButton