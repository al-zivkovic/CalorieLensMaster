import { View, Text, Image } from 'react-native';
import { Tabs, Redirect } from 'expo-router';

import { icons } from '../../constants';

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className='items-center justify-center gap-2'>
            <Image 
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className='w-6 h-6'
            />
            <Text className={`${focused ? 'font-sfregular' : 'font-sfregular'} text-xs`} style={{ color: color}}> 
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#10D29A',
                tabBarInactiveTintColor: '#FFF',
                tabBarStyle: {
                    backgroundColor: '#000',
                    borderTopWidth: 2,
                    borderTopColor: '#232533',
                    height: 90,
                    paddingTop: 20,
                }
            }}
        
        >
            <Tabs.Screen 
                name='home'
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon 
                            icon={icons.home}
                            color={color}
                            name='Home'
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name='profile'
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon 
                            icon={icons.profile}
                            color={color}
                            name='Profile'
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name='log'
                options={{
                    title: 'Log',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon 
                            icon={icons.plus}
                            color={color}
                            name='Log'
                            focused={focused}
                        />
                    )
                }}
            />
        </Tabs>
    </>
  )
}

export default TabsLayout