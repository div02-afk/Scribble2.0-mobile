import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  BackHandler,
  Pressable,
} from "react-native";
import socket from "./socket";
import store from "./store";
import { useFocusEffect } from "@react-navigation/native";

export default function WordChoice() {
  const name = store.getState().name;
  const roomKey = store.getState().roomKey;
  let words = store.getState().words;
// const words = ["hello","i","am","a"]
  //   while (words === undefined) {
  //     words = store.getState().words;
  //   }
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    // console.log("selectedBy", store.getState().selectedBy);
    if (store.getState().selectedBy === name) {
      setVisible(false);
    }
  });

  useEffect(() => {
    socket.on("selectedWord", (data) => {
      store.dispatch({ type: "selectedBy", payload: data.selectedBy });
      //   console.log("selected word from server", data.selectedBy);
    });
  }, [socket]);
  function selectWord(word) {
    const data = {
      word: word,
      room: roomKey,
      selectedBy: name,
    };
    store.dispatch({ type: "selectedBy", payload: name });
    socket.emit("word", data);

    setVisible(false);
  }
  useFocusEffect(
    React.useCallback(() => {
      // Reset state when the component is focused
      setVisible(true);
    }, [])
  );
  return (
    <>
        {visible && (
          <>
            <Text>Choose a word</Text>
      <View style = {styles.main}>
            <View style = {styles.container}>
              {words.map((word, index) => (
                <Pressable
                  key={index}
                  onPress={() => selectWord(word)}
                  style={styles.actionButton}
                >
                  <Text style={styles.playerText}>{word}</Text>
                </Pressable>
              ))}
            </View>
      </View>
          </>
        )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    // maxHeight: 200,
    minHeight: 200,
    // height: 300,
    width: 400,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    zIndex: 1,
    // backgroundColor : "red"
  },
  main:{
    flex: 1,
    marginTop: 300,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  playerText: {
    width: 100,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    
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
    width: 150,
    height: 70,
    margin: 10,
  
    backgroundColor: "#FFE66D",
  },
});
