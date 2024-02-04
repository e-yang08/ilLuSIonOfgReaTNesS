import React, { useState, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Modal,
  Pressable,
} from "react-native";
import styles from "../pages/Main/MainPageStyles";

export default function EmergencyButton() {
  const [isPressed, setIsPressed] = useState(false);
  const pressTimeout = useRef(null);
  const [isTriggered, setTriggered] = useState(false);
  const [emergencyText, setEmergencyText] = useState("Emergency");
  const [modalVisible, setModalVisible] = useState(false);

  const handlePressIn = () => {
    if (!isTriggered) {
      setIsPressed(true);
      setEmergencyText("Hold for 3 seconds..");
      pressTimeout.current = setTimeout(() => {
        setTriggered(true);
      }, 3000); // 3000 milliseconds (3 seconds)
    }
  };

  const handlePressOut = () => {
    clearTimeout(pressTimeout.current);
    setIsPressed(false);
    if (isTriggered) {
      // Handle long press action here
      console.log("Button was long-pressed!");
      setModalVisible(true);
      //setTriggered(false);
      setEmergencyText("Emergency Triggered");
    } else {
      setEmergencyText("Emergency");
    }
  };
  const buttonColor =
    isPressed && !isTriggered ? "#B71C1C" : isTriggered ? "#B0BEC5" : "#F44336";

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Emergency notifications sent!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View
          style={{
            padding: 20,
            backgroundColor: buttonColor,
            position: "absolute",
            bottom: 50,
            alignSelf: "center",
            zIndex: 1000,
            width: 200,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>{emergencyText}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
