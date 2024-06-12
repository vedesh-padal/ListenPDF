// app/processed.jsx
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AppContext from '../AppContext.js';
import AudioPlayer from '../../components/AudioPlayer';
import PDFReader from '../../components/PDFReader';
import React, { useContext, useState } from 'react';

const Processed = () => {
  const { processedFiles } = useContext(AppContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const openPDF = (fileUri) => {
    setSelectedFile({ type: 'pdf', uri: fileUri });
  };

  const playAudio = (fileUri) => {
    setAudioUrl(fileUri);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={processedFiles}
        keyExtractor={(item) => item.docName}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>{item.docName}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => openPDF(item.localPdfPath)}>
                <Text style={{ color: 'blue' }}>Open PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => playAudio(item.localAudioPath)}>
                <Text style={{ color: 'blue' }}>Listen to PDF</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {selectedFile && selectedFile.type === 'pdf' && (
        <PDFReader fileUri={selectedFile.uri} />
      )}
      {audioUrl && <AudioPlayer audioUrl={audioUrl} />}
    </View>
  );
};

export default Processed;



























// import { useEffect, useState } from 'react';
// import { View, Text, Button, FlatList, Platform, ProgressViewIOS, ScrollView, ProgressBar } from 'react-native';
// import FlatListComp from '../../components/FlatListComponent';
// import { Audio } from 'expo-av';
// import * as FileSystem from 'expo-file-system';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import HorizontalProgressBar from '../../components/HorizontalProgressBar';

// const fileNames = [ 'ln2-mp3', 'h-poem.mp3', 'Internship.mp3' ];

// const Processed = () => {
//   const [files, setFiles] = useState([]);
//   const [sound, setSound] = useState(null);
//   const [downloadProgress, setDownloadProgress] = useState(0);

//   useEffect(() => {
//     const loadFiles = async () => {
//       const files = await listFiles();
//       setFiles(files);
//     };
//     loadFiles();
//   }, []);

//   const playSound = async (fileName) => {
//     const filePath = `${FileSystem.documentDirectory}Downloads/ListenPDF/${fileName}`;
//     const { sound } = await Audio.Sound.createAsync({ uri: filePath });
//     setSound(sound);
//     await sound.playAsync();
//   };

//   useEffect(() => {
//     return sound
//       ? () => {
//           sound.unloadAsync();
//         }
//       : undefined;
//   }, [sound]);

//   const downloadFile = async (url, fileName) => {
//     const downloadsDir = `${FileSystem.documentDirectory}Downloads/ListenPDF/`;
//     await FileSystem.makeDirectoryAsync(downloadsDir, { intermediates: true });
//     const filePath = `${downloadsDir}${fileName}`;

//     const callback = downloadProgress => {
//       const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
//       console.log(progress);
//       setDownloadProgress(progress);
//     };

//     try {
//       await FileSystem.downloadAsync(url, filePath, { progress: callback });
//       console.log('Finished downloading to ', filePath);
//       return filePath;
//     } catch (error) {
//       console.error('Error downloading file:', error);
//     }
//   };

//   const listFiles = async () => {
//     const downloadsDir = `${FileSystem.documentDirectory}Downloads/ListenPDF/`;
//     const files = await FileSystem.readDirectoryAsync(downloadsDir);
//     return files;
//   };

//   return (
//     <SafeAreaView>
//       {/* <ScrollView> */}
//       <View>

//         <Button
//           title="Download and Store Files"
//           onPress={async () => {
//             try {
//               const downloadPromises = fileNames.map(async (fName) => {
//                 const filePath = await downloadFile(`https://storage.googleapis.com/mini-proj-bucket/op-voice/${fName}`, `${fName}`);
//                 if (filePath) {
//                   console.log('File downloaded to', filePath);
//                   return filePath;
//                 }
//                 return null;
//               });

//               const downloadedFiles = await Promise.all(downloadPromises);
//               const updatedFiles = await listFiles();
//               setFiles(updatedFiles);
//             } catch (error) {
//               console.error('Error downloading or listing files:', error);
//               // Handle the error appropriately, e.g., display an error message to the user
//             }
//           }}
//         />

//           <View>

//             <FlatListComp files={files} playSound={playSound} />
            
//             {downloadProgress > 0 && downloadProgress < 1 && (
//               <View>
//                 <Text>Download Progress: {Math.round(downloadProgress * 100)}%</Text>
//                 <HorizontalProgressBar downloadProgress={downloadProgress} />
//               </View>
//             )}
//           </View>
//       </View>
//       {/* </ScrollView> */}
//     </SafeAreaView>
//   );
// };

// export default Processed;
