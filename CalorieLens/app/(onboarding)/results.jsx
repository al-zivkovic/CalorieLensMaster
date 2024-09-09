import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';  // Import router for custom navigation

import api from '../../utils/api';

import CustomBackButton from '../../components/CustomBackButton';
import CustomButton from '../../components/CustomButton';

import { useUser } from '../../context/UserContext';

const ResultsScreen = () => {

  const { userData } = useUser();

  const plan = userData.plan;
  const { caloricIntake, macronutrients } = plan;
  const { proteinGrams, fatGrams, carbGrams } = macronutrients;

  const handleNext = async () => {
    // try {
    //   const response = await api.post('/users', { user: userData });

    //   if (response.status === 201) {
    //     console.log('User data saved successfully:', response.data);
    //     // Navigate to the next screen
    //     router.push('/sign-up');
    //   } else {
    //     console.error('Failed to save user data:', response.data);
    //   }
    // } catch (error) {
    //   console.error('Error saving user data:', error);
    // }
    console.log(userData);
    router.push('/sign-up'); // Navigate to the sign-up page instead of the next
  };

  const handleBack = () => {
    router.push('/goal-speed'); // Navigate to the goal-speed page instead of going back
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <CustomBackButton onPress={handleBack} />
      <View className="mt-4">
        <Text className="text-2xl font-JakartaBold text-center mb-2">Congratulations, your custom plan is ready!</Text>
        <Text className="text-sm font-Jakarta text-gray-500 text-center mb-10">You can now view your plan and start your journey.</Text>
      </View>

      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-JakartaBold text-center mb-2">Caloric Intake: {caloricIntake} </Text>
        <Text className="text-2xl font-JakartaBold text-center mb-2">Protein: {proteinGrams}</Text>
        <Text className="text-2xl font-JakartaBold text-center mb-2">Carbs: {carbGrams}</Text>
        <Text className="text-2xl font-JakartaBold text-center mb-2">Fats: {fatGrams}</Text>
      </View>

      <CustomButton
        title="Let's get started!"
        handlePress={handleNext}
        containerStyles="w-full mt-7"
      />
    </SafeAreaView>
  );
};

export default ResultsScreen;
