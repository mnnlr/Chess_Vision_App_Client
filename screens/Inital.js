import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import img1 from '../assets/background.jpeg';  // Ensure this path is correct

const Inital = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={img1} style={styles.background}>
        <View style={styles.overlay} />
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Play chess </Text>
            <Text style={styles.text}>and be Smart </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.texts}>Play with your Friends and Families </Text>
            <Text style={styles.texts}> </Text>
          </View>
          <View style = {{position:'absolute',bottom:10,alignSelf:'center',justifyContent:'center',alignItems:'center',}}>
         <View style = {{backgroundColor : "#D8EFD3",borderRadius:10,padding:10,marginRight:10,paddingHorizontal : 90 }}><Text style = {{color:'black',fontSize:20,fontWeight:'bold',marginBottom:10}}>Sign up</Text></View>
         <View style = {{backgroundColor : "#D8EFD3",borderRadius:10,padding:10,marginRight:10,paddingHorizontal : 90, marginTop : 10 }}><Text style = {{color:'black',fontSize:20,fontWeight:'bold',marginBottom:10, }}>Sign in</Text></View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Inital;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity: 0.5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    padding: 10,
  
    fontSize: 90,
    letterSpacing: 2, 
    textAlign: 'center', 
  
  },
  text: {
    fontSize: 44,
    color: 'white',
  },
  texts: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
});
