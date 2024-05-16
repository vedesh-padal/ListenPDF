import { TouchableOpacity, Text, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
// import pdfjsLib from 'pdfjs-dist';
import * as FileSystem from 'expo-file-system';
// import PDFParser from 'pdf-parse';


const DocumentPickerButton = ({ setDocUri, setDocName }) => {

  const handleDocPick = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (!result.canceled) {
        setDocUri(result.assets[0].uri);
      } else if (result.canceled) {
      // else {
        setDocUri(null);
        return;
      }
      console.log(result);
      setDocName(result.assets[0].name);

    } catch (error) {
      console.log(error);
      Alert.alert("Eror while picking the image", error);
    }
  };

  return (
    <TouchableOpacity onPress={handleDocPick} activeOpacity={0.7}>
      <Text
        className={`text-gray-200 text-base font-medium p-2 rounded-md bg-zinc-800 my-2`}
      >
        Choose a PDF file
      </Text>
    </TouchableOpacity>
  );
};

export default DocumentPickerButton;
