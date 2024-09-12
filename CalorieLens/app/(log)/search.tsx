import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import axios from 'axios';

import { USDA_API_KEY } from '@env';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const apiKey = USDA_API_KEY

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=${apiKey}`
      );
      setResults(response.data.foods);
    } catch (error) {
      console.error('Error fetching food data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to toggle the modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Function to show detailed food info
  const showFoodDetails = (food) => {
    setSelectedFood(food);
    toggleModal();
  };

  return (
    <View className="flex-1 p-5">
      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-3"
        placeholder="Search for food..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />

      {loading && <Text className="text-center mt-3">Loading...</Text>}

      {!loading && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.fdcId.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => showFoodDetails(item)}>
              <View className="p-3 border-b border-gray-200">
                <Text className="text-lg font-bold">{item.description}</Text>
                <Text className="text-gray-600">
                  Calories: {item.foodNutrients.find(nutrient => nutrient.nutrientId === 1008)?.value || 'N/A'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Modal for showing detailed food info */}
      <ReactNativeModal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View className="bg-white p-6 rounded-t-xl">
          {selectedFood && (
            <>
              <Text className="text-lg font-bold mb-2">{selectedFood.description}</Text>
              <Text className="text-gray-600 mb-2">Brand: {selectedFood.brandOwner || 'N/A'}</Text>

              {/* Macros information */}
              <Text className="text-sm">
                Calories: {selectedFood.foodNutrients.find(nutrient => nutrient.nutrientId === 1008)?.value || 'N/A'}
              </Text>
              <Text className="text-sm">
                Protein: {selectedFood.foodNutrients.find(nutrient => nutrient.nutrientId === 1003)?.value || 'N/A'}g
              </Text>
              <Text className="text-sm">
                Carbs: {selectedFood.foodNutrients.find(nutrient => nutrient.nutrientId === 1005)?.value || 'N/A'}g
              </Text>
              <Text className="text-sm">
                Fats: {selectedFood.foodNutrients.find(nutrient => nutrient.nutrientId === 1004)?.value || 'N/A'}g
              </Text>

              {/* Buttons at the bottom */}
              <View className="flex-row justify-between mt-5">
                <TouchableOpacity
                  className="bg-red-500 rounded-lg p-3 w-[45%] items-center"
                  onPress={toggleModal}
                >
                  <Text className="text-white">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-green-500 rounded-lg p-3 w-[45%] items-center"
                  onPress={() => {
                    // Handle add action here
                    toggleModal();
                  }}
                >
                  <Text className="text-white">Add</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default Search;
