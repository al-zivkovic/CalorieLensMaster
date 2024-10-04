import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import { OpenAI } from 'openai';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import ReactNativeModal from 'react-native-modal';

import { icons } from '../../constants';
import { GPT4_API_KEY } from '@env';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [torch, setTorch] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const cameraRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [nutritionData, setNutritionData] = useState({ calories: 0, protein: 0, fat: 0, carbs: 0 });

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleTorch() {
    setTorch((current) => !current);
  }

  // Capture and send image to GPT-4 for analysis (hypothetical case)
  async function takePhotoAndAnalyze() {
    if (cameraRef.current) {
      const photo = await (cameraRef.current as any).takePictureAsync();
      setPhotoUri(photo.uri);

      const compressedImage = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 900 } }], // Further reduce the image resolution
        { compress: 0.4, format: ImageManipulator.SaveFormat.JPEG } // Lower compression
      );

      const base64Image = await FileSystem.readAsStringAsync(photo.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setLoading(true);
      try {
        // Hypothetical GPT-4 API call for image processing (which doesn't exist)
        const openai = new OpenAI({
          apiKey: GPT4_API_KEY,
        });
        const prompt = 
          `You are a nutrition expert.

          Based on the visual characteristics of the meal on this plate (such as portion sizes, colors, and general appearance),
          estimate the possible types of food present and provide a basic nutritional breakdown.
          If the exact food items are not clear, suggest general categories like vegetables, proteins, grains, etc.,
          and provide an estimate of calories, macronutrients (protein, fat, carbohydrates),
          and other relevant nutritional data. You can also mention common meal ingredients or
          combinations based on typical dishes.

          Please respond with only this information in the following format:

          Calories: xxx
          Protein: xxx
          Fat: xxx
          Carbs: xxx
          `;
          
        const response = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { 
              role: 'user',
              content: [
                { type: 'text', text: prompt },
                { type: 'image_url', image_url: {
                    url: `data:image/jpeg;base64,${base64Image}`
                }},
              ]
            }
          ]
        })

        // Assuming response contains your result in the text field
        setResults(response.choices[0].message.content);
        setModalVisible(true);
      } catch (error) {
        console.error('Error analyzing image: ', error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <View style={styles.container}>
      {photoUri && (
        <Image
          source={{ uri: photoUri }}
          style={{ width: '100%', height: 300, resizeMode: 'cover' }}
        />
      )}

      {loading && 
        <View style={styles.loaderContainer}>
          <ActivityIndicator size='large' color="#00ff00" />
          <Text>Analyzing image...</Text>
        </View>
      }

      {!photoUri && (
        <CameraView
          style={styles.camera}
          facing={facing}
          enableTorch={torch}
          ref={cameraRef}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.flashButton} onPress={toggleTorch}>
              <Image source={icons.torch} style={styles.iconSmall} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={takePhotoAndAnalyze}>
              <Image source={icons.camera} style={styles.iconLarge} />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}

      <ReactNativeModal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Nutrition Breakdown</Text>
          
          <View style={styles.nutrientContainer}>
            <Text style={styles.nutrientLabel}>Calories</Text>
            <Text>{results}</Text>
          </View>

          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </ReactNativeModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loaderContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 30,
    width: '100%',
  },
  flashButton: {
    position: 'absolute',
    left: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 5,
    opacity: 0.8,
  },
  cameraButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 5,
    opacity: 0.9,
  },
  iconSmall: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  iconLarge: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  nutrientContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  nutrientLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
