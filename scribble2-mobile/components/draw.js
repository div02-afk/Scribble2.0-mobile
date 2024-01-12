import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, BackHandler } from 'react-native';
import socket from './socket';
import store from './store';
import { Canvas } from '@benjeau/react-native-draw';

export default function Draw() {
  return (
    <>
      <Canvas/>
    </>
  )
}