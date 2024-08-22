import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const getBgVariantStyle = (variant) => {
    switch (variant) {
        case "primary":
            return "bg-secondary";
        case "secondary":
            return "bg-secondary-500";
        case "tertiary":
            return "bg-tertiary-500";
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
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`w-full rounded-full min-h-[62px] p-3 flex flex-row justify-center items-center shadow-md
            shadow-neutral-400/70  ${getBgVariantStyle(bgVariant)} ${className}`}
            {...props}
        >
            {IconLeft && <IconLeft />}
            <Text className={`text-lg font-semibold ${getTextVariantStyle(textVariant)}`}>{title}</Text>
            {IconRight && <IconRight />}
        </TouchableOpacity>
    );
}

export default CustomOnboardingButton;
