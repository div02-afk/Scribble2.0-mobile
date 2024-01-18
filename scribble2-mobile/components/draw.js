import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  Canvas,
  DrawingTool,
} from '@benjeau/react-native-draw';

export default function Draw() {
  const [brushSizeModalVisible, setBrushSizeModalVisible] = useState(false);
  const [brushSize, setBrushSize] = useState(3); // Default brush size
  const canvasRef = React.useRef(null);
  const handleUndo = () => {
    canvasRef.current.undo();
  };

  const handleClear = () => {
    canvasRef.current.clear();
  };

  const handleBrushSizePress = () => {
    setBrushSizeModalVisible(true);
  };

  const selectBrushSize = (size) => {
    setBrushSize(size);
    setBrushSizeModalVisible(false);
  };

  const brushSizeOptions = [1, 3, 5, 7]; // Add more options if needed

  return (
    <>
      <View>
        <Text>HEllo</Text>
        <View style={styles.options}>
          <Pressable onPress={handleClear}>
            <Text>Clear</Text>
          </Pressable>
          <Pressable onPress={handleUndo}>
            <Text>Undo</Text>
          </Pressable>
          <TouchableOpacity onPress={handleBrushSizePress}>
            <Text>Brush Size: {brushSize}</Text>
          </TouchableOpacity>
        </View>
        <Canvas
        ref={canvasRef}
          style={{
            height: 400,
            width: "100%",
            borderWidth: 1,

            borderColor: "#000000",
          }}
          strokeColor={"#000000"}
          thickness={brushSize}
        />
      </View>

      {/* Brush Size Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={brushSizeModalVisible}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={brushSizeOptions}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectBrushSize(item)}>
                <Text style={styles.modalItem}>Size: {item}</Text>
              </TouchableOpacity>
            )}
          />
          <Pressable onPress={() => setBrushSizeModalVisible(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  options:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    minHeight: 50,
    // backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
  },
  modalContainer: {
    position: "absolute",
    // top: 220, // Adjust this value based on your layout
    bottom:30,
    right: 10, // Adjust this value based on your layout
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalItem: {
    fontSize: 18,
    padding: 10,
  },
  closeButton: {
    fontSize: 18,
    padding: 10,
    color: "blue",
  },
});
