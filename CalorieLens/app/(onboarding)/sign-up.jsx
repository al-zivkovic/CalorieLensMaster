import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React from 'react'

import ReactNativeModal from 'react-native-modal'
import { Link, router } from 'expo-router'
import { useSignUp } from '@clerk/clerk-expo'
import { useState } from 'react'

import CustomOnboardingButton from '../../components/CustomOnboardingButton'
import OAuth from '../../components/OAuth'
import InputField from '../../components/InputField'
import { icons } from '../../constants'
import api from '../../utils/api'
import { useUser } from '../../context/UserContext'

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { userData } = useUser();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
        name: form.name,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  // translate the day, month, year to a date string from the user context
  // if the month is less than 10, add a 0 in front of it
  const date = `${userData.year}-${userData.month < 10 ? `0${userData.month}` : userData.month}-${userData.day < 10 ? `0${userData.day}` : userData.day}`;

  const onPressVerify = async () => {
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      if (completeSignUp.status === "complete") {
        // Send data to your Elixir API instead of Supabase directly
        const response = await api.post('/users', {
          user: {
            name: form.name,
            email: form.email,
            birthday: date,
            gender: userData.gender,
            clerk_id: completeSignUp.createdUserId,
            user_preferences: {
              unit: userData.unit,
              height: userData.height,
              weight: userData.weight,
              activity: userData.activity,
              goal: userData.goal,
              goal_weight: userData.goal_weight,
              goal_speed: userData.goal_speed,
            },
            user_plan: {
              bmr: userData.plan.BMR,
              tdee: userData.plan.TDEE,
              caloric_intake: userData.plan.caloricIntake,
              fat: userData.plan.macronutrients.fatGrams,
              protein: userData.plan.macronutrients.proteinGrams,
              carbs: userData.plan.macronutrients.carbGrams,
            },
          },
        });
  
        if (response.status === 201) {
          console.log('User data inserted successfully via the Elixir backend');
          await setActive({ session: completeSignUp.createdSessionId });
          setVerification({
            ...verification,
            state: "success",
          });
        } else {
          console.log('Error inserting user data:', response.data.errors);
        }
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
      }
    } catch (err) {
      setVerification({
        ...verification,
        error: err.errors && err.errors[0] ? err.errors[0].longMessage : "Unknown error occurred",
        state: "failed",
      });
    }
  };
  

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[200px]">
          {/* <Image source={icons.logo} className="z-0 w-full h-[250px]" /> */}
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            placeholder="Name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            placeholder="Email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            placeholder="Password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomOnboardingButton
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-6"
          />
          <OAuth />
          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-10 font-Jakarta"
          >
            Already have an account?{" "}
            <Text className="text-blue-500">Log In</Text>
          </Link>
        </View>
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          // onBackdropPress={() =>
          //   setVerification({ ...verification, state: "default" })
          // }
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="font-JakartaExtraBold text-2xl mb-2">
              Verification
            </Text>
            <Text className="mb-5">
              We've sent a verification code to {form.email}.
            </Text>
            <InputField
              label={"Code"}
              icon={icons.lock}
              placeholder={"12345"}
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}
            <CustomOnboardingButton
              title="Verify Email"
              onPress={onPressVerify}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={icons.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 text-center mt-2">
              You have successfully verified your account.
            </Text>
            <CustomOnboardingButton
              title="Continue"
              onPress={() => {
                setShowSuccessModal(false);
                router.push(`/dashboard`)}}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  )
}

export default SignUp