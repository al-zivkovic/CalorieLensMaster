import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { generatePlan } from '../../utils/calculatePlan';
import { useUser } from '../../context/UserContext';

const LoadingResultsScreen = () => {
  const { userData, updateUser } = useUser();

  useEffect(() => {
    let isMounted = true;

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const calculateAndNavigate = async () => {
      const plan = generatePlan(userData);

      // Wait for 5 seconds before navigating, if still mounted
      await delay(5000);

      if (isMounted) {
        updateUser({ plan });
        console.log(userData);
        router.replace('/results');
      }
    };

    calculateAndNavigate();

    // Cleanup function to set isMounted to false
    return () => {
      isMounted = false;
    };
  }, [userData, updateUser]);

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-JakartaBold text-center mb-2">
          Creating your custom plan...
        </Text>
        <ActivityIndicator size="large" color="#1FB28A" />
      </View>
    </SafeAreaView>
  );
};

export default LoadingResultsScreen;
