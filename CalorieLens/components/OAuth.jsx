import { View, Text, Image } from 'react-native';
import CustomOnboardingButton from './CustomOnboardingButton';

import { icons } from '../constants';

const OAuth = () => {
    const handleGoogleSignIn = async () => {};
    
    return (
    <View>
        <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
            <View className="flex-1 h-[1px] bg-gray-400" />
            <Text className="text-lg font-Jakarta">Or</Text>
            <View className="flex-1 h-[1px] bg-gray-400" />
        </View>

        <CustomOnboardingButton 
            title="Log In with Google"
            className="mt-5 w-full shadow-none"
            IconLeft={() => (
                <Image
                    source={icons.google}
                    className="w-5 h-5 mx-2"
                    resizeMode="contain"
                />
            )}
            bgVariant="outline"
            textVariant="primary"
            onPress={handleGoogleSignIn}
        />
    </View>)
}

export default OAuth;