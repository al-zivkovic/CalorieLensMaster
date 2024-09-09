import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import CustomBackButton from '../../components/CustomBackButton';
import { useUser } from '../../context/UserContext';

const AgeScreen = () => {
  const { userData, updateUser } = useUser();
  
  const [selectedMonth, setSelectedMonth] = useState(userData.month || 'March');
  const [selectedDay, setSelectedDay] = useState(userData.day || '3');
  const [selectedYear, setSelectedYear] = useState(userData.year || '2000');
  const [days, setDays] = useState([]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthMap = {
    'January': 1,
    'February': 2,
    'March': 3,
    'April': 4,
    'May': 5,
    'June': 6,
    'July': 7,
    'August': 8,
    'September': 9,
    'October': 10,
    'November': 11,
    'December': 12,
  };

  const years = Array.from({ length: 120 }, (_, i) => (new Date().getFullYear() - i).toString());

  useEffect(() => {
    const updateDays = () => {
      const monthNumber = monthMap[selectedMonth];
      const yearNumber = parseInt(selectedYear, 10);

      let daysInMonth = 31;

      if (monthNumber === 2) { // February
        daysInMonth = (yearNumber % 4 === 0 && (yearNumber % 100 !== 0 || yearNumber % 400 === 0)) ? 29 : 28;
      } else if ([4, 6, 9, 11].includes(monthNumber)) {
        daysInMonth = 30;
      }

      setDays(Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString()));

      // Ensure the selected day is within the range
      if (parseInt(selectedDay, 10) > daysInMonth) {
        setSelectedDay('1');
      }
    };

    updateDays();
  }, [selectedMonth, selectedYear]);

  const handleNext = () => {
    updateUser({
      month: monthMap[selectedMonth], // Convert month string to number
      day: parseInt(selectedDay, 10), // Convert day to number
      year: parseInt(selectedYear, 10), // Convert year to number
    });
    console.log('User Data:', userData);
    router.push('/biometrics');
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <CustomBackButton />
      
      <View className="mt-4">
        <Text className="text-2xl font-JakartaBold text-center mb-2">When is your birthday?</Text>
        <Text className="text-sm text-gray-500 font-Jakarta text-center mb-10">This will help us tailor your plan.</Text>
      </View>

      <View className="flex-1 justify-center">
        <View className="flex-row justify-between space-x-2">
          <View className="flex-1">
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            >
              {months.map((month) => (
                <Picker.Item key={month} label={month} value={month} />
              ))}
            </Picker>
          </View>

          <View className="flex-1">
            <Picker
              selectedValue={selectedDay}
              onValueChange={(itemValue) => setSelectedDay(itemValue)}
            >
              {days.map((day) => (
                <Picker.Item key={day} label={day} value={day} />
              ))}
            </Picker>
          </View>

          <View className="flex-1">
            <Picker
              selectedValue={selectedYear}
              onValueChange={(itemValue) => setSelectedYear(itemValue)}
            >
              {years.map((year) => (
                <Picker.Item key={year} label={year} value={year} />
              ))}
            </Picker>
          </View>
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

export default AgeScreen;
