import { TouchableOpacity, Text } from "react-native";
import RightArrow from "../assets/icons/rightArrow";

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      className={`bg-secondary flex-row rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title + ' '}
      </Text>
      <RightArrow />
    </TouchableOpacity>
  );
};

export default CustomButton;
