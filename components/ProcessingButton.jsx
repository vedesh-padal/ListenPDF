import { TouchableOpacity, Text, Alert } from "react-native";
import * as FileSystem from 'expo-file-system'
import axios from 'axios';

const ProcessingButton = (props) => {

  const { setIsLoading, docUri, setDocUri, setExtractedText } = props;

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
    <TouchableOpacity
      onPress={handleProcessDoc}
      className="my-2 mb-6"
      activeOpacity={0.7}
    >
      <Text
        className={`text-gray-200 text-base font-medium p-2 rounded-md bg-zinc-800`}
      >
        Process the PDF
      </Text>
    </TouchableOpacity>
  );
};

export default ProcessingButton;
