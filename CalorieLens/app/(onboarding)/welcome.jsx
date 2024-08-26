import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

import { onboarding } from '../../constants';
import CustomOnboardingButton from '../../components/CustomOnboardingButton';

export default function App() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNextPress = () => {
    if (activeIndex < onboarding.length - 1) {
      swiperRef.current.scrollBy(1, true, 200); // Move to the next slide
    } else {
      router.push('/gender'); // Navigate to the next page after the last slide
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar translucent={true} backgroundColor="transparent" style="dark" />

      <SafeAreaView className="flex items-center justify-between bg-white h-full">
        <TouchableOpacity 
          onPress={() => router.push('/sign-up')}
          className="w-full flex justify-end items-end p-5"
        >
          <Text className="text-md font-Jakarta text-black">Skip</Text>
        </TouchableOpacity>

        <Swiper 
          ref={swiperRef}
          loop={false}
          autoplay={false}
          autoplayTimeout={4}
          autoplayDirection={true}
          autoplayDisableOnInteraction={false}
          scrollEnabled={true}
          index={activeIndex}
          dot={<View className="w-[32px] h-[5px] mx-1 bg-gray-200 rounded-full" />}
          activeDot={<View className="w-[32px] h-[5px] mx-1 bg-secondary rounded-full" />}
          onIndexChanged={(index) => setActiveIndex(index)}
        >
          {onboarding.map((item) => (
            <View key={item.id} className="flex items-center justify-center">
              {/* <Image 
                source={item.image}
                className="w-full h-[300px]"
                resizeMode='contain'
              /> */}
              <View className="flex flex-row items-center justify-center w-full mt-10">
                <Text className="text-black text-2xl font-JakartaBold mx-10 text-center">
                  {item.title}
                </Text>
              </View>
              <Text className="text-base font-Jakarta text-center text-black mx-10 mt-3">
                {item.description}
              </Text>
            </View>
          ))}
        </Swiper>

        <CustomOnboardingButton
          onPress={handleNextPress}
          title={activeIndex < onboarding.length - 1 ? "Next" : "Get Started"}
          className="w-11/12 mt-10 mb-4"
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
