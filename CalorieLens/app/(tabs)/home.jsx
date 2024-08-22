import React from 'react'
import { View, Text } from 'react-native'
import { useUser } from '../../context/UserContext'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {

  return (
    <SafeAreaView className="flex-1 p-4 bg-white">
      <View className="flex-1 items-center p-5">
        <Text className="text-3xl font-bold mb-5">Today's Goals</Text>
        <Text className="text-lg my-2">Calories Left: kcal</Text>
        <Text className="text-lg my-2">Protein Left: g</Text>
        <Text className="text-lg my-2">Fat Left: g</Text>
        <Text className="text-lg my-2">Carbs Left: g</Text>
      </View>
    </SafeAreaView>
  )
}

export default Home