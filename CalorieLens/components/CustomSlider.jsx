import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useUser } from '../context/UserContext';
import * as Haptics from 'expo-haptics';

import { calculateImperialWeight } from '../utils/calculateImperial';

const { width } = Dimensions.get('window');

const CustomSlider = ({ onWeightChange, onGoalChange }) => {
  const goals = ['Lose', 'Maintain', 'Gain'];
  const { userData } = useUser();

  const imperialWeight = calculateImperialWeight(userData.weight);

  const initialWeight = userData.unit === 'metric' ? userData.weight : imperialWeight;
  const [selectedWeight, setSelectedWeight] = useState(initialWeight);
  const [selectedGoal, setSelectedGoal] = useState(goals[1]);

  const unit = userData.unit; // 'metric' or 'imperial'
  const minWeight = unit === 'metric' ? 20 : 20 * 2.20462;
  const maxWeight = unit === 'metric' ? 300 : 300 * 2.20462;
  const step = 0.1;

  // Using useMemo to generate weights array only once unless minWeight, maxWeight, or step changes
  const weights = useMemo(() => 
    Array.from({ length: Math.floor((maxWeight - minWeight) / step) + 1 }, (_, i) => 
      (minWeight + i * step).toFixed(1)
    ), [minWeight, maxWeight, step]);

  const sliderRef = useRef(null);

  const handleScroll = useCallback((event) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / 10); 

    if (index >= 0 && index < weights.length) {
      const selected = parseFloat(weights[index]);
      setSelectedWeight(selected);
      Haptics.selectionAsync();

      if (selected > initialWeight && selectedGoal !== goals[2]) {
        setSelectedGoal(goals[2]); // Gain weight
      } else if (selected < initialWeight && selectedGoal !== goals[0]) {
        setSelectedGoal(goals[0]); // Lose weight
      } else if (selected === initialWeight && selectedGoal !== goals[1]) {
        setSelectedGoal(goals[1]); // Maintain weight
      }
    }
  }, [initialWeight, selectedGoal, weights]);

  useEffect(() => {
    onWeightChange(selectedWeight); // Pass the selected weight to the parent component
  }, [selectedWeight, onWeightChange]);

  useEffect(() => {
    onGoalChange(selectedGoal); // Pass the selected goal to the parent component
  }, [selectedGoal, onGoalChange]);

  const getItemLayout = useCallback((_, index) => ({
    length: 10,
    offset: 10 * index,
    index,
  }), []);  

  return (
    <View style={styles.container}>
      <Text style={styles.goalText}>{selectedGoal} weight</Text>
      <Text style={styles.weightText}>{selectedWeight} {unit === 'metric' ? 'kg' : 'lbs'}</Text>
      <FlatList
        data={weights}
        horizontal
        ref={sliderRef}
        contentContainerStyle={styles.ruler}
        showsHorizontalScrollIndicator={false}
        snapToInterval={10}
        decelerationRate="fast"
        onScroll={handleScroll}
        getItemLayout={getItemLayout}
        initialScrollIndex={Math.floor((selectedWeight - minWeight) / step)}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View style={styles.rulerMarkContainer}>
            <View
              style={[
                styles.rulerMark,
                parseFloat(item) % 1 === 0 ? styles.rulerMarkLarge : styles.rulerMarkSmall,
              ]}
            />
          </View>
        )}
      />
      <View style={styles.pointer} />
    </View>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  goalText: {
    fontSize: 15,
    fontWeight: '300', // Use numerical font-weight for performance
    marginBottom: 10,
  },
  weightText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  ruler: {
    paddingHorizontal: (width - 10) / 2,
  },
  rulerMarkContainer: {
    width: 10,
    alignItems: 'center',
  },
  rulerMark: {
    width: 1,
    backgroundColor: 'gray',
  },
  rulerMarkLarge: {
    height: 50,
  },
  rulerMarkSmall: {
    height: 35,
    marginTop: 15,
  },
  pointer: {
    position: 'absolute',
    height: 50,
    width: 2,
    backgroundColor: 'black',
    top: '65%',
    left: (width - 2) / 2,
  },
});


export default CustomSlider;
