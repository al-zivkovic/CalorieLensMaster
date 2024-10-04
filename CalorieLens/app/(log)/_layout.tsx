import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import CustomBackButton from '../../components/CustomBackButton';

const LogLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: true, headerBackTitleVisible: false }}>
        {/* Barcode Scan screen */}
        <Stack.Screen
          name="barcode-scan"
          options={{
            title: 'Scan Barcode',
            headerShown: true, // Show the header with the custom back button
            headerLeft: () => <CustomBackButton />, // Add the custom back button here
          }}
        />

        {/* Search Food screen */}
        <Stack.Screen
          name="search"
          options={{
            title: 'Search Food',
            headerShown: true,
            headerLeft: () => <CustomBackButton />, // Add the custom back button here
          }}
        />

        {/* AI Analyze screen */}
        <Stack.Screen
          name="ai-analyze"
          options={{
            title: 'AI Analyze',
            headerShown: true,
            headerLeft: () => <CustomBackButton />, // Add the custom back button here
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default LogLayout;
