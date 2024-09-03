// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Alert, Platform, Pressable, Image, Dimensions } from 'react-native';
// import * as DocumentPicker from 'expo-document-picker';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// const { width, height } = Dimensions.get('window');

// const EbookUploadScreen = () => {
//     const [selectedEbook, setSelectedEbook] = useState(null)
//     const navigation = useNavigation();
//     const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

//     const pickDocument = async () => {
//         try {
//             const result = await DocumentPicker.getDocumentAsync({
//                 type: Platform.OS === 'ios'
//                     ? ['com.adobe.pdf', 'org.idpf.epub']
//                     : ['application/epub+zip', 'application/pdf'],
//                 copyToCacheDirectory: true,
//             });

//             if (result.assets && result.assets.length > 0) {
//                 const file = result.assets[0];
//                 setSelectedEbook(file);
//                 Alert.alert('Success', `Ebook selected: ${file.name}`);
//             } else {
//                 console.log('Document picking cancelled or failed');
//                 Alert.alert('Info', 'No document was selected');
//             }
//         } catch (err) {
//             console.error('Error picking document:', err);
//             Alert.alert('Error', 'Failed to pick ebook. Please try again.');
//         }
//     };

//     const uploadEbook = () => {
//         if (selectedEbook) {
//             console.log('Uploading ebook:', selectedEbook.name);
//             Alert.alert('Upload', 'Ebook upload started (simulated)');
//         } else {
//             Alert.alert('Error', 'Please select an ebook first');
//         }
//     };


// console.log(selectedEbook,"selected Eboook")

//     return (
//         <View style={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#F5F5F5' }]}>
//             <View style={[styles.firstContainer, { backgroundColor: isDarkTheme ? '#333' : '#55AD9B' }]}>
//                 <View style={styles.arrowContainer}>
//                     <Pressable onPress={() => navigation.goBack()} style={styles.circle}>
//                         <Image source={require('../assets/Arrowback.png')} style={styles.arrowIcon} />
//                     </Pressable>
//                     <Text style={[styles.settingsText, { color: isDarkTheme ? '#fff' : '#000' }]}>Ebook Reader</Text>
//                 </View>
//             </View>
//             <View style={styles.secondContainer}>
//                 <Pressable style={styles.button} onPress={pickDocument}>
//                     <Text style={styles.buttonText}>Select Ebook</Text>
//                 </Pressable>
//                 {selectedEbook && (
//                 <Text style={styles.fileInfo}>Selected: {selectedEbook.name}</Text>
//             )}
               
//                 <Pressable
//                     style={[styles.button, !selectedEbook && styles.disabledButton]}
//                     onPress={uploadEbook}
//                     disabled={!selectedEbook}
//                 >
//                     <Text style={styles.buttonText}>Upload Ebook</Text>
//                 </Pressable>

//                 {selectedEbook ? (
//                     <Pressable style={styles.button} >
//                         <Text style={styles.buttonText}>Open Ebook</Text>
//                     </Pressable>
//                 ) : (
//                     <Text style={styles.fileInfo}>No ebook selected</Text>
//                 )}

//             </View>
//         </View>
//     );
// };

// export default EbookUploadScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     button: {
//         width: '90%',
//         paddingVertical: height * 0.015,
//         borderRadius: 40,
//         alignItems: 'center',
//         marginBottom: '10%',
//         backgroundColor: "#95D2B3"
//     },
//     disabledButton: {
//         backgroundColor: '#A0A0A0',
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 16,
//         textAlign: 'center',
//     },
//     fileInfo: {
//         marginTop: 10,
//         fontSize: 16,
//     },
//     firstContainer: {
//         width: '100%',
//         height: height * 0.12,
//         justifyContent: 'center',
//     },
//     secondContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     arrowContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: '5%',
//         marginTop: '5%',
//     },
//     circle: {
//         width: width * 0.1,
//         height: width * 0.1,
//         borderRadius: (width * 0.1) / 2,
//         marginRight: '5%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderWidth: 1,
//         borderColor: '#fff'
//     },
//     arrowIcon: {
//         width: '60%',
//         height: '60%',
//         resizeMode: 'contain',
//     },
//     settingsText: {
//         fontSize: 24,
//         fontWeight: '400',
//         lineHeight: 32,
//     },
//     pdfContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//     },
//     pdf: {
//         flex: 1,
//         width: width * 0.9,
//         height: height * 0.7,
//         marginTop: 10,
//     },
// });


import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import * as Sharing from 'expo-sharing';
const { width, height } = Dimensions.get('window');

const EbookUploadScreen = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const navigation = useNavigation();
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setSelectedPdf(file);
        Alert.alert('Success', `PDF selected: ${file.name}`);
      } else {
        console.log('Document picking cancelled or failed');
        Alert.alert('Info', 'No document was selected');
      }
    } catch (err) {
      console.error('Error picking document:', err);
      Alert.alert('Error', 'Failed to pick PDF. Please try again.');
    }
  };

  const uploadPdf = () => {
    if (selectedPdf) {
      console.log('Uploading PDF:', selectedPdf.name);
      Alert.alert('Upload', 'PDF upload started (simulated)');
      // Here you would typically implement the actual upload logic
    } else {
      Alert.alert('Error', 'Please select a PDF first');
    }
  };

  const openPdf = async () => {
    if (selectedPdf) {
      try {
        // Copy the file to the document directory
        const newPath = `${FileSystem.documentDirectory}${selectedPdf.name}`;
        console.log('newPath', newPath);
        await FileSystem.copyAsync({
          from: selectedPdf.uri,
          to: newPath,
        });
  
        // Check if the file can be shared
        const isAvailable = await Sharing.isAvailableAsync();
        if (isAvailable) {
          // Share the PDF
          await Sharing.shareAsync(newPath);
        } else {
          Alert.alert('Error', 'Sharing is not available on this device');
        }
      } catch (error) {
        console.error('Error opening PDF:', error);
        Alert.alert('Error', 'Failed to open PDF. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Please select a PDF first');
    }
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#F5F5F5' }]}>
      <View style={[styles.header, { backgroundColor: isDarkTheme ? '#333' : '#55AD9B' }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/Arrowback.png')} style={styles.backIcon} />
        </Pressable>
        <Text style={[styles.headerText, { color: isDarkTheme ? '#fff' : '#000' }]}>PDF Reader</Text>
      </View>
      <View style={styles.content}>
        <Pressable style={styles.button} onPress={pickDocument}>
          <Text style={styles.buttonText}>Select PDF</Text>
        </Pressable>
        {selectedPdf && (
          <Text style={styles.fileInfo}>Selected: {selectedPdf.name}</Text>
        )}
        <Pressable
          style={[styles.button, !selectedPdf && styles.disabledButton]}
          onPress={uploadPdf}
          disabled={!selectedPdf}
        >
          <Text style={styles.buttonText}>Upload PDF</Text>
        </Pressable>
        {selectedPdf && (
          <Pressable style={styles.button} onPress={openPdf}>
            <Text style={styles.buttonText}>Open PDF</Text>
          </Pressable>
        )}
        {!selectedPdf && (
          <Text style={styles.fileInfo}>No PDF selected</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    height: height * 0.1,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    width: '90%',
    paddingVertical: height * 0.015,
    borderRadius: 40,
    alignItems: 'center',
    marginBottom: '5%',
    backgroundColor: "#95D2B3"
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fileInfo: {
    marginVertical: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EbookUploadScreen;



