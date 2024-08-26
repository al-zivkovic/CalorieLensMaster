import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 p-4 bg-white">
      <View className="flex-1 items-center p-5">
        <Text className="text-3xl font-bold mb-5">Profile</Text>
      </View>
    </SafeAreaView>
  )
}

export default Profile