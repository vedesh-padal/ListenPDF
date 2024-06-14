import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';


export default function App() {

  

  return (
    <SafeAreaView className='h-full bg-slate-700'>  
      <ScrollView contentContainerStyle={{ height: '100%' }}
        // scrollEnabled={true}        
        nestedScrollEnabled={true}
      >
        <View className='mx-auto mt-48 w-3/4 flex items-center'>
          <Text className='text-3xl text-white text-center italic mb-4'>
            Hi! 👋
          </Text>
          <Text className='text-2xl text-white text-center italic'>
            Welcome to
          </Text>
          <View className="flex-row justify-center items-center space-x-4">
            <Text className="text-5xl text-white text-center mb-1 font-extrabold">{'\n'}ListenPDF</Text>
            {/* <Image
              source={require('../assets/listenPDF_logo.png')}
              style={{
                width: 50,
                height: 50,
                aspectRatio: 1
              }}
            /> */}
          </View>
          <Text className="text-xl text-gray-400 text-cneter italic mt-0 pt-0">
            version 0.8.0
          </Text>
          <CustomButton 
            title='Continue'
            handlePress={() => router.push('/home')}
            containerStyles={"w-3/5 mt-48 bg-gray-600"}
            textStyles={"text-white text-2xl text-"}
          />
        </View> 
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  );
}