import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

const PDFReader = ({ fileUri }) => {
  return (
    <View style={{ flex: 1 }}>
      <WebView 
        source={{ uri: fileUri }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default PDFReader;