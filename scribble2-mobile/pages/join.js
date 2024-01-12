import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Pressable,
  BackHandler,
} from "react-native";
import socket from "../components/socket";
import store from "../components/store";
import PlayerList from "../components/playerlist";
export default function Join({ navigation, onBackPress }) {
  const [name, setName] = useState("");
  const [roomKey, setRoomKey] = useState("");
  const [joined, setJoined] = useState(false);
  const join = () => {
    store.dispatch({ type: "name", payload: name });
    store.dispatch({ type: "roomKey", payload: roomKey });
    socket.emit("joinRoom", {
      room: roomKey,
      playerName: name,
      justJoin: false,
    });
    setJoined(true);
  };

  useEffect(() => {
    socket.on("gameStarted", (data) => {
      if (data) {
        navigation.navigate("Player", { name: "Player" });
      }
    });
  }, [socket]);

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
    <View style={styles.container}>
      {!joined && (
        <>
          <Text style={styles.text}>Join a Game</Text>

          <TextInput
            placeholder="Name"
            style={styles.inputStyle}
            onChangeText={(text) => setName(text)}
          />

          <TextInput
            style={styles.inputStyle}
            placeholder="Room Key"
            onChangeText={(text) => setRoomKey(text)}
          />
          <View style={styles.animation}></View>
          <Pressable onPress={join} style={styles.actionButton}>
            <Text style={styles.buttonText}>Join Game</Text>
          </Pressable>
        </>
      )}
      {joined && (
        <>
          <Text style={[styles.text,{marginBottom:50},{marginTop:20}]}>Waiting for host to start the game</Text>
          <PlayerList/>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 25,
  },
  inputStyle: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,

    width: 300,
    marginTop: 20,
    padding: 5,
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
    marginTop: "10%",
    backgroundColor: "#FFE66D",
  },
  animation: {
    height: 300,
    width: 300,
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: 70,
  },
});
