import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  BackHandler,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import React from "react";
export default function Home({ navigation }) {
  //   const [isHost, setIsHost] = useState(false);
  //   const [isJoin, setIsJoin] = useState(false);

  const hosting = () => {
    navigation.navigate("Host", { name: "Host" });
  };
  const joining = () => {
    navigation.navigate("Join", { name: "Join" });
  };

  useEffect(() => {
    const backhandling = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backhandling);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backhandling);
    };
  });

  return (
    <View>
      <>
        <Text>Home Screen</Text>
        <Button title="Host" onPress={hosting} />
        <Button title="Join" onPress={joining} />
      </>
    </View>
  );
}
