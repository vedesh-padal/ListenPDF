import { TouchableOpacity, Text, Alert } from "react-native";
import * as FileSystem from 'expo-file-system'
import axios from 'axios';


const ProcessingButton = (props) => {

  const { setIsLoading, docUri, setDocUri, setExtractedText, docName, setAudioUrl, setIsLoadingAudio, voiceLangOpt, voiceNameOpt } = props;

  const handleProcessDoc = async () => {
    setIsLoading(true);
    try {
      if (docUri === null)  {
        Alert.alert("", "Please select the PDF first");
        setIsLoading(false);
        return;
      }

      const base64DocData = await FileSystem.readAsStringAsync(docUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log('first 20 chars of the base64 string that is being sent: ', base64DocData.substring(0,20))

      const data = {
        content: base64DocData,
        fName: docName
      }

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      // const apiResponse = await axios.post('http://127.0.0.1:8080/upload', data, config)
      const apiResponse = await axios.post('https://asia-south1-seismic-handler-421010.cloudfunctions.net/mini-proj-cloud-fun/upload', data, config)
      const numberOfPages = apiResponse.data.numPages;
      const pdfUrl = apiResponse.data.pdfUrl;
      console.log(pdfUrl);
      console.log('no. of pages in pdf: ', numberOfPages);
      
      let processResp = null;
      if (numberOfPages <= 15)  {
        console.log('calling /extract-text endpoint');
        const till15PgResp = await axios.post('https://asia-south1-seismic-handler-421010.cloudfunctions.net/mini-proj-cloud-fun/extract-text', data, config);
        console.log(typeof(till15PgResp.data));
        console.log(till15PgResp.data);
        processResp = till15PgResp.data;
        setExtractedText(till15PgResp.data.textInDoc)
      } 
      else {
        console.log('calling /batchProcess endpoint')
        const batchData = {
          fName: docName
        }

        const batchPrResp = await axios.post('https://asia-south1-seismic-handler-421010.cloudfunctions.net/mini-proj-cloud-fun/batchProcess', batchData, config);
        console.log(batchPrResp.data);
        processResp = batchPrResp.data;
        console.log('batch extracted text public url: ', batchPrResp.data.textUrl);
      }

      const textInDoc = processResp.textInDoc;
      const ttsData = {
        content: textInDoc,
        fName: docName,
        langCode: voiceLangOpt,
        voiceName: voiceNameOpt,
        // langCode: "en-IN",  // this should also be received as user input from app
        // voiceName: "en-IN-Standard-A",
        ssmlGender: "FEMALE"
      }

      setIsLoading(false);
      console.log('TEXT EXTRACTION COMPLETE, NOW PROCEEDING TO VOICE EXTRACTION /tts');

      setIsLoadingAudio(true);
      const ttsResponse = await axios.post('https://asia-south1-seismic-handler-421010.cloudfunctions.net/mini-proj-cloud-fun/tts', ttsData, config);
      console.log(ttsResponse.data.convMsg);
      console.log('audioURL: ', ttsResponse.data.mp3Url);
      
      setAudioUrl(ttsResponse.data.mp3Url);
      setIsLoadingAudio(false);
      setDocUri(null);
      
    } catch (error) {
      console.log("Error processing the PDF",  error.message);
      console.log(error.code);
      console.log(error.response)
      Alert.alert("Error processing the PDF", "Please try again later...");
      setIsLoading(false);

      setIsLoadingAudio(false);
      setDocUri(null);
    }
  }

  
  return (
    <TouchableOpacity
      onPress={handleProcessDoc}
      className="my-2 mb-6 flex justify-center items-center"
      activeOpacity={0.7}
    >
      <Text
        className={`text-gray-200 text-base font-medium p-2 px-3 rounded-md bg-zinc-800`}
      >
        Process the PDF
      </Text>
      <Text className='text-white my-1'> 
        { voiceLangOpt } { "  " } { voiceNameOpt }
      </Text>
    </TouchableOpacity>
  );
};

export default ProcessingButton;
