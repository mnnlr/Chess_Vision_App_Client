import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import WaveInput from '../componenet/WaveInput';
import { useNavigation } from '@react-navigation/native';
const Register = () => {
  const navigation = useNavigation(); 

  const[name,setName] = useState('');
  const [email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[isButtonEnabled, setIsButtonEnabled] =useState(false)

  useEffect(()=>{
   
    if(name.length > 0 && validateEmail(email) && password.length >=6 ){
      setIsButtonEnabled(true);
    } else{
      setIsButtonEnabled(false);
    }
  },[name,email,password]);

  const validateEmail =(email) =>{
    // const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <View style={styles.container}>
      <View style={styles.gradientContainer}>
        <View style={styles.gradientCircle} />
        <View style={styles.gradientCircle2} />
        <View style={styles.gradientCircle3} />
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Create an Account</Text>
        <View style={styles.inputContainer}>
          <WaveInput label="Name" value={name} onChangeText={setName}/>
          <WaveInput label="Email"  value={email} onChangeText={setEmail}/>
          <WaveInput label="Password" value={password} onChangeText={setPassword} />
        </View>
        <TouchableOpacity 
        onPress={() => navigation.navigate('Home')} 
        style={[styles.button, !isButtonEnabled && { backgroundColor: 'gray' }]}
        disabled={!isButtonEnabled}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#55AD9B',
  },
  gradientContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientCircle: {
    width: 100,
    height: 100,
    borderRadius: 50, 
    backgroundColor: 'rgba(216, 239, 211, 0.5)', 
    position: 'absolute',
    bottom: 10,
    right: 10,
    opacity: 0.2,
  },
  gradientCircle2: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(216, 239, 211, 0.5)', 
    position: 'absolute',
    top: 30,
    left: 50,
    opacity: 0.2,
  },
  gradientCircle3: {
    width: 200,
    height: 200,
    borderRadius: 100, 
    backgroundColor: 'rgba(216, 239, 211, 0.5)', 
    position: 'absolute',
    top: 100,
    right: 50,
    opacity: 0.2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#D8EFD3',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Register;
