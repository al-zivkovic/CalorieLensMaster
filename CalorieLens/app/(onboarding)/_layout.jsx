import React from 'react';
import { Stack } from 'expo-router';
import { UserProvider } from '../../context/UserContext';
import { StatusBar } from 'expo-status-bar';

const OnboardingLayout = () => {
  return (
    <UserProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          gestureEnabled: false,
        }}
      >
      </Stack>

      <StatusBar backgroundColor='#161622' style='dark' />
    </UserProvider>
  );
}

export default OnboardingLayout;
