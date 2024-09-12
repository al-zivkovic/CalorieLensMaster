import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

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
      <Image 
        source={icon}
        resizeMode='contain'
        tintColor={color}
        style={{ width: 24, height: 24, marginBottom: 5 }}  // Add marginBottom to space icon and text
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
            borderTopColor: '#232533',
            height: 90,
            paddingTop: 10,
          },
        }}
        tabBar={({ state }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 80, backgroundColor: '#000', borderTopWidth: 2, borderTopColor: '#232533' }}>
            <TabIcon
              icon={icons.home}
              color={state.index === 0 ? '#10D29A' : '#FFF'}
              name='Home'
              focused={state.index === 0}
              route='/home'
            />
            <TabIcon
              icon={icons.profile}
              color={state.index === 1 ? '#10D29A' : '#FFF'}
              name='Profile'
              focused={state.index === 1}
              route='/profile'
            />
          </View>
        )}
      >
        <Tabs.Screen
          name='home'
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
    </>
  );
};

export default TabsLayout;
