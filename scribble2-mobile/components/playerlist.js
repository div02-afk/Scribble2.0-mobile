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
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function playerList() {
  const [players, setPlayerList] = useState([]);
  console.log(players);
  useEffect(() => {
    console.log("playerList:", players);
    const save = async (data) => {
      await AsyncStorage.setItem("playerList", JSON.stringify(data.playerList));
    };
    socket.on("players", (data) => {
      console.log("playerList:", data.playerList);
      save(data);
      setPlayerList(data.playerList);
    });
  }, [socket]);

  return <>
    <View>
    {players.map((player,index) => (
          // {console.log(player)}
          <Text key = {index}>{player}</Text>
        ))}
    </View>
  </>;
}
