import { SignedIn, SignedOut, useUser, useAuth } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import { Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { icons } from '../../constants';

const Home = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);
  const [dailyGoals, setDailyGoals] = useState({
    calories: 2500,
    protein: 150,
    carbs: 300,
    fats: 80,
  });

  const handleSignOut = () => {
    signOut();
    router.replace('/sign-in');
  };

  const renderMealCard = (mealName: string, iconSource: any) => (
    <View className="bg-gray-100 rounded-lg p-4 shadow-md mt-4 flex flex-row justify-between items-center">
      <View className="flex flex-row items-center">
        <Image source={iconSource} className="w-10 h-10" />
        <Text className="text-md font-JakartaSemiBold pl-3">{mealName}</Text>
      </View>
      <TouchableOpacity 
        className="bg-blue-500 rounded-lg p-2"
        onPress={() => router.push('/log')}
      >
        <Text className="text-white font-JakartaSemiBold">Log</Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const clerkId = user?.id;
        if (!clerkId) {
          console.error('Clerk ID is undefined');
          return;
        }
  
        const userResponse = await api.get(`/users/${clerkId}`);

        const userId = userResponse.data?.id;
        if (!userId) {
          console.error('User ID is undefined in the response');
          return;
        }

        // Fetch the associated user_info using the userId
        const userInfoResponse = await api.get(`/users/${userId}/user_info`);
        const { plan } = userInfoResponse.data?.user_info || {};

        if (!plan) {
          console.error('Plan data is missing from user_info');
          return;
        }

        // Update the daily goals and state with fetched plan data
        setDailyGoals({
          calories: plan.caloricIntake || 2500,
          protein: plan.macronutrients?.proteinGrams || 150,
          carbs: plan.macronutrients?.carbGrams || 300,
          fats: plan.macronutrients?.fatGrams || 80,
        });
  
      } catch (error) {
        console.error('Error fetching nutrition data: ', error);
      }
    };

    if (user?.id) {
      fetchUserInfo();
    }
  }, [user]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className='p-4' showsVerticalScrollIndicator={false}>
        <View>
          <SignedIn>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-lg font-JakartaExtraBold">
                Hello {user?.emailAddresses[0].emailAddress}
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-gray-100"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>

            {/* Nutrition Card with Circular Progress Bar and Icon Overlay */}
            <View className="bg-gray-100 rounded-lg p-4 shadow-md flex-row justify-between items-center">
              <View>
                <Text className="text-xl font-JakartaSemiBold mb-2">Today's Nutrition</Text>
                <Text className="text-2xl font-JakartaExtraBold text-gray-800">
                  {calories} / {dailyGoals.calories} kcal
                </Text>
              </View>
              <View style={{ position: 'relative', width: 100, height: 100 }}>
                <CircularProgress
                  value={calories}
                  radius={50}
                  maxValue={dailyGoals.calories}
                  activeStrokeColor={'#ff6347'}
                  inActiveStrokeColor={'#ddd'}
                  inActiveStrokeOpacity={0.2}
                  showProgressValue={false}
                />
                <Image
                  source={icons.calories} // Replace with your desired icon
                  style={{
                    width: 40,
                    height: 40,
                    position: 'absolute',
                    top: '30%', // Adjust this to center the icon
                    left: '30%',
                  }}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* Macronutrients Section */}
            <View className="bg-gray-100 rounded-lg p-4 shadow-md mt-4">
              <Text className="text-lg font-JakartaSemiBold mb-4">Macronutrients</Text>
              
              <View className='flex-row justify-between'>
                <View style={{ alignItems: 'center' }}>
                  <CircularProgress
                    value={protein}
                    radius={50}
                    maxValue={dailyGoals.protein}
                    title={'Protein'}
                    titleColor={'#4682b4'}
                    titleStyle={{ fontWeight: 'bold' }}
                    activeStrokeColor={'#4682b4'}
                    inActiveStrokeColor={'#ddd'}
                    inActiveStrokeOpacity={0.2}
                  />
                  <Text className="text-sm">{protein}g / {dailyGoals.protein}g</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <CircularProgress
                    value={carbs}
                    radius={50}
                    maxValue={dailyGoals.carbs}
                    title={'Carbs'}
                    titleColor={'#32cd32'}
                    titleStyle={{ fontWeight: 'bold' }}
                    activeStrokeColor={'#32cd32'}
                    inActiveStrokeColor={'#ddd'}
                    inActiveStrokeOpacity={0.2}
                  />
                  <Text className="text-sm">{carbs}g / {dailyGoals.carbs}g</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <CircularProgress
                    value={fats}
                    radius={50}
                    maxValue={dailyGoals.fats}
                    title={'Fats'}
                    titleColor={'#ffd700'}
                    titleStyle={{ fontWeight: 'bold' }}
                    activeStrokeColor={'#ffd700'}
                    inActiveStrokeColor={'#ddd'}
                    inActiveStrokeOpacity={0.2}
                  />
                  <Text className="text-sm">{fats}g / {dailyGoals.fats}g</Text>
                </View>
              </View>
            </View>

            <View className='p-4'>
              <Text className="text-lg font-JakartaSemiBold mt-4">Food Intake</Text>

              {renderMealCard('Breakfast', icons.breakfast)}
              {renderMealCard('Lunch', icons.breakfast)}
              {renderMealCard('Dinner', icons.breakfast)}
              {renderMealCard('Snacks', icons.breakfast)}
            </View>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
