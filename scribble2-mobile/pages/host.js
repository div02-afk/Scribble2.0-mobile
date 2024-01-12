import React, { useState, useEffect } from "react";
// import Clipboard from '@react-native-clipboard/clipboard';
import * as Clipboard from "expo-clipboard";

import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  BackHandler,
  Pressable,
} from "react-native";
import store from "../components/store";
import PlayerList from "../components/playerlist";
import socket from "../components/socket";

export default function Join({ navigation, onBackPress }) {
  const [hostName, setHostName] = useState("");
  const [Joined, setJoined] = useState(false);
  const [roomKey, setRoomKey] = useState("");
  const notify = (e) => {
    console.log(e);
  };
  const createRoom = async () => {
    console.log("hostname", hostName.length);
    if (hostName.length === 0) {
      // alert("enter a valid name");
      notify("Enter a valid name");
      return;
    }
    console.log("creating room");
    const uniqueID = new Date().getTime().toString();
    const data = {
      room: uniqueID,
      hostName: hostName,
      playerList: [],
      started: false,
      chance: 0,
      words: [],
      word: "",
    };
    const playerData = {
      room: uniqueID,
      playerName: hostName,
      justJoin: false,
    };
    console.log("Creating Room Now");
    socket.emit("createRoom", data);
    console.log(uniqueID);
    // await AsyncStorage.setItem("roomKey", uniqueID);
    // await AsyncStorage.setItem("name", hostName);
    store.dispatch({ type: "roomKey", payload: uniqueID });
    store.dispatch({ type: "name", payload: hostName });
    socket.emit("joinRoom", playerData);
    setRoomKey(uniqueID);
    setJoined(true);
  };
  const startGame = async () => {
    console.log("starting");
    await socket.emit("startGame", roomKey);
    navigation.navigate("Player", { name: "Player" });
    setJoined(false);
    setHostName("");
    // window.location.href = "/player";
  };
  useEffect(() => {
    const backhandling = () => {
      if (onBackPress) {
        socket.emit("leaveRoom", roomKey);
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
  }, [onBackPress, navigation]); // Ensure to include onBackPress and navigation in the dependencies array

  return (
    <View style={styles.container}>
      
      {!Joined && (
        <>
          <Text style={styles.text}>Hosting a new Game</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Host Name"
            value={hostName}
            onChangeText={(text) => setHostName(text)} // Use onChangeText instead of onChange
          />
        <View style = {styles.animation}></View>
          <Pressable onPress={createRoom} style={styles.actionButton}>
            <Text style={styles.buttonText}>Create Room</Text>
          </Pressable>
        </>
      )}
      {Joined && (
        <>
          {/* <Text> Loading playerList</Text> */}
          <PlayerList />
          {/* <Text style = {styles.text}>Click to Copy</Text> */}
          <Text style = {styles.text}>Room Key</Text>
          <Text selectable = {true} style=  {styles.copyText}>{roomKey}</Text>
          <Pressable onPress={startGame} style={[styles.actionButton,styles.actionButton2]}>
            <Text style={styles.buttonText}>Start</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 10,
  },
  copyText:{
    fontWeight: "bold",
    fontSize: 15,
    backgroundColor: "gray",
    borderRadius: 10,
    padding:5,
    marginBottom: 10,
  },
  animation:{
    height: 300,
    width: 300,
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: 100,
  },
  inputStyle: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,

    width: 300,
    marginTop: 20,
    padding:5,
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 25,
  },
  actionButton: {
    shadowColor: "black",
    shadowRadius: 10,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: 200,
    marginTop: "20%",
    backgroundColor: "#FFE66D",
  },
  actionButton2: {
    marginTop:"70%",
  },
});
