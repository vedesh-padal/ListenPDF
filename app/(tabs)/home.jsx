import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useContext, useState } from 'react';
import DocumentPickerButton from '../../components/DocumentPickerButton';
import ProcessingButton from '../../components/ProcessingButton';
import AudioPlayer from '../../components/AudioPlayer';
import { SelectList } from 'react-native-dropdown-select-list';
import AppContext from '../AppContext';

const Home = () => {

  const [docUri, setDocUri] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(true);
  const [docName, setDocName] = useState('');
  // const [audioUrl, setAudioUrl] = useState(null);
  const [audioDurationSrc, setAudioDurationSrc] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const { audioUrl, setAudioUrl } = useContext(AppContext);


  const [voiceLangOpt, setVoiceLangOpt] = useState('');
  const [voiceNameOpt, setVoiceNameOpt] = useState('');

  const voiceLangs = [
    { key: 'en-IN', value: 'English' },
    { key: 'te-IN', value: 'Telugu' },
    { key: 'hi-IN', value: 'Hindi' }
  ];

  /*
    { key: 'en-IN-Neural2-A', value: 'en-IN-Neural2-A' },
    { key: 'te-IN-Standard-A', value: 'te-IN-Standard-A' },
    { key: 'en-IN-Neural2-D', value: 'en-IN-Neural2-D' },
    { key: 'en-IN-Standard-A', value: 'en-IN-Standard-A' },
    { key: 'hi-IN-Standard-A', value: 'hi-IN-Standard-A' },
    { key: 'hi-IN-Neural2-A', value: 'hi-IN-Neural2-A' },
    { key: 'hi-IN-Neural2-D', value: 'hi-IN-Neural2-D' },
  */


  const voiceNames = [
    { key: 'en-IN-Neural2-A', value: 'Natural English' },
    { key: 'te-IN-Standard-A', value: 'Simple Telugu' },
    { key: 'en-IN-Neural2-D', value: 'Clear English' },
    { key: 'en-IN-Standard-A', value: 'Standard English' },
    { key: 'hi-IN-Standard-A', value: 'Simple Hindi' },
    { key: 'hi-IN-Neural2-A', value: 'Natural Hindi' },
    { key: 'hi-IN-Neural2-D', value: 'Clear Hindi' },
    // { key: 'te-IN-Standard-B', value: 'te-IN-Standard-B' },
];

  // const voiceGender = [

  // ]

  return (
    <SafeAreaView className="bg-slate-700 h-full">
      <View className="flex-1 items-center mt-6">
        <Text className="text-white text-3xl font-semibold my-4">
          ListenPDF DEMO
        </Text>

        <DocumentPickerButton setDocUri={setDocUri} setDocName={setDocName} />

        {docUri && (
          <Text className="text-gray-100">{docName} is now selected </Text>
        )}

        <View className="flex-row gap-4 my-1">
          <View>
            <SelectList
              data={voiceLangs}
              setSelected={setVoiceLangOpt}
              save="key"
              boxStyles={{ backgroundColor: "#233223" }}
              // dropdownStyles={{ backgroundColor: '#1d1d1d'}}
              // dropdownItemStyles={{ borderColor: 'white' }}
              inputStyles={{ color: "white" }}
              dropdownTextStyles={{ color: "white" }}
              defaultOption={{ key: "en-IN", value: "English" }}
            />
          </View>
          <View>
            <SelectList
              data={voiceNames}
              setSelected={setVoiceNameOpt}
              save="key"
              inputStyles={{ color: "white" }}
              boxStyles={{ backgroundColor: "#533223" }}
              dropdownTextStyles={{ color: "white" }}
              defaultOption={{
                key: "en-IN-Standard-A",
                value: "Standard English",
              }}
            />
          </View>

          {/* <SelectList 
            // onSelect={() => Alert.alert(voiceLangOpt)}
            setSelected={setVoiceNameOpt} 
            // fontFamily='lato'
            data={voiceNames}  
            // arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />} 
            // searchicon={<FontAwesome name="search" size={12} color={'black'} />} 
            search={false} 
            boxStyles={{borderRadius:0}} //override default styles
            defaultOption={{ key:'1', value:'en-IN-Standard-A' }}   //default selected option
          /> */}
        </View>

        <ProcessingButton
          {...{
            setIsLoading, docUri, setDocUri, setExtractedText, docName,
            setAudioUrl, setIsLoadingAudio, setAudioDurationSrc,
            voiceLangOpt, voiceNameOpt, setRefresh, isLoading
          }}
        />

        {extractedText.length > 0 && !isLoading ? (
          <View className="h-2/5">
            <ScrollView className="my-0 mx-6 border-2 p-4 border-gray-500 rounded-md">
              <Text className="font-md text-white text-base">
                {"First few lines of the extracted text: "}
                {extractedText.substring(0, 2000)}{" "}
              </Text>
            </ScrollView>
          </View>
        ) : isLoading ? (
          <ActivityIndicator
            className="h-32 w-32"
            size="large"
            color="#ffffff"
          />
        ) : (
          <View></View>
        )}

        {extractedText && (
          <View className="m-4">
            {isLoadingAudio ? (
              <ActivityIndicator
                className="h-32 w-32"
                size="large"
                color="#ffffff"
              />
            ) : isLoading ? (
              <View></View>
            ) : (
              <AudioPlayer
                setIsLoading={setIsLoadingAudio}
                extractedText={extractedText}
                audioUrl={audioUrl}
                isLoading={isLoadingAudio}
                refresh={refresh}
                setRefresh={setRefresh}
                setAudioUrl={setAudioUrl}
              />
            )}
          </View>
        )}

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

export default Home;