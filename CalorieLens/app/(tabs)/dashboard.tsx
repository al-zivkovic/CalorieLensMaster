import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState, useRef } from 'react';
import { Link, router } from 'expo-router';
import { Text, TouchableOpacity, View, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CircularProgress from 'react-native-circular-progress-indicator';
import ReactNativeModal from 'react-native-modal';  // Import react-native-modal
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../utils/api';
import CustomLogButton from '../../components/CustomLogButton';
import { icons } from '../../constants';

const Dashboard = () => {
  const { user } = useUser();
  const scrollY = useRef(new Animated.Value(0)).current;

  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);  // State for modal visibility
  const [mealName, setMealName] = useState('');  // State to track which meal is selected

  const [dailyGoals, setDailyGoals] = useState({
    calories: 2500,
    protein: 150,
    carbs: 300,
    fats: 80,
  });

  const todaysDate = format(new Date(), 'MMMM dd, yyyy');

  // Function to toggle modal visibility and set the selected meal name
  const toggleModal = (meal?: string) => {
    if (meal) {
      setMealName(meal);
    }
    setModalVisible(!isModalVisible);
  };

  // Function to handle button click and close modal before navigating
  const handleNavigation = (path: string) => {
    toggleModal();  // Close the modal
    router.push(path);  // Navigate to the specified path
  };

  const renderMealCard = (mealName: string, iconSource: any) => (
    <View className="bg-tertiary rounded-lg p-4 shadow-md mt-4 flex flex-row justify-between items-center">
      <View className="flex flex-row items-center">
        <Icon name={iconSource} size={35} color="#FFF" />
        <Text className="text-md text-white font-JakartaSemiBold pl-3">{mealName}</Text>
      </View>
      <TouchableOpacity 
        className="bg-secondary rounded-xl p-3 pl-5 pr-5"
        onPress={() => toggleModal(mealName)}  // Open modal on press
      >
        <Text className="text-white font-JakartaSemiBold">Log</Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        const clerk_id = user?.id;
        if (!clerk_id) {
          console.error('Clerk ID is undefined');
          return;
        }
  
        // Fetch the user information from the backend
        const userResponse = await api.get(`/users/${clerk_id}`);
        const userId = userResponse.data?.id;
        if (!userId) {
          console.error('User ID is undefined in the response');
          return;
        }
  
        // Fetch associated user preferences using the user_id
        const userPreferencesResponse = await api.get(`/user_preferences?user_id=${userId}`);
        console.log('User Preferences Response:', userPreferencesResponse.data); // Log the response
        const userPreferences = userPreferencesResponse.data;
  
        if (!userPreferences || userPreferences.length === 0) {
          console.error('User Preferences data is missing or empty');
          return;
        }
  
        const userPlanId = userPreferences.plan_id; // Access the first element's user_plan_id
        if (!userPlanId) {
          console.error('user_plan_id is missing from user preferences');
          return;
        }
  
        // Fetch the user plan using the user_plan_id
        const planResponse = await api.get(`/user_plan/${userPlanId}`);
        const plan = planResponse.data;
  
        if (!plan) {
          console.error('Plan data is missing');
          return;
        }
  
        // Update the daily goals state with the fetched plan data
        setDailyGoals({
          calories: plan.caloric_intake || 2500,
          protein: plan.protein || 150,
          carbs: plan.carbs || 300,
          fats: plan.fat || 80,
        });
      } catch (error) {
        console.error('Error fetching nutrition data:', error);
      }
    };
  
    if (user?.id) {
      fetchUserPlan();
    }
  }, [user]);

  // Animated values for the header
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100], // Adjust the 100 based on how much scroll you want to trigger the change
    outputRange: [80, 50], // Height transitions from 80 to 50 pixels
    extrapolate: 'clamp',
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1], // The opacity of the title goes from 0 to 1
    extrapolate: 'clamp',
  });

  const dateFontSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [18, 12], // Date font size transitions from 18 to 14 pixels
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView className="flex-1 bg-primary"
      edges={['top']}  // Ensure no padding or margin at the top
    >
      <Animated.View style={{
        height: headerHeight,
        backgroundColor: '#121212',
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderBottomColor: '#444',
        borderBottomWidth: 0
      }}>
        <Animated.Text style={{
          position: 'absolute',
          left: 16,
          color: 'white',
          fontSize: dateFontSize,
          fontWeight: 'bold',
        }}>
          {todaysDate}
        </Animated.Text>
        <Animated.Text style={{
          textAlign: 'center',
          color: 'white',
          fontSize: 24,
          fontWeight: 'bold',
          opacity: titleOpacity,
        }}>
          CalorieLens
        </Animated.Text>
      </Animated.View>
      {/* Ensuring no padding or margin at the top */}
      <Animated.ScrollView
        className="p-4"
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } // Ensure useNativeDriver is set to false for non-layout properties
        )}
        scrollEventThrottle={16} // Ensures smooth and responsive scrolling
      >
        <View>
          <SignedIn>
            {/* Nutrition Card with Circular Progress Bar and Icon Overlay */}
            <View className="bg-tertiary rounded-lg p-4 shadow-md flex-column justify-between">
              <View>
                <Text className="text-xl text-white font-JakartaBold mb-5">Calories</Text>
              </View>
              <View className='flex-row justify-around'>
                <View style={{ position: 'relative', width: 150, height: 150 }}>
                  <CircularProgress
                    value={calories}
                    radius={70}
                    maxValue={dailyGoals.calories}
                    title={'cal'}
                    titleColor={'#10D29A'}
                    titleStyle={{ fontWeight: 'bold' }}
                    activeStrokeColor={'#10D29A'}
                    inActiveStrokeColor={'#ddd'}
                    inActiveStrokeOpacity={0.2}
                  />
                </View>
                <View className='flex-column items-start'>
                  <Text className="text-lg text-white font-JakartaSemiBold ml-5 mb-1">Daily Goal:</Text>
                  <Text className="text-lg text-white font-JakartaExtraBold ml-5">{dailyGoals.calories}</Text>
                </View>
              </View>
            </View>

            {/* Macronutrients Section */}
            <View className="bg-tertiary rounded-lg p-4 shadow-md mt-4">
              <Text className="text-lg text-white font-JakartaBold mb-4">Macronutrients</Text>
              
              <View className="flex-row justify-between">
                <View style={{ alignItems: 'center' }}>
                  <CircularProgress
                    value={protein}
                    radius={50}
                    maxValue={dailyGoals.protein}
                    title={'Protein'}
                    titleColor={'#10D29A'}
                    titleStyle={{ fontWeight: 'bold' }}
                    activeStrokeColor={'#10D29A'}
                    inActiveStrokeColor={'#ddd'}
                    inActiveStrokeOpacity={0.2}
                  />
                  <View className='flex-row pt-4'>
                    <Text className="text-sm text-white font-JakartaBold">{protein}</Text> 
                    <Text className='text-sm text-white font-Jakarta'> / {dailyGoals.protein}g</Text>
                  </View>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <CircularProgress
                    value={carbs}
                    radius={50}
                    maxValue={dailyGoals.carbs}
                    title={'Carbs'}
                    titleColor={'#10D29A'}
                    titleStyle={{ fontWeight: 'bold' }}
                    activeStrokeColor={'#10D29A'}
                    inActiveStrokeColor={'#ddd'}
                    inActiveStrokeOpacity={0.2}
                  />
                  <View className='flex-row pt-4'>
                    <Text className="text-sm text-white font-JakartaBold">{carbs}</Text> 
                    <Text className='text-sm text-white font-Jakarta'> / {dailyGoals.carbs}g</Text>
                  </View>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <CircularProgress
                    value={fats}
                    radius={50}
                    maxValue={dailyGoals.fats}
                    title={'Fats'}
                    titleColor={'#10D29A'}
                    titleStyle={{ fontWeight: 'bold' }}
                    activeStrokeColor={'#10D29A'}
                    inActiveStrokeColor={'#ddd'}
                    inActiveStrokeOpacity={0.2}
                  />
                 <View className='flex-row pt-4'>
                    <Text className="text-sm text-white font-JakartaBold">{fats}</Text> 
                    <Text className='text-sm text-white font-Jakarta'> / {dailyGoals.fats}g</Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="p-4">
              <Text className="text-lg text-white font-JakartaSemiBold mt-4">Food Intake</Text>

              {renderMealCard('Breakfast', 'food-apple')}
              {renderMealCard('Lunch', 'food')}
              {renderMealCard('Dinner', 'food-turkey')}
              {renderMealCard('Snacks', 'food-variant')}
            </View>

            <View className="p-4 pb-20">
              <Text className='text-lg text-white font-JakartaSemiBold'>Exercise Burn</Text>
              {renderMealCard('Exercise', 'dumbbell')}
            </View>

            {/* Modal */}
            <ReactNativeModal
              isVisible={isModalVisible}
              onBackdropPress={() => toggleModal()}  // Close modal on tap outside
              swipeDirection="down"  // Enable swipe down to close
              onSwipeComplete={() => toggleModal()} // Ensure no event object is passed
              style={{ justifyContent: 'flex-end', margin: 0 }}
            >
              <View className="bg-primary p-4 pb-20 rounded-t-xl">
                <Text className="text-lg text-white font-JakartaExtraBold text-center mb-10">
                  Log {mealName}
                </Text>

                {/* Container for the buttons */}
                <View className="flex-row justify-between">
                  <CustomLogButton
                    title="Barcode"
                    Icon={icons.barcode}
                    onPress={() => handleNavigation('/barcode-scan')}
                    className="mx-2"
                  />
                  <CustomLogButton
                    title="Search"
                    Icon={icons.search}
                    onPress={() => handleNavigation('/search')}
                    className="mx-2"
                  />
                  <CustomLogButton
                    title="AI Analyze"
                    Icon={icons.camera}
                    onPress={() => handleNavigation('/ai-analyze')}
                    className="mx-2"
                  />
                </View>
              </View>
            </ReactNativeModal>

          </SignedIn>

          <SignedOut>
            <Link href="/sign-in">
              <Text>Sign In</Text>
            </Link>
            <Link href="/sign-up">
              <Text>Sign Up</Text>
            </Link>
          </SignedOut>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
