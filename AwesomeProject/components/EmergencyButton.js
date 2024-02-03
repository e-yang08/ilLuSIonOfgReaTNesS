import React, { useState, useRef } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';

export default function EmergencyButton() {
  const [isPressed, setIsPressed] = useState(false);
  const pressTimeout = useRef(null);

  const handlePressIn = () => {
    pressTimeout.current = setTimeout(() => {
      setIsPressed(true);
    }, 3000); // 3000 milliseconds (3 seconds)
  };

  const handlePressOut = () => {
    clearTimeout(pressTimeout.current);
    if (isPressed) {
      console.log('Button was long-pressed!');
      setIsPressed(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <View style={{
        padding: 20,
        backgroundColor: isPressed ? 'green' : 'red',
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        zIndex: 1000
      }}>
        <Text>Emergency</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}