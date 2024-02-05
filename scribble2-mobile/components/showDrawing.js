import { Image, View, StyleSheet, Text } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import socket from "./socket";
import { Canvas } from "@benjeau/react-native-draw";
export default function ShowDrawing({ navigation, onBackPress }) {
  const [imageData, setImageData] = useState("");
  
  const canvasRef = useRef(null);
  useEffect(() => {
    socket.on("print", (data) => {
      console.log("printing in opponent");
      console.log(canvasRef.current.addPath(data.imageData.path))
      setImageData(data.imageData);
      // canvasRef.current.addPath(data.imageData);
    });
  }, [socket]);

  return (
    <View style={styles.container}>
       <Canvas ref={canvasRef} style={styles.image} 
      enabled = {false}/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "90%",
    height: 400,
    backgroundColor: "white",
    borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    height: 400,
    width: "100%",
  },
});
