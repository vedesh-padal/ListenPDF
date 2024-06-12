import React, { useState, useEffect } from 'react';
import { View, Button, Alert, TouchableOpacity, Text } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';
import AudioPlayerButton from './AudioPlayerButton';
import Slider from '@react-native-community/slider';

export default function AudioPlayer({ extractedText, isLoading, setIsLoading, audioUrl, setAudioUrl, audioDurationSrc, refresh, setRefresh }) {
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1.0);
  const [audioPosition, setAudioPosition] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [sound, setSound] = useState(null);

  // const tts = async () => {
  //   setIsLoading(true);
  //   console.log(extractedText);
  //   const data = {
  //     content: extractedText
  //   };

  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   };

  //   try {
  //     const apiResponse = await axios.post('', data, config);
  //     console.log(apiResponse.data.fileUrl);
  //     setIsLoading(false);
  //     return apiResponse.data.fileUrl;
      
  //   } catch (error) {
  //     console.log("Error while converting to voice",  error);
  //     Alert.alert("Error while converting to voice", "Please try again later...");
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   // Load the audio file and set up audio player
  //   console.log('sound is being reset here')
  //   // if (sound === null) {
  //     const loadAudio = async () => {
  //       const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
  //       console.log('sound changed');
  //       setSound(sound);
  //       const duration = await sound.getStatusAsync();
  //       setAudioDuration(duration.durationMillis / 1000);
  //     };
  //     loadAudio();
  //   // }
  // }, [ audioUrl ]);

  useEffect(() => {
    // Update audio position
    const updateAudioPosition = async () => {
      if (sound !== null && isPlaying) {
        const status = await sound.getStatusAsync();
        setAudioPosition(status.positionMillis / 1000);
      }
    };

    const intervalId = setInterval(updateAudioPosition, 1000);

    return () => clearInterval(intervalId);
  }, [sound, isPlaying]);


  async function handlePlayPause() {

    try {
      // if (sound === null) return;

      // if (isPlaying) {
      //   await sound.pauseAsync();
      // } else {
      //   await sound.playAsync();
      // }
      // setIsPlaying(!isPlaying);


      if (sound) {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
      } else {
        // const audioUrl = await tts();
        if (audioUrl) {
          // setRefresh(false);
          try {
            const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
            const duration = await newSound.getStatusAsync();
            setAudioDuration(duration.durationMillis / 1000);
            setSound(newSound);
            // setAudioUrl(null);
            await newSound.playAsync();
            setIsPlaying(true);
          } catch (error) {
            console.error("Error playing audio:", error);
            Alert.alert("Error playing audio", "Please try again later...");
          }
        }
      }

    } catch (error) {
      console.error('Error toggling playback:', error.message);
    }
 
  }

  const handleSeek = async (value) => {
    try {
      if (sound !== null) {
        await sound.setPositionAsync(value * 1000);
      }
    } catch (error) {
      console.error('Error seeking:', error.message);
    }
  };

  async function handleSeekForward() {
    if (sound) {
      const currentPosition = await sound.getStatusAsync();
      await sound.setPositionAsync(currentPosition.positionMillis + 10000);
    }
  }

  async function handleSeekBackward() {
    if (sound) {
      const currentPosition = await sound.getStatusAsync();
      await sound.setPositionAsync(currentPosition.positionMillis - 10000);
    }
  }

  async function increaseSpeed() {
    if (sound) {
      await sound.setRateAsync((playSpeed + 0.15), true);
      setPlaySpeed(Math.round((playSpeed + 0.15)*100)/100);
      // Math.round(metadata.format.duration * 100) / 100;
    }
  }

  async function decreaseSpeed() {
    if (sound) {
      await sound.setRateAsync((playSpeed - 0.15), true);
      setPlaySpeed(Math.round((playSpeed - 0.15)*100)/100);
    }
  }

  const formatTime = (seconds) => {
    // Function to format time in seconds to HH:MM:SS format
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.floor(minutes % 60);
    return `${hours}:${remainingMinutes}:${remainingSeconds}`;
  };

  return (
    <>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 300 }}>
            <Text className='text-white'>{formatTime(audioPosition)}</Text>
            <Text className='text-black bg-slate-300 border rounded-lg w-10 h-6 text-sm text-center pt-[2px]'> x{ playSpeed } </Text>
            <Text className='text-white'>{formatTime(audioDuration)}</Text>
          </View>

          <Slider
            style={{ width: 300 }}
            minimumValue={0}
            maximumValue={audioDuration}
            value={audioPosition}
            onSlidingComplete={handleSeek}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor="#FFFFFF"
          />
      </View>   

      <View className='flex-row space-x-2 justify-center items-center mt-2'>
        <Text> <AudioPlayerButton type='slow' handlePress={() => decreaseSpeed()} /> </Text>
        
        <Text> <AudioPlayerButton type='10back' handlePress={handleSeekBackward} /> </Text>

        <Text>
          { isPlaying ? (
            <AudioPlayerButton type='pause' handlePress={handlePlayPause} />
            ) : (
              <AudioPlayerButton type='play' handlePress={handlePlayPause} />
            )
          }
        </Text>

        <Text> <AudioPlayerButton type='10forward' handlePress={handleSeekForward} /> </Text>
        
        <Text> <AudioPlayerButton type='fast' handlePress={() => increaseSpeed()} /> </Text>
        
      </View>
    </>
  );
}
