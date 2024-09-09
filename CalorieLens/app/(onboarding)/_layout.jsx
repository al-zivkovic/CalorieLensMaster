import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const OnboardingLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          gestureEnabled: false,
        }}
      >
      </Stack>

      <StatusBar backgroundColor='#161622' style='dark' />
    </>
  );
}

export default OnboardingLayout;
