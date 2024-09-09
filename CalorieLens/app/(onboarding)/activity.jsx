import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

import CustomButton from '../../components/CustomButton';
import CustomBackButton from '../../components/CustomBackButton';

import { useUser } from '../../context/UserContext';

import { icons } from '../../constants';

const ActivityScreen = () => {
  const { userData, updateUser } = useUser();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    Haptics.selectionAsync();
    setSelectedOption(option);
    updateUser({ activity: option });
  };

  const handleNext = () => {
    if (selectedOption) {
      router.push('/goal'); 
      console.log('User Data:', userData);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <CustomBackButton />
      
      {/* Title and Subtitle */}
      <View className="mt-4">
        <Text className="text-2xl font-JakartaBold text-center mb-2">How often do you exercise?</Text>
        <Text className="text-sm font-Jakarta text-gray-500 text-center mb-10">This will help us tailor your plan.</Text>
      </View>

      {/* Content Area - Center the Options */}
      <View className="flex-1 justify-center">
        <View className="space-y-4">
          <TouchableOpacity 
            className={`p-5 flex-row items-center rounded-2xl ${selectedOption === 'Sedentary' ? 'bg-green-300' : 'bg-gray-100'}`}
            onPress={() => handleOptionSelect('Sedentary')}
          >
            <Image 
              source={icons.lowbattery}
              style={{ width: 30, height: 30, marginRight: 20 }}
            />
            <View>
              <Text className="text-md font-JakartaMedium">Sedentary</Text>
              <Text className="text-xs font-Jakarta mt-1 text-gray-500">I spend most of my day sitting</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className={`p-5 flex-row items-center rounded-2xl ${selectedOption === 'Lightly active' ? 'bg-green-300' : 'bg-gray-100'}`}
            onPress={() => handleOptionSelect('Lightly active')}
          >
            <Image 
              source={icons.halfbattery}
              style={{ width: 30, height: 30, marginRight: 20 }}
            />
            <View>
              <Text className="text-md font-JakartaMedium">Lightly active</Text>
              <Text className="text-xs font-Jakarta mt-1 text-gray-500">I exercise 1-3 times a week</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className={`p-5 flex-row items-center rounded-2xl ${selectedOption === 'Moderately active' ? 'bg-green-300' : 'bg-gray-100'}`}
            onPress={() => handleOptionSelect('Moderately active')}
          >
            <Image 
              source={icons.battery}
              style={{ width: 30, height: 30, marginRight: 20 }}
            />
            <View>
              <Text className="text-md font-JakartaMedium">Moderately active</Text>
              <Text className="text-xs font-Jakarta mt-1 text-gray-500">I exercise 3-5 times a week</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className={`p-5 flex-row items-center rounded-2xl ${selectedOption === 'Very active' ? 'bg-green-300' : 'bg-gray-100'}`}
            onPress={() => handleOptionSelect('Very active')}
          >
            <Image 
              source={icons.fullbattery}
              style={{ width: 30, height: 30, marginRight: 20 }}
            />
            <View>
              <Text className="text-md font-JakartaMedium">Very active</Text>
              <Text className="text-xs font-Jakarta mt-1 text-gray-500">I exercise intensly 6-7 times a week</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Next Button */}
      <CustomButton
        title="Next"
        handlePress={handleNext}
        containerStyles={`w-full mt-7 ${!selectedOption ? 'opacity-50' : ''}`}
        disabled={!selectedOption} // Disable button if no option is selected
      />
    </SafeAreaView>
  );
};

export default ActivityScreen;
