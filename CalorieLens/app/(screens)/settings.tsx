import { useUser, useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from '../../utils/api';

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [unit, setUnit] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [goal, setGoal] = useState('');

  const handleSignOut = () => {
    signOut();
    router.replace('/sign-in');
  };
  
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

      setName(userData.name);
      setEmail(userData.email);
      setGender(userData.gender);
      setBirthday(userData.birthday);
      setUnit(userPreferencesData.unit);
      setHeight(userPreferencesData.height);
      setWeight(userPreferencesData.weight);
      setActivityLevel(userPreferencesData.activity);
      setGoal(userPreferencesData.goal);      
    };

    if (user) {
      fetchUser();
    }
  }, [user]);

  const renderRow = (label: any, value: any) => (
    <View className="flex-row justify-between py-3">
        <Text className="text-base text-white">{label}</Text>
        <TouchableOpacity className='flex-row items-center'>
          <Text className={`text-base text-white font-semibold`}>{value}</Text>
          <Icon name="angle-right" color="#FFF" size={16} style={{marginLeft: 8}} />
        </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView edges={['left', 'right']}className="flex-1 bg-primary">
      <ScrollView className="px-4" contentContainerStyle={{ paddingBottom: 70 }}>
        <View className="py-4">
          <Text className="text-lg font-bold text-white mb-4">Profile</Text>
          {renderRow('Birthday', birthday)}
          {renderRow('Gender', gender)}
          {renderRow('Height', `${height} ${unit === 'metric' ? 'cm' : 'in'}`)}
          {renderRow('Weight', `${weight} ${unit === 'metric' ? 'kg' : 'lbs'}`)}
          {renderRow('Email', email)}
          {renderRow('Units', unit === 'metric' ? 'kg, cm' : 'lbs, ft/in')}
          {renderRow('Goal Weight', `${goal} weight`)}
        </View>

        <View className="py-4">
          <Text className="text-lg text-white font-bold mb-4">Membership</Text>
          {renderRow('Subscription', 'Free Tier')}
        </View>

        <View className="py-4">
          <Text className="text-lg font-bold text-white mb-4">Lifestyle</Text>
          {renderRow('Activity Level', activityLevel)}
          {renderRow('Medical Conditions', 'None')}
        </View>

        <View className="py-4">
          <Text className="text-lg font-bold text-white mb-4">About</Text>
          {renderRow('Privacy Policy', 'View')}
          {renderRow('Terms of Service', 'View')}
        </View>

        <View className='py-4'>
          <Text className="text-lg font-bold text-white mb-4">Account</Text>
          {renderRow('Sign Out', '')}
          {renderRow('Delete Account', '')}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile