import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import * as FileSystem from 'expo-file-system'
import * as DocumentPicker from 'expo-document-picker'
import { useState } from 'react';

const App = () => {

  const [docUri, setDocUri] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const pickDoc = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf'
      })

      if (!result.canceled) {
        setDocUri(result.assets[0].uri);
      } else if (result.canceled) {
        setDocUri(null);
      }
      console.log(result);

    } catch (error) {
      console.log(error);
      Alert.alert('Eror while picking the image', error);
    }
  }

  const sendDoc = async () => {
    setIsLoading(true);
    try {
      if (!docUri)  {
        Alert.alert("Please select the PDF first");
        setIsLoading(false);
      }

      const base64DocData = await FileSystem.readAsStringAsync(docUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log('first 20 chars of the base64 string that is being sent: ')
      console.log(base64DocData.substring(0,20));

      const data = {
        content: base64DocData
      }

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const apiResponse = await axios.post('https://asia-south1-seismic-handler-421010.cloudfunctions.net/mini-proj-cloud-fun/extract-text', data, config)

      console.log(apiResponse.data.extractedText);
      setExtractedText(apiResponse.data.extractedText);
      setIsLoading(false);
      setDocUri(null);
      
    } catch (error) {
      console.log("Error processing the PDF",  error);
      Alert.alert("Error processing the PDF", "Please try again later...");
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView className='bg-slate-700 h-full'>
      <View className="flex-1 items-center mt-6">
        <Text className='text-white text-3xl font-semibold my-4'>
          ListenPDF DEMO
        </Text>
        
        <TouchableOpacity
          onPress={pickDoc}
          className=''
          activeOpacity={0.7}
        >
          <Text className={`text-gray-200 text-base font-medium p-2 rounded-md bg-zinc-800 my-2`} >Choose a PDF file</Text>
        </TouchableOpacity>
        
        { docUri && (
            <Text className='text-gray-100'>The document is now selected </Text>
          )
        }

        <TouchableOpacity
          onPress={sendDoc}
          className='my-2 mb-6'
          activeOpacity={0.7}
        >
          <Text className={`text-gray-200 text-base font-medium p-2 rounded-md bg-zinc-800`} >
            Process the PDF
          </Text>
        </TouchableOpacity>

        {
          extractedText.length > 0 && !isLoading ? (
            <ScrollView className='m-6 border-2 p-4 border-gray-500 rounded-sm'>
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