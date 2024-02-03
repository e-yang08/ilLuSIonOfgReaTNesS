import { Text, View, SafeAreaView, TouchableWithoutFeedback } from "react-native"
import React, { useState, useRef } from 'react';
export default function MainPage({ navigation }) {
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
            // Handle long press action here
            console.log('Button was long-pressed!');
            setIsPressed(false);
        }
    };
    return (
        <SafeAreaView>
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <View style={{ padding: 20, backgroundColor: isPressed ? 'green' : 'red' }}>
        <Text>Emergency</Text>
      </View>
    </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}