import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import CustomBackButton from '../../components/CustomBackButton';
import CustomButton from '../../components/CustomButton';
import CustomSlider from '../../components/CustomSlider';

import { useUser } from '../../context/UserContext';

const goal_weightScreen = () => {
  const { userData, updateUser } = useUser();
  const [goal_weight, setgoal_weight] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleWeightChange = (weight) => {
    setgoal_weight(weight);
  };

  const handleGoalChange = (goal) => {
    setSelectedGoal(goal);
  }

  // make sure if the unit is in imperial we convert the weight to metric before we store it in the user context
  if (userData.unit === 'imperial') {
    // round to nearest 10th
    goal_weightMetric = Math.round(goal_weight / 2.20462 * 10) / 10;
  } else {
    goal_weightMetric = goal_weight;
  }

  const handleNext = () => {
    updateUser({ goal: selectedGoal });
    updateUser({ goal_weight: goal_weightMetric });
    router.push('/goal-speed');
    console.log('User Data:', userData);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">

      <View className="pl-4 pt-4">
        <CustomBackButton />
      </View>

      <View className="mt-4">
        <Text className="text-2xl font-bold text-center mb-2">What is your goal weight?</Text>
        <Text className="text-sm text-gray-500 text-center mb-10">Choose a goal weight to personalize your plan.</Text>
      </View>
    
      <View className="flex-1 justify-center pb-16">
        <CustomSlider onWeightChange={handleWeightChange} onGoalChange={handleGoalChange}/>
      </View>

      <View className="p-4">
        <CustomButton 
          title="Next"
          containerStyles="w-full"
          handlePress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
};

export default goal_weightScreen;
