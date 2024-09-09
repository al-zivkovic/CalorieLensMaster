import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../../components/CustomButton';
import CustomBackButton from '../../components/CustomBackButton';
import { useUser } from '../../context/UserContext';
import { router } from 'expo-router';

const BiometricsScreen = () => {
  const { userData, updateUser } = useUser();
  const [isMetric, setIsMetric] = useState(userData.unit === 'metric'); // Set based on user data or default to metric
  const [selectedHeightFeet, setSelectedHeightFeet] = useState('5');
  const [selectedHeightInches, setSelectedHeightInches] = useState('9');
  const [selectedHeightCm, setSelectedHeightCm] = useState('170');
  const [selectedWeight, setSelectedWeight] = useState('70');

  const handleUnitToggle = () => {
    setIsMetric((prevState) => !prevState);
  };

  const heightFeetOptions = Array.from({ length: 8 }, (_, i) => (i + 1).toString());
  const heightInchesOptions = Array.from({ length: 12 }, (_, i) => i.toString());
  const heightCmOptions = Array.from({ length: 220 }, (_, i) => (i + 30).toString());
  const weightOptions = Array.from({ length: 200 }, (_, i) => (i + 30).toString());

  const handleNext = () => {
    let metricHeight, metricWeight;

    if (isMetric) {
      metricHeight = parseInt(selectedHeightCm, 10);
      metricWeight = parseInt(selectedWeight, 10);
    } else {
      const totalInches = parseInt(selectedHeightFeet, 10) * 12 + parseInt(selectedHeightInches, 10);
      metricHeight = Math.round(totalInches * 2.54); // Convert inches to cm
      metricWeight = Math.round(parseInt(selectedWeight, 10) / 2.20462); // Convert lbs to kg
    }

    updateUser({
      height: metricHeight, // Store the height in cm as a number
      weight: metricWeight, // Store the weight in kg as a number
      unit: isMetric ? 'metric' : 'imperial',
    });

    router.push('/activity');
    console.log('User Data:', userData);
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <CustomBackButton />
      
      <View className="mt-4">
        <Text className="text-2xl font-JakartaBold text-center mb-2">Height & Weight</Text>
        <Text className="text-sm font-Jakarta text-gray-500 text-center mb-10">This will help us tailor your plan.</Text>

        {/* Unit Toggle */}
        <View className="flex-row justify-center items-center mb-6">
          <Text className="text-md font-JakartaMedium mr-3">Imperial</Text>
          <Switch
            value={isMetric}
            onValueChange={handleUnitToggle}
          />
          <Text className="text-md font-JakartaMedium ml-3">Metric</Text>
        </View>
      </View>

      <View className="flex-1 justify-center">
        {/* Height Picker */}
        <View className="flex-row justify-between space-x-2">
          {isMetric ? (
            <View className="flex-1">
              <Picker
                selectedValue={selectedHeightCm}
                onValueChange={(itemValue) => setSelectedHeightCm(itemValue)}
              >
                {heightCmOptions.map((cm) => (
                  <Picker.Item key={cm} label={`${cm} cm`} value={cm} />
                ))}
              </Picker>
            </View>
          ) : (
            <>
              <View className="flex-1">
                <Picker
                  selectedValue={selectedHeightFeet}
                  onValueChange={(itemValue) => setSelectedHeightFeet(itemValue)}
                >
                  {heightFeetOptions.map((feet) => (
                    <Picker.Item key={feet} label={`${feet} ft`} value={feet} />
                  ))}
                </Picker>
              </View>
              <View className="flex-1">
                <Picker
                  selectedValue={selectedHeightInches}
                  onValueChange={(itemValue) => setSelectedHeightInches(itemValue)}
                >
                  {heightInchesOptions.map((inches) => (
                    <Picker.Item key={inches} label={`${inches} in`} value={inches} />
                  ))}
                </Picker>
              </View>
            </>
          )}
        </View>

        {/* Weight Picker */}
        <View className="flex-1 mt-6">
          <Picker
            selectedValue={selectedWeight}
            onValueChange={(itemValue) => setSelectedWeight(itemValue)}
          >
            {weightOptions.map((weight) => (
              <Picker.Item key={weight} label={`${weight} ${isMetric ? 'kg' : 'lbs'}`} value={weight} />
            ))}
          </Picker>
        </View>
      </View>

      <CustomButton
        title="Next"
        handlePress={handleNext}
        containerStyles="w-full mt-7"
      />
    </SafeAreaView>
  );
};

export default BiometricsScreen;
