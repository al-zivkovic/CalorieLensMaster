import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

import CustomButton from '../../components/CustomButton';
import CustomBackButton from '../../components/CustomBackButton';
import { useUser } from '../../context/UserContext';

const GenderScreen = () => {
  const { userData, updateUser } = useUser();
  const [selectedGender, setSelectedGender] = React.useState(userData.gender || null);

  const handleGenderSelect = (gender) => {
    Haptics.selectionAsync();
    setSelectedGender(gender);
    updateUser({ gender });
  };

  const handleNext = () => {
    if (selectedGender) {
      router.push('/age');
      console.log('User Data:', userData);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <CustomBackButton />

      <View className="mt-4">
        <Text className="text-2xl font-bold text-center mb-2">What is your gender?</Text>
        <Text className="text-sm text-gray-500 text-center mb-10">We ask for your gender to help tailor your plan based on physiological differences.</Text>
      </View>

      <View className="flex-1 justify-center">
        <View className="space-y-4">
          <TouchableOpacity
            className={`p-5 rounded-2xl ${selectedGender === 'Male' ? 'bg-green-300' : 'bg-gray-200'}`}
            onPress={() => handleGenderSelect('Male')}
          >
            <Text className="text-md text-center font-medium">Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`p-5 rounded-2xl ${selectedGender === 'Female' ? 'bg-green-300' : 'bg-gray-200'}`}
            onPress={() => handleGenderSelect('Female')}
          >
            <Text className="text-md text-center font-medium">Female</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomButton
        title="Next"
        handlePress={handleNext}
        containerStyles={`w-full mt-7 ${!selectedGender ? 'opacity-50' : ''}`}
        disabled={!selectedGender}
      />
    </SafeAreaView>
  );
};

export default GenderScreen;
