import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure you have this installed
import { LineChart } from 'react-native-chart-kit'; // Import the LineChart component
import { router } from 'expo-router';

import api from '../../utils/api';

const screenWidth = Dimensions.get('window').width; // Get screen width for the chart

const Profile = () => {
  const { user } = useUser();
  const [currentWeight, setCurrentWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [currentBMI, setCurrentBMI] = useState('');
  const [name, setName] = useState('');
  const [weightData, setWeightData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Example labels for days
    datasets: [
      {
        data: [80, 79.5, 79.2, 79, 78.8, 78.6, 78.4], // Example weight data for the week
      },
    ],
  });

  useEffect(() => {
    const fetchUser = async () => {
      const clerk_id = user?.id;
      const userRes = await api.get(`/users/${clerk_id}`);
      const userId = userRes.data.id;
      const userPreferencesRes = await api.get(`/user_preferences?user_id=${userId}`);
      const userPreferencesData = userPreferencesRes.data;
      const userData = userRes.data;

      if (userRes.status === 200 && userPreferencesRes.status === 200) {
        console.log('User data and preferences fetched successfully');
      }
      else {
        console.log("Error fetching user data");
      }

      setCurrentWeight(userPreferencesData.weight);
      setGoalWeight(userPreferencesData.goal_weight);
      setName(userData.name);

      const calculatedBMI = (userPreferencesData.weight / (userPreferencesData.height * userPreferencesData.height)) * 10000;
      setCurrentBMI(calculatedBMI.toFixed(1));

      // Example of updating weight data with real user data from API (replace this logic with actual weight data)
      const weightHistory = userPreferencesData.weight_history || [
        { date: 'Mon', weight: 80 },
        { date: 'Tue', weight: 79.5 },
        { date: 'Wed', weight: 79.2 },
        { date: 'Thu', weight: 79 },
        { date: 'Fri', weight: 78.8 },
        { date: 'Sat', weight: 78.6 },
        { date: 'Sun', weight: 78.4 }
      ];

      const labels = weightHistory.map(item => item.date);
      const data = weightHistory.map(item => item.weight);

      setWeightData({
        labels,
        datasets: [
          {
            data,
          },
        ],
      });
    }

    if (user) {
      fetchUser();
    }
  }, [user]);

  return (
    <SafeAreaView className="flex-1 bg-primary">
      {/* Header with Profile Name and Settings Icon */}
      <View className="p-5 flex-row justify-between items-center bg-primary">
        <View className="flex-row items-center">
          <Icon name="user-circle" color="#FFF" size={24} />
          <Text className="text-2xl ml-4 font-bold text-white">{name || 'User'}</Text>
          <TouchableOpacity onPress={() => console.log('Edit Profile')} className="ml-2">
            <Icon name="pencil" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => router.push('settings')}>
          <Icon name="cog" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Current Weight, Goal Weight, and BMI Section */}
        <View className="flex-row justify-around bg-tertiary rounded-lg p-4 mb-4">
          <View className="items-center">
            <Text className="text-white text-lg font-bold">{currentWeight}kg</Text>
            <Text className="text-gray-300 text-xs">Current weight</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-lg font-bold">{goalWeight}kg</Text>
            <Text className="text-gray-300 text-xs">Goal weight</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-lg font-bold">{currentBMI}</Text>
            <Text className="text-gray-300 text-xs">Current BMI</Text>
          </View>
        </View>

        {/* Subscription / Membership Section */}
        <View className="bg-tertiary rounded-lg p-4 mb-4 shadow-sm flex-row justify-between items-center">
          <Text className="text-lg text-white font-bold">Try Premium for Free</Text>
          <TouchableOpacity className="px-4 py-2 bg-secondary rounded-md">
            <Text className="text-white font-semibold">Get Now</Text>
          </TouchableOpacity>
        </View>

        {/* Help & Feedback Section */}
        <View className="bg-tertiary rounded-lg p-4 mb-4 shadow-sm flex-row justify-between items-center">
          <Text className="text-lg font-bold text-white">Help & Feedback</Text>
          <TouchableOpacity onPress={() => console.log('Help & Feedback')}>
            <Icon name="question-circle" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Weight Tracker Section with Graph */}
        <View className="mt-4">
          <Text className="text-xl font-bold text-white mb-2">Weight Tracker</Text>
          <View className="bg-tertiary rounded-lg p-4 shadow-sm">
            <LineChart
              data={weightData}
              width={screenWidth - 40} // Width of the chart
              height={220} // Height of the chart
              yAxisSuffix="kg"
              chartConfig={{
                backgroundColor: '#000',
                backgroundGradientFrom: '#1E2923',
                backgroundGradientTo: '#08130D',
                decimalPlaces: 1, // Optional, defaults to 2dp
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, // Line color
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Label color
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profile;
