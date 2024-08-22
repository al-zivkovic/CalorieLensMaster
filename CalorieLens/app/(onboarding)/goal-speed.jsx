import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';

import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

import CustomBackButton from '../../components/CustomBackButton';
import CustomButton from '../../components/CustomButton';
import { useUser } from '../../context/UserContext';

const Goal_speedScreen = () => {
  const { userData, updateUser } = useUser();
  const [goal_speed, setGoal_speed] = useState(1); // Initial value

  const unit = userData.unit; // 'metric' or 'imperial'
  const goal = userData.goal; // 'Lose weight' or 'Gain weight'
  const minValue = unit === 'metric' ? 0.1 : 0.2;
  const maxValue = unit === 'metric' ? 1 : 2;
  const midValue = (minValue + maxValue) / 2;
  const stepValue = unit === 'metric' ? 0.1 : 0.1;

  const handleNext = () => {
    updateUser({ goal_speed });
    console.log('User Data:', userData);
    router.push('/loading-results');
  };

  const handleSliderChange = (value) => {
    setGoal_speed(value);
    Haptics.selectionAsync(); // Trigger haptic feedback on slider movement
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <CustomBackButton />

      <View className="mt-4">
        <Text className="text-2xl font-bold text-center mb-2">How fast do you want to achieve your goal?</Text>
        <Text className="text-sm text-gray-500 text-center mb-10">Choose a speed to personalize your plan.</Text>
      </View>

      <View className="flex-1 justify-center">
        <Text className="text-lg font-bold text-center mb-4">{goal} {goal_speed.toFixed(1)} {unit === 'metric' ? 'kg per week' : 'lbs per week'}</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={minValue}
          maximumValue={maxValue}
          step={stepValue}
          value={goal_speed}
          onValueChange={handleSliderChange}
          minimumTrackTintColor="#1FB28A"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#fff"
        />
        <View className="flex-row justify-between px-4">
          <Text className="text-sm text-gray-500">{minValue} {unit === 'metric' ? 'kg' : 'lbs'}</Text>
          {/* <Text className="text-sm text-gray-500">{midValue.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}</Text> */}
          <Text className="text-sm text-gray-500">{maxValue} {unit === 'metric' ? 'kg' : 'lbs'}</Text>
        </View>
      </View>

      <CustomButton 
        title="Next"
        containerStyles="w-full mt-7"
        handlePress={handleNext}
      />
    </SafeAreaView>
  );
};

export default Goal_speedScreen;
