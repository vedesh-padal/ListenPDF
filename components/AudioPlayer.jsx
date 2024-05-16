import React, { useState } from 'react';
import { View, Button, Alert, TouchableOpacity, Text } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';
import PlayIcon from '../assets/icons/PlayIcon';
import AudioPlayerButton from './AudioPlayerButton';

export default function AudioPlayer({ extractedText, setIsLoading, audioUrl }) {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1.0);

  const tts = async () => {
    setIsLoading(true);
    console.log(extractedText);
    const data = {
      content: extractedText
    };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const apiResponse = await axios.post('https://asia-south1-seismic-handler-421010.cloudfunctions.net/mini-proj-cloud-fun/tts', data, config);
      console.log(apiResponse.data.fileUrl);
      setIsLoading(false);
      return apiResponse.data.fileUrl;
      
    } catch (error) {
      console.log("Error while converting to voice",  error);
      Alert.alert("Error while converting to voice", "Please try again later...");
      setIsLoading(false);
    }
  };


  async function handlePlayPause() {
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
        try {
          const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
          setSound(newSound);
          await newSound.playAsync();
          setIsPlaying(true);
        } catch (error) {
          console.error("Error playing audio:", error);
          Alert.alert("Error playing audio", "Please try again later...");
        }
      }
    }
  }

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
      setPlaySpeed(playSpeed + 0.15);
    }
  }

  async function decreaseSpeed() {
    if (sound) {
      await sound.setRateAsync((playSpeed - 0.15), true);
      setPlaySpeed(playSpeed - 0.15);
    }
  }

  return (
    <View className='flex-row space-x-2'>

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
  );
}
