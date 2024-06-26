// app/processed.jsx
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity, RefreshControl } from 'react-native';
import AppContext from '../AppContext';
import AudioPlayer from '../../components/AudioPlayer';
import PDFReader from '../../components/PDFReader';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
// import ArrowDown from '../../assets/icons/ArrowDown';

const Processed = () => {
  const { processedFiles, setProcessedFiles } = useContext(AppContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [audioPlayers, setAudioPlayers] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  // const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  
  const openPDF = (uri) => {
    setSelectedFile({ type: 'pdf', uri });
    setShowPDFModal(true);
  };

  // const toggleAudioPlayer = (audioPath) => {
  //   if (showAudioPlayer) {
  //     setShowAudioPlayer(false);
  //     setAudioUrl(null);
  //   } else {
  //     setAudioUrl(audioPath);
  //     setShowAudioPlayer(true);
  //   }
  // };

  useEffect(() => {
    const loadProcessedFiles = async () => {
      try {
        const processedFilesDir = `${FileSystem.documentDirectory}processedFiles/`;
        const fileExists = await FileSystem.getInfoAsync(processedFilesDir);
        if (fileExists.exists) {
          const files = await FileSystem.readDirectoryAsync(processedFilesDir);
          const fileDataPromises = files.map(async (fileName) => {
            const fileUri = `${processedFilesDir}${fileName}`;
            const fileContent = await FileSystem.readAsStringAsync(fileUri);
            return JSON.parse(fileContent);
          });
          const fileData = await Promise.all(fileDataPromises);
          setProcessedFiles(fileData);
        }
      } catch (error) {
        console.error('Error loading processed files:', error);
      }
    };

    loadProcessedFiles();
  }, []);

  const toggleAudioPlayer = (docName, audioPath) => {
    setAudioPlayers((prevState) => {
      // Create a copy of the previous state
      const updatedAudioPlayers = { ...prevState };
  
      // If the audio player for the document is already active, remove it
      if (updatedAudioPlayers[docName]) {
        delete updatedAudioPlayers[docName];
      } else {
        // Otherwise, set the audio player for the document to its audioPath
        updatedAudioPlayers[docName] = audioPath;
      }
  
      return updatedAudioPlayers;
    });
  };

  const closeModal = () => {
    setSelectedFile(null);
    setShowPDFModal(false);
  };

  console.log('ALL PROCESSED FILES stored locally details: ', processedFiles);

  return (
    <SafeAreaView className="bg-slate-700 h-full">
      <View className="flex-1 m-4">
        <Text className="text-slate-200 mb-4 text-2xl text-center">Processed Documents</Text>
        <FlatList
          data={processedFiles}
          keyExtractor={(item) => item.docName}
          renderItem={({ item }) => (
            <View className="p-2 border-slate-500 border-b-[0.5px] py-1 rounded-md mb-2">
              <Text className="text-white text-base"><Text className="text-[10px]">File Name:</Text>  {item.docName}</Text>
              <View className="flex-row justify-between mt-1">
                <TouchableOpacity
                  onPress={() => openPDF(item.localPdfPath)}
                  className="flex justify-center items-center"
                  activeOpacity={0.7}
                >
                  <Text className={`text-gray-200 font-medium text-sm p-2 px-3 rounded-md bg-zinc-800`}>Open PDF</Text>
                </TouchableOpacity>
                 <TouchableOpacity
                  onPress={() => toggleAudioPlayer(item.docName, item.localAudioPath)}
                  className="flex items-center"
                  activeOpacity={0.7}
                >
                  <Text className={`text-gray-200 font-medium text-sm p-2 px-3 rounded-md bg-zinc-800`}>
                    {audioPlayers[item.docName] ? 'Close Player' : 'Listen PDF'}
                  </Text>
                </TouchableOpacity>
              </View>
              { console.log(typeof(audioPlayers))}
              { console.log(JSON.stringify(audioPlayers)) }
              { console.log(audioPlayers[item.docName]) }
              {audioPlayers[item.docName] && (
                <View className="mt-2 p-2 border-t border-gray-500">
                  <AudioPlayer 
                    audioUrl={audioPlayers[item.docName]} 
                    // setAudioUrl={}
                  />
                </View>
              )}
              </View>
          )}
        />

        <Modal
          visible={showPDFModal}
          animationType="slide"
          transparent
          className="flex-1"
        >
          <View className="flex-1">
            <TouchableOpacity
              onPress={closeModal}
              className="absolute right-0 top-0 p-4"
            >
              <Text className="text-red-500 text-lg">Close</Text>
            </TouchableOpacity>
            <View className="flex-0.75">
              {selectedFile && selectedFile.type === 'pdf' && (
                <PDFReader fileUri={selectedFile.uri} />
              )}
            </View>
          </View>
        </Modal>


        {/* {selectedFile && selectedFile.type === 'pdf' && (
          <PDFReader fileUri={selectedFile.uri} />
        )} */}
        {/* {audioUrl && <AudioPlayer audioUrl={audioUrl} />} */}
      </View>
    </SafeAreaView>
  );
};

export default Processed;
