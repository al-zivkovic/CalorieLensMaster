import { SignedIn, SignedOut, useUser, useAuth } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { icons } from '../../constants'


const Home = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.replace('/sign-in');
  }


  return (
    <SafeAreaView className="flex-1 p-4 bg-white">
      <View>
        <SignedIn>
          <View className="flex flex-row items-center justify-between my-5">
            <Text className="text-lg font-JakartaExtraBold">
              Hello {user?.emailAddresses[0].emailAddress}
            </Text>
            <TouchableOpacity
              onPress={handleSignOut}
              className="justify-center items-center w-10 h-10 rounded-full bg-gray-100"
            >
              <Image source={icons.out} className="w-4 h-4" />
            </TouchableOpacity>
          </View>
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <Text>Sign In</Text>
          </Link>
          <Link href="/sign-up">
            <Text>Sign Up</Text>
          </Link>
        </SignedOut>
      </View>
    </SafeAreaView>
  )
}

export default Home