import { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [processedFiles, setProcessedFiles] = useState([]);

  return (
    <AppContext.Provider value={{ audioUrl, setAudioUrl, processedFiles, setProcessedFiles }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
