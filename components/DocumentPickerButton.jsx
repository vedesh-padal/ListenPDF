import { TouchableOpacity, Text, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";

const DocumentPickerButton = ({ setDocUri }) => {

  const handleDocPick = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (!result.canceled) {
        setDocUri(result.assets[0].uri);
      } else if (result.canceled) {
        setDocUri(null);
      }
      console.log(result);
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
