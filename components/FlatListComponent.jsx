import React from "react";
import { FlatList, View, Text, Button } from "react-native";

const FlatListComp = ({ files, playSound }) => {
  return (
    <View>
      <FlatList
        data={files}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View>
            <Text>{item}</Text>
            <Button title="Play" onPress={() => playSound(item)} />
          </View>
        )}
      />
    </View>
  )
}

export default FlatListComp;


