import { Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import * as Haptics from 'expo-haptics';

const getBgVariantStyle = (variant: string) => {
  switch (variant) {
    case "primary":
      return "bg-secondary";
    case "secondary":
      return "bg-secondary-500";
    case "tertiary":
      return "bg-tertiary-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-secondary";
  }
};

const getTextVariantStyle = (variant: string) => {
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
};

const CustomLogButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  Icon,  // Icon path or component
  className,
  ...props
}: {
  onPress: () => void,
  title: string,
  bgVariant?: string,
  textVariant?: string,
  Icon?: any,
  className?: string,
  [key: string]: any
}) => {

  const onPressWithHaptics = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={onPressWithHaptics}
      className={`w-24 h-24 rounded-lg p-2 flex flex-col justify-center items-center ${getBgVariantStyle(bgVariant)} ${className}`} // Square button, flex-col for icon above text
      {...props}
    >
      {Icon && typeof Icon === 'number' ? (
        <Image source={Icon} style={{ width: 24, height: 24, marginBottom: 4 }} />
      ) : (
        Icon && <Icon style={{ marginBottom: 4 }} />
      )}
      <Text className={`text-sm font-JakartaSemiBold text-center ${getTextVariantStyle(textVariant)}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomLogButton;
