import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars'; // Import the Calendar component

const Journal = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  });

  // Sample data representing meals for specific dates (replace this with your API calls)
  const mealData = {
    "2024-10-01": {
      breakfast: ["Omelet", "Toast"],
      lunch: ["Chicken Salad"],
      dinner: ["Grilled Salmon", "Rice", "Vegetables"],
      snacks: ["Apple", "Protein Bar"]
    },
    "2024-10-02": {
      breakfast: ["Pancakes"],
      lunch: ["Turkey Sandwich"],
      dinner: ["Steak", "Mashed Potatoes"],
      snacks: ["Yogurt"]
    }
    // Add more dates and meals here
  };

  // Load meals for the selected date
  useEffect(() => {
    if (selectedDate) {
      const mealsForTheDay = mealData[selectedDate] || {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
      };
      setMeals(mealsForTheDay);
    }
  }, [selectedDate]);

  return (
    <SafeAreaView className='bg-primary flex-1 p-4'>
      {/* Calendar Component */}
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString); // Set the selected date when a date is pressed
        }}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#10D29A' } // Highlight the selected date
        }}
        theme={{
          backgroundColor: '#000', // Background color of the calendar
          calendarBackground: '#000', // Calendar background
          textSectionTitleColor: '#FFF', // Month title color
          dayTextColor: '#FFF', // Day text color
          selectedDayBackgroundColor: '#10D29A', // Selected day background
          selectedDayTextColor: '#FFF', // Selected day text color
          todayTextColor: '#ff6347', // Today's date color
          arrowColor: '#FFF', // Arrow color
          monthTextColor: '#FFF' // Month title color
        }}
        style={{ marginBottom: 20 }}
      />

      {/* Display meals for the selected date */}
      <View className="bg-tertiary p-4 rounded-lg shadow-md">
        <Text className="text-xl text-white font-bold mb-2">Meals for {selectedDate || "the day"}</Text>
        
        {/* Display meals */}
        <ScrollView>
          <View className="mb-2">
            <Text className="text-lg text-white font-semibold">Breakfast</Text>
            {meals.breakfast.length > 0 ? (
              meals.breakfast.map((item, index) => (
                <Text key={index} className="text-white">{item}</Text>
              ))
            ) : (
              <Text className="text-gray-400">No data available</Text>
            )}
          </View>

          <View className="mb-2">
            <Text className="text-lg text-white font-semibold">Lunch</Text>
            {meals.lunch.length > 0 ? (
              meals.lunch.map((item, index) => (
                <Text key={index} className="text-white">{item}</Text>
              ))
            ) : (
              <Text className="text-gray-400">No data available</Text>
            )}
          </View>

          <View className="mb-2">
            <Text className="text-lg text-white font-semibold">Dinner</Text>
            {meals.dinner.length > 0 ? (
              meals.dinner.map((item, index) => (
                <Text key={index} className="text-white">{item}</Text>
              ))
            ) : (
              <Text className="text-gray-400">No data available</Text>
            )}
          </View>

          <View className="mb-2">
            <Text className="text-lg text-white font-semibold">Snacks</Text>
            {meals.snacks.length > 0 ? (
              meals.snacks.map((item, index) => (
                <Text key={index} className="text-white">{item}</Text>
              ))
            ) : (
              <Text className="text-gray-400">No data available</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Journal;
