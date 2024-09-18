// import React, { useState, useEffect } from 'react';
// import { View, TouchableOpacity, Image, StyleSheet, Text, Platform, ScrollView,Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// const ImagePickerScreen = () => {
//   const [imageUri, setImageUri] = useState(null);

//   const requestPermission = async () => {
//     if (Platform.OS !== 'web') {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         alert('Sorry, we need camera roll permissions to make this work!');
//       }
//     }
//   };


//   const validateChessboard = async (imageUri) => {
//     if (imageUri.toLowerCase().includes('chessboard')) {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const isValid = await validateChessboard(result.assets[0].uri)
//       if(isValid){
//         setImageUri(result.assets[0].uri);
//       } else{
//         Alert.alert('Invalid Image', 'Could not find a chessboard in the selected image.');
//       }
//       }
      
//     };
  

//   const takePhoto = async () => {
//     const result = await ImagePicker.launchCameraAsync({
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const isValid = await validateChessboard(result.assets[0].uri);
//       if(isValid){
//         setImageUri(result.assets[0].uri);
//       } else {
//         Alert.alert('Invalid Image', 'Could not find a chessboard in the selected image.');
//       }
//       }
      
//     }
  

//   useEffect(() => {
//     requestPermission();
//   }, []);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>


//       <TouchableOpacity style={styles.button} onPress={takePhoto}>
//         <Text style={styles.buttonText}>Take Photo</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button} onPress={pickImage}>
//         <Text style={styles.buttonText}>Choose from Gallery</Text>
//       </TouchableOpacity>

//       {imageUri && (
//         <Image
//           source={{ uri: imageUri }}
//           style={styles.image}
//           resizeMode="contain"
//         />
//       )}
//     </ScrollView>
//   );
// };

// export default ImagePickerScreen;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   button: {
//     backgroundColor: '#669c59',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 25,
//     marginVertical: 10,
//     width: '80%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   image: {
//     width: '100%',
//     height: undefined,
//     aspectRatio: 1,
//     marginTop: 20,
//   },
// });

import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, Text, Platform, ScrollView, Alert, Animated, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GestureHandlerRootView, PinchGestureHandler, PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';

const ImagePickerScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const doubleTapRef = useRef(null);

  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const lastScale = useRef(1);

  const requestPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'We need camera roll permissions to make this work!');
      }
    }
  };

  const pickImage = async (sourceType) => {
    let result;
    const options = {
      quality: 1,
      allowsEditing: true,
      aspect: [4, 3],
    };

    if (sourceType === 'camera') {
      result = await ImagePicker.launchCameraAsync(options);
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        ...options,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
    }

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const onPinchEvent = Animated.event(
    [{ nativeEvent: { scale: pinchScale } }],
    { useNativeDriver: false }
  );

  const onPanEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: false }
  );

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale.current *= event.nativeEvent.scale;
      baseScale.setValue(lastScale.current);
      pinchScale.setValue(1);
    }
  };

  const onPanStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  const onDoubleTap = () => {
    let toValue;
    if (lastScale.current > 1) {
      toValue = 1;
    } else {
      toValue = 2;
    }

    Animated.spring(baseScale, {
      toValue,
      useNativeDriver: false,
    }).start();

    lastScale.current = toValue;
  };

  const animatedScale = Animated.multiply(baseScale, pinchScale);

  const animatedStyle = {
    transform: [
      { scale: animatedScale },
      { translateX: translateX },
      { translateY: translateY },
    ],
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => pickImage('camera')}>
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => pickImage('gallery')}>
            <Text style={styles.buttonText}>Choose from Gallery</Text>
          </TouchableOpacity>
        </View>

        {imageUri && (
          <TapGestureHandler
            ref={doubleTapRef}
            numberOfTaps={2}
            onActivated={onDoubleTap}
          >
            <Animated.View>
              <PanGestureHandler
                onGestureEvent={onPanEvent}
                onHandlerStateChange={onPanStateChange}
              >
                <Animated.View>
                  <PinchGestureHandler
                    onGestureEvent={onPinchEvent}
                    onHandlerStateChange={onPinchStateChange}
                  >
                    <Animated.Image
                      source={{ uri: imageUri }}
                      style={[styles.image, animatedStyle]}
                      resizeMode="contain"
                    />
                  </PinchGestureHandler>
                </Animated.View>
              </PanGestureHandler>
            </Animated.View>
          </TapGestureHandler>
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#669c59',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});

export default ImagePickerScreen;
