import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const ArrowDown = (props) => (
  <View className="flex items-center justify-center">
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} color={"#FFFFFF"} fill={"none"}>
      <Path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  </View>
  );

export default ArrowDown;



