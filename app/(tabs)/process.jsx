import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as FileSystem from 'expo-file-system';


const Processed = () => {
  return (
    <SafeAreaView className="bg-slate-700 h-full">
      <ScrollView>
        <View className="flex-1 items-center mt-6">
          <Text className='text-white text-lg'>This is processed screen</Text>
          <TouchableOpacity
            onPress={() => {
              console.log(FileSystem.documentDirectory);
            }}
            className="my-2 mb-6 rounded-lg w-24 h-10 justify-center items-center bg-slate-200/40"
            activeOpacity={0.7}
          >
            <Text>Click me</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Processed;