import { ScrollView, Text, TouchableOpacity, View, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const About = () => {

  const handleLinkPress = () => {
    Linking.openURL('https://github.com/vedesh-padal/ListenPDF');
  };

  return (
    <SafeAreaView className="bg-slate-700 h-full">
      <ScrollView className="overflow-y-auto m-4 my-6">
        <View className="p-4">
          <Text className="text-3xl font-bold text-center mb-2 text-slate-100">About ListenPDF</Text>
          <Text className="text-base mb-4 text-white text-justify">
            {'\t\t'}ListenPDF is an innovative application specifically designed to enhance accessibility for visually impaired individuals by converting PDF documents and scanned texts into audio. Our goal is to provide an easy-to-use tool that transforms written content into spoken words, ensuring that visually impaired students and users can access educational materials and other documents effortlessly.
          </Text>
          <View>
            <Text className="text-2xl font-bold mb-2 text-slate-200">Key Benefits and Features:</Text>
            
            <Text className="text-lg font-semibold text-slate-300">
              ☆ Easy PDF Selection and Processing:
            </Text>
            <Text className="text-base mb-4 text-slate-400 ml-5">
              Simple and intuitive interface for selecting and processing PDF documents.
            </Text>

            <Text className="text-lg font-semibold text-slate-300">
              ☆ Support for Multiple Languages and Voices:
            </Text>
            <Text className="text-base mb-4 text-slate-400 ml-5">
              ListenPDF supports English, Hindi, and Telugu with various voice options to cater to different user preferences.
            </Text>

            <Text className="text-lg font-semibold text-slate-300">
              ☆ High-Quality Audio Output:
            </Text>
            <Text className="text-base mb-4 text-slate-400 ml-5">
              Enjoy clear and natural-sounding audio renditions of your documents.
            </Text>

            <Text className="text-lg font-semibold text-slate-300">
              ☆ Fast and Reliable Text Extraction:
            </Text>
            <Text className="text-base mb-4 text-slate-400 ml-5">
              Leverage advanced Google Cloud Services for accurate and quick text extraction from PDFs and scanned documents.
            </Text>

            <Text className="text-lg font-semibold text-slate-300">
              ☆ Offline Storage Functionality:
            </Text>
            <Text className="text-base mb-4 text-slate-400 ml-5">
              Save and access converted voice documents without internet connectivity, ensuring continuous access anytime, anywhere.
            </Text>
          </View>
          <Text className="text-2xl font-bold mb-2 text-slate-200">Developer Information</Text>

          <Text className="text-base mb-4 text-slate-400 ">
            ListenPDF was developed by team <Text className="text-center ml-6">{"\n"}Vedesh, Areef, Ravi [ VAR ] {"\n"}</Text>a passionate software developer team dedicated to creating useful and accessible applications. For more information or to provide feedback, please contact [dravikumar4614@gmail.com].
          </Text>

          <Text className="text-base text-slate-200 mb-2 py-0">
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>This Project is Open-Source ❤️{"\n"}</Text>
            You can check the source-code at: {"\n"}
            <TouchableOpacity onPress={handleLinkPress}>
              <Text className="text-base text-slate-200 underline my-0 py-0">
                https://github.com/vedesh-padal/ListenPDF
              </Text>
            </TouchableOpacity>
          </Text>

          <Text className="text-xl text-slate-300">
            <Text style={{ fontWeight: '600'}}>Version {"\n"}</Text>
            <Text className="text-base text-slate-400">0.8.0</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default About;