import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

const getBgVariantStyle = (variant) => {
    switch (variant) {
        case "primary":
            return "bg-secondary";
        case "secondary":
            return "bg-secondary-500";
        case "tertiary":
            return "bg-tertiary-500";
        case "outline":
            return "bg-transparent border-neutral-300 border-[0.5px]"
        default:
            return "bg-secondary";
    }
}

const getTextVariantStyle = (variant) => {
    switch (variant) {
        case "primary":
            return "text-black";
        case "secondary":
            return "text-gray-100";
        case "danger":
            return "text-red-100";
        case "success":
            return "text-green-100";
        default:
            return "text-white";
    }
}

const CustomOnboardingButton = ({
    onPress,
    title,
    bgVariant = "primary",
    textVariant = "default",
    IconLeft,
    IconRight,
    className,
    ...props
}) => {

    const onPressWithHaptics = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        if (onPress) {
          onPress();
        }
    }

    return (
        <TouchableOpacity
            onPress={onPressWithHaptics}
            className={`w-full rounded-full min-h-[50px] p-3 flex flex-row justify-center items-center  ${getBgVariantStyle(bgVariant)} ${className}`}
            {...props}
        >
            {IconLeft && <IconLeft />}
            <Text className={`text-lg font-JakartaSemiBold ${getTextVariantStyle(textVariant)}`}>{title}</Text>
            {IconRight && <IconRight />}
        </TouchableOpacity>
    );
}

export default CustomOnboardingButton;
