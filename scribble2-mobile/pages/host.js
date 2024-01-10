import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  BackHandler,
} from "react-native";
import PlayerList from "../components/playerlist";
import socket from "../components/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Join({ navigation, onBackPress }) {
  const [hostName, setHostName] = useState("");
  const [Joined, setJoined] = useState(false);
  const [roomKey,setRoomKey]   = useState("");
  const notify = (e) => {
    console.log(e);
  };
  const createRoom = async() => {
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
    await AsyncStorage.setItem("roomKey", uniqueID);
    await AsyncStorage.setItem("name", hostName);
    socket.emit("joinRoom", playerData);
    setRoomKey(uniqueID);
    setJoined(true);
  };
  const startGame = async () => {
    console.log("starting");
    await socket.emit("startGame", roomKey);
    navigation.navigate("Player", {name:"Player"});
    // window.location.href = "/player";

  };
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
  }, [onBackPress, navigation]); // Ensure to include onBackPress and navigation in the dependencies array

  return (
    <View>
      {!Joined && (
        <>
          <Text>Join Screen</Text>
          <TextInput
            placeholder="Host Name"
            value={hostName}
            onChangeText={(text) => setHostName(text)} // Use onChangeText instead of onChange
          />
          <Button title="Create Room" onPress={() => createRoom()} />
        </>
      )}
      {Joined &&<>
        <Text> Loading playerList</Text>
        <PlayerList/>
        <Text>Click to Copy</Text>
        <Text>{roomKey}</Text>
        <Button title= "Start Game" onPress={startGame}></Button>
      </>}
    </View>
  );
}
