import React from 'react';
import { Stack } from 'expo-router';
import { UserProvider } from '../../context/UserContext';

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
    </UserProvider>
  );
}

export default OnboardingLayout;
