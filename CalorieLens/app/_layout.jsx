import { StyleSheet, Text, View } from 'react-native'
import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'SF-Pro': require('../assets/fonts/SF-Pro.ttf'),
  });

  useEffect(() => {
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if(!fontsLoaded && !error) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
        <Stack.Screen name="index" />
    </Stack>
  )
}

export default RootLayout