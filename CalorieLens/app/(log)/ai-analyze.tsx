import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { OpenAI } from 'openai';

import { icons } from '../../constants';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [torch, setTorch] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleTorch() {
    // Toggle the torch
    setTorch((current) => !current);
  }

  async function takePhoto() {
    if (cameraRef.current) {
      const photo = await (cameraRef.current as any).takePictureAsync();
      console.log(photo.uri); // Handle the photo as needed
    }
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        enableTorch={torch}
        ref={cameraRef} // Attach the ref to the CameraView component
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.flashButton} onPress={toggleTorch}>
            <Image source={icons.torch} style={styles.iconSmall} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Align center
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 30, // Adjusts the position of the buttons to the bottom
    width: '100%', // Makes the container take full width
  },
  flashButton: {
    position: 'absolute',
    left: 30, // Align the flash button to the left
    width: 60, 
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 5, // Optional: Add shadow for a better look
    opacity: 0.8, // Optional: Make the button semi-transparent
  },
  cameraButton: {
    width: 80, // Camera button size
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 5,
    opacity: 0.9,
  },
  iconSmall: {
    width: 30, // Smaller icon size for flash
    height: 30,
    resizeMode: 'contain',
  },
  iconLarge: {
    width: 50, // Larger icon for camera button
    height: 50,
    resizeMode: 'contain',
  },
});
