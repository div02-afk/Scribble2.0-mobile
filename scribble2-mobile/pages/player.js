import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import ShowDrawing from "../components/showDrawing";
import socket from "../components/socket";
import store from "../components/store";
import WordChoice from "../components/wordChoice";
import Draw from "../components/draw";
const findIndex = (name, playerList) => {
  for (let i = 0; i < playerList.length; i++) {
    if (playerList[i] === name) {
      return i;
    } else {
      console.log("current name: ", playerList[i]);
    }
  }
};

export default function Player({ navigation, onBackPress }) {
  const name = store.getState().name;
  const roomKey = store.getState().roomKey;

  const [words, setWords] = useState([]);
  const [chance, setChance] = useState(0);
  const [myChance, setMyChance] = useState(false);

  useEffect(() => {
    const backhandling = () => {
      if (onBackPress) {
        socket.emit("leaveRoom", {room: roomKey, playerName: name});
        socket.disconnect();
        socket.connect();
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

  useEffect(() => {
    socket.on("chance", (data) => {
      store.dispatch({ type: "chance", payload: data.chance });
      store.dispatch({ type: "words", payload: data.words });
      console.log("words", data.words);
      setWords(data.words);
      setChance(data.chance);
      //   AsyncStorage.setItem("chance", data.chance);
    });
    socket.on("selectedWord", (data) => {
      console.log("selected word:", data);
      // AsyncStorage.setItem("word",data.word);
      store.dispatch({ type: "word", payload: data.word });
      store.dispatch({ type: "selectedBy", payload: data.selectedBy });
      // AsyncStorage.setItem("selectedBy", data.selectedBy);
    });
  }, [socket]);
  useEffect(() => {
    socket.emit("joinRoom", {
      room: roomKey,
      playerName: name,
      justJoin: true,
    });
  }, []);
  useEffect(() => {
    setChance(store.getState().chance) || 0;
    const playerList = store.getState().playerList;
    console.log("playerList", playerList);
    // console.log("name", name);
    const index = findIndex(name, playerList);
    console.log("current chance", chance);
    console.log("index", index);
    if (chance == index) {
      setMyChance(true);
      // console.log("my chance");
    } else {
      setMyChance(false);
    }
  }, [chance]);
  console.log("my chance", myChance);

  return (
    <>
      {myChance === false ? (
        <>
          <Text>opponent</Text>
          <ShowDrawing />
        </>
      ) : words.length === 0 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text>Player Screen</Text>
          {myChance && <WordChoice />}
          {myChance && <Draw />}
        </View>
      )}
    </>
  );
}
