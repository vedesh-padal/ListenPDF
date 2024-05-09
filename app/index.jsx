import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useState } from 'react';
import DocumentPickerButton from '../components/DocumentPickerButton';
import ProcessingButton from '../components/ProcessingButton';

const App = () => {

  const [docUri, setDocUri] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView className='bg-slate-700 h-full'>
      <View className="flex-1 items-center mt-6">
        <Text className='text-white text-3xl font-semibold my-4'>
          ListenPDF DEMO
        </Text>
        
        <DocumentPickerButton setDocUri={setDocUri} />
        
        { docUri && <Text className='text-gray-100'>The document is now selected </Text> }

        <ProcessingButton {...{ setIsLoading, docUri, setDocUri, setExtractedText }} />

        {
          extractedText.length > 0 && !isLoading ? (
            <ScrollView className='m-6 border-2 p-4 border-gray-500 rounded-md' >
              <Text className='font-md text-white text-base'> { extractedText } </Text>
            </ScrollView>
          ) : isLoading ? <ActivityIndicator className='h-32 w-32' size='large' color='#ffffff' /> : <View></View>
        }

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

export default App