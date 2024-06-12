import { View, StyleSheet, Text, ProgressBar } from 'react-native';

const HorizontalProgressBar = ({ downloadProgress, style }) => {
  return (
    <View style={[styles.progressBarContainer, style]}>
      <ProgressBar
        progress={downloadProgress}
        style={styles.progressBar}
        trackColor="#ddd"
        color="#007bff" // Customize color as desired
      />
      <Text style={styles.progressText}>{downloadProgress * 100}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', // Adjust width as needed
  },
  progressBar: {
    flex: 1,
    height: 10, // Adjust height as desired
    borderRadius: 5, // Optional rounded corners
  },
  progressText: {
    marginLeft: 10, // Adjust margin as desired
  },
});

export default HorizontalProgressBar;