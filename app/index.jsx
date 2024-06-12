import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';


export default function App() {

  

  return (
    <SafeAreaView className='h-full bg-slate-700'>  
      <ScrollView contentContainerStyle={{ height: '100%' }}
        // scrollEnabled={true}        
        nestedScrollEnabled={true}
      >
        <View className='m-auto w-1/2'>
          <Text className='text-3xl text-white text-center italic'>
            Hi! Welcome to <Text className="font-extrabold">{'\n'}ListenPDF</Text> click the button below...
          </Text>
          <CustomButton 
            title='Continue'
            handlePress={() => router.push('/home')}
            containerStyles={"w-full mt-7 bg-gray-600"}
            textStyles={"text-white text-2xl text-"}
          />
        </View> 
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  );
}