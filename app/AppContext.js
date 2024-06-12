import { createContext, useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [processedFiles, setProcessedFiles] = useState([]);
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

  const addProcessedFile = async (file) => {
    try {
      const processedFilesDir = `${FileSystem.documentDirectory}processedFiles/`;
      await FileSystem.makeDirectoryAsync(processedFilesDir, { intermediates: true });
      const fileUri = `${processedFilesDir}${file.docName}.json`;
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(file));
      setProcessedFiles((prevFiles) => [...prevFiles, file]);
    } catch (error) {
      console.error('Error saving processed file:', error);
    }
  };

  return (
    <AppContext.Provider value={{ audioUrl, setAudioUrl, processedFiles, setProcessedFiles, addProcessedFile }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
