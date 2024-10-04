import { Stack } from 'expo-router';
import CustomBackButton from '../../components/CustomBackButton';

const ScreenLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: 'black', // Set the header background to black
          },
          headerTintColor: '#FFFFFF', // Set the text and icons color to white
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="settings"
          options={{
            title: 'Settings',
            headerLeft: () => <CustomBackButton />,
          }}
        />
      </Stack>
    </>
  );
};

export default ScreenLayout;
