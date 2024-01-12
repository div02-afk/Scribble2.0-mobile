import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  BackHandler,
} from "react-native";
import socket from "./socket";
import store from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function playerList() {
  const [players, setPlayerList] = useState([]);
  const size  = players.length;
  console.log(players);
  useEffect(() => {
    console.log("playerList:", players);
    socket.on("players", (data) => {
      console.log("playerList:", data.playerList);
      store.dispatch({ type: "playerList", payload: data.playerList });
      setPlayerList(data.playerList);
    });
  }, [socket]);

  return (<>
      <Text style={styles.text}>Players</Text>
    <View style={styles.container}>
      {size === 0 && <Text>Waiting for players to join</Text>}
      {players.map((player, index) => (
        <Text key={index} style={styles.playerText}>
          {player}
        </Text>
      ))}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 200,
    minHeight: 50,
    height: "auto",
    width:300,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop:20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 10,
  },
  playerText: {
    width:100,
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
});