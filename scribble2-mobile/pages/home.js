import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  BackHandler,
  Alert,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import React from "react";

export default function Home({ navigation }) {

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
    <View style = {styles.container}>

        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Pressable  onPress={hosting} style = {styles.actionButton}>
          <Text style= {styles.text}>Host</Text>
        </Pressable>
        <Pressable  onPress={joining} style = {styles.actionButton}>
          <Text style= {styles.text}>Join</Text>
        </Pressable>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text:{
    fontWeight: 'bold',
    fontSize: 25,
  },
  actionButton: {
    shadowColor: 'black',
    shadowRadius: 10,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: 200,
    margin:10,
    backgroundColor: "#FFE66D",
  },
});
