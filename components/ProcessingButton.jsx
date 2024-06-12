import { TouchableOpacity, Text, Alert } from "react-native";
import * as FileSystem from 'expo-file-system'
import axios from 'axios';
import AppContext from "../app/AppContext";
import { useContext } from "react";


const ProcessingButton = (props) => {

  const { setIsLoading, docUri, setDocUri, setExtractedText, docName, 
    setAudioUrl, setIsLoadingAudio, setAudioDurationSrc, setRefresh,
    voiceLangOpt, voiceNameOpt, isLoading
  } = props;


  const { processedFiles, setProcessedFiles, addProcessedFile } = useContext(AppContext);
  
  const cldFnBaseUrl = "https://asia-south1-seismic-handler-421010.cloudfunctions.net/mini-proj-cloud-fun";

  const handleProcessDoc = async () => {
    setIsLoading(true);
    setAudioUrl(null);
    setRefresh(true);
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
      const apiResponse = await axios.post(`${cldFnBaseUrl}/upload`, data, config)
      const numberOfPages = apiResponse.data.numPages;
      const pdfUrl = apiResponse.data.pdfUrl;
      console.log(pdfUrl);
      console.log('no. of pages in pdf: ', numberOfPages);
      
      let processResp = null;
      if (numberOfPages <= 15)  {
        console.log('calling /extract-text endpoint');
        const till15PgResp = await axios.post(`${cldFnBaseUrl}/extract-text`, data, config);
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

        const batchPrResp = await axios.post(`${cldFnBaseUrl}/batchProcess`, batchData, config);
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
      const ttsResponse = await axios.post(`${cldFnBaseUrl}/tts`, ttsData, config);
      console.log(ttsResponse.data.convMsg);
      console.log('audioURL: ', ttsResponse.data.mp3Url);
      console.log('audio duration: ', ttsResponse.data.durationInSeconds);

      // Save audio locally
      const saveAudioLocally = async (audioUrl, fileName) => {
        try {
          const audioDir = `${FileSystem.documentDirectory}listen/`;
          await FileSystem.makeDirectoryAsync(audioDir, { intermediates: true });
          const audioFilePath = `${audioDir}${fileName}.mp3`;
          await FileSystem.downloadAsync(audioUrl, audioFilePath);
          return audioFilePath;
        } catch (error) {
          console.error('Error saving audio locally:', error);
          throw error;
        }
      };

      // Copy PDF locally
      const copyPDFLocally = async (pdfUri, fileName) => {
        try {
          const pdfDir = `${FileSystem.documentDirectory}listen/`;
          await FileSystem.makeDirectoryAsync(pdfDir, { intermediates: true });
          const pdfFilePath = `${pdfDir}${fileName}`;

          // Check if the file already exists
          const fileInfo = await FileSystem.getInfoAsync(pdfFilePath);
          if (fileInfo.exists) {
            // Delete the existing file
            await FileSystem.deleteAsync(pdfFilePath);
          }

          // Copy the new file
          await FileSystem.copyAsync({ from: pdfUri, to: pdfFilePath });
          return pdfFilePath;
        } catch (error) {
          console.error('Error copying PDF locally:', error);
          throw error;
        }
      };

      const localPdfPath = await copyPDFLocally(docUri, docName);
      console.log('PDF copied locally to', localPdfPath);

      const localAudioPath = await saveAudioLocally(ttsResponse.data.mp3Url, docName);
      console.log('Audio saved locally at', localAudioPath);



      setAudioDurationSrc(ttsResponse.data.durationInSeconds);
      // setAudioUrl(ttsResponse.data.mp3Url);
      setAudioUrl(localAudioPath);
      setIsLoadingAudio(false);
      setDocUri(null);

      const newFile = {
        docName,
        localPdfPath,
        localAudioPath
      };

      console.log(`processed file details: `, newFile);

      // setProcessedFiles([...processedFiles, newFile]);
      await addProcessedFile(newFile);
      
    } catch (error) {
      console.log("Error processing the PDF",  error.message);
      console.log(error.code);
      console.log(error.response)
      setIsLoading(false);
      setIsLoadingAudio(false);
      setDocUri(null);

      Alert.alert("Error processing the PDF", "Please try again later...");
    }
  }

  
  return (
    <TouchableOpacity
      onPress={handleProcessDoc}
      className="my-2 mb-6 flex justify-center items-center"
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text
        className={`text-gray-200 text-base font-medium p-2 px-3 rounded-md bg-zinc-800`}
      >
        Process the PDF
      </Text>
      {/* <Text className='text-white my-1'> 
        { voiceLangOpt } { "  " } { voiceNameOpt }
      </Text> */}
    </TouchableOpacity>
  );
};

export default ProcessingButton;
