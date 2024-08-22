import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

import CustomButton from '../../components/CustomButton';
import CustomBackButton from '../../components/CustomBackButton';

import { useUser } from '../../context/UserContext';

const GoalScreen = () => {
  const { userData, updateUser } = useUser();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    Haptics.selectionAsync();
    setSelectedOption(option);
    updateUser({ goal: option });
  };

  const handleNext = () => {
    if (selectedOption === 'Maintain') {
      router.push('/loading-results');
    } else if (selectedOption) {
      router.push('/goal-weight');
    }
    console.log('User Data:', userData);
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <CustomBackButton />
      
      <View className="mt-4">
        <Text className="text-2xl font-bold text-center mb-2">What is your fitness goal?</Text>
        <Text className="text-sm text-gray-500 text-center mb-10">Choose a goal to personalize your plan.</Text>
      </View>

      <View className="flex-1 justify-center">
        <View className="space-y-4">
          <TouchableOpacity 
            className={`p-5 rounded-2xl ${selectedOption === 'Lose' ? 'bg-green-300' : 'bg-gray-100'}`}
            onPress={() => handleOptionSelect('Lose')}
          >
            <Text className="text-md font-medium">Lose weight</Text>
            <Text className="text-xs mt-1 text-gray-500">I want to lose fat and slim down</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`p-5 rounded-2xl ${selectedOption === 'Maintain' ? 'bg-green-300' : 'bg-gray-100'}`}
            onPress={() => handleOptionSelect('Maintain')}
          >
            <Text className="text-md font-medium">Maintain weight</Text>
            <Text className="text-xs mt-1 text-gray-500">I am happy with my current weight</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`p-5 rounded-2xl ${selectedOption === 'Gain' ? 'bg-green-300' : 'bg-gray-100'}`}
            onPress={() => handleOptionSelect('Gain')}
          >
            <Text className="text-md font-medium">Gain weight</Text>
            <Text className="text-xs mt-1 text-gray-500">I want to build muscle and gain mass</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomButton
        title="Next"
        handlePress={handleNext}
        containerStyles={`w-full mt-7 ${!selectedOption ? 'opacity-50' : ''}`}
        disabled={!selectedOption}
      />
    </SafeAreaView>
  );
};

export default GoalScreen;
