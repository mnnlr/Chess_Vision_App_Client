import React, { useState, useRef } from 'react';
import { Animated, TextInput, View, StyleSheet, Text } from 'react-native';

const WaveInput = ({ label }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');
  const labelAnimation = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(labelAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    if (text === '') {
      setIsFocused(false);
      Animated.timing(labelAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const labelTranslateY = labelAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const labelScale = labelAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.75],
  });

  const labelColor = labelAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFF', '#FFF'], // Keep color white for both focused and unfocused states
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder=""
        secureTextEntry={label === 'Password'} // Show password input type if label is Password
      />
      <Animated.Text
        style={[styles.label, {
          transform: [
            { translateY: labelTranslateY },
            { scale: labelScale },
          ],
          color: labelColor,
        }]}
      >
        {label}
      </Animated.Text>
      <View style={styles.bar}>
        <Animated.View style={[styles.barLine, { width: isFocused || text.length > 0 ? '50%' : '0%' }]} />
        <Animated.View style={[styles.barLine, { width: isFocused || text.length > 0 ? '50%' : '0%' }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 20,
    width: '100%', // Ensure full width for the input container
  },
  input: {
    fontSize: 16,
    padding: 10,
    paddingLeft: 5,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    backgroundColor: 'transparent',
    color: '#FFF', // Set text color to white
  },
  label: {
    position: 'absolute',
    left: 5,
    top: 10,
    color: '#FFF', // Set label color to white
    fontWeight: 'normal',
    pointerEvents: 'none',
  },
  bar: {
    position: 'relative',
    width: '100%',
    height: 2,
    marginTop: 10,
  },
  barLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: 'white',
    bottom: 0,
    width: 0,
  },
});

export default WaveInput;
