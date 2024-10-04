import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import { icons } from '../../constants';

const TabIcon = ({ icon, color, name, focused, route }) => {
  const router = useRouter();  // Use the router to manually navigate

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);  // Haptic feedback on press
    router.push(route);  // Navigate to the route
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={{ alignItems: 'center', paddingTop: 10, width: 70 }}  // Align icon and text vertically and restrict clickable area
    >
      <Icon 
        name={icon}
        size={24}
        color={color}
        style={{ marginBottom: 5 }}  // Add marginBottom to space icon and text
      />
      <Text style={{ color: color, fontSize: 12, fontWeight: focused ? 'bold' : 'normal', textAlign: 'center' }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,  // Hide default label
          tabBarActiveTintColor: '#10D29A',
          tabBarInactiveTintColor: '#FFF',
          tabBarStyle: {
            backgroundColor: '#000',
            borderTopWidth: 2,
            borderTopColor: '#000',
            height: 90,
            paddingTop: 10,
          },
        }}
        tabBar={({ state }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 80, backgroundColor: '#000', borderTopWidth: 2, borderTopColor: '#000' }}>
            <TabIcon
              icon="view-dashboard"
              color={state.index === 0 ? '#10D29A' : '#FFF'}
              name='Dashboard'
              focused={state.index === 0}
              route='/dashboard'
            />
            <TabIcon
              icon="book"
              color={state.index === 1 ? '#10D29A' : '#FFF'}
              name='Journal'
              focused={state.index === 1}
              route='/journal'
            />
            <TabIcon
              icon="account"
              color={state.index === 2 ? '#10D29A' : '#FFF'}
              name='Profile'
              focused={state.index === 2}
              route='/profile'
            />
          </View>
        )}
      >
        <Tabs.Screen
          name='dashboard'
          options={{
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name='journal'
          options={{
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            headerShown: false,
          }}
        />
      </Tabs>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabsLayout;
