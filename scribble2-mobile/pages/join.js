import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  BackHandler,
} from "react-native";

export default function Join({navigation,onBackPress}) {
  const [name,setName ] = useState("");
  


  useEffect(() => {
    const backhandling = () => {
      if (onBackPress) {
        onBackPress(); // Call the onBackPress function from the props
      } else {
        navigation.goBack();
      }
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", backhandling);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backhandling);
    };
  }, [onBackPress, navigation]);

  return (
    <View>
      <Text>Hello</Text>
      
      <TextInput placeholder="Name" onChangeText={(text) => setName(text)}/>

      <TextInput placeholder="Room Key" onChangeText={(text) => setRoomKey(text)}/>
      <Button title="Join" onPress={console.log("joining")}></Button>
    </View>
  );
}
