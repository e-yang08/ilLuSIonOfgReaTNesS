import { Text, View, SafeAreaView, TouchableWithoutFeedback, Modal, Pressable, Alert, StyleSheet } from "react-native"
import React, { useState, useRef } from 'react';
export default function MainPage({ navigation }) {
    const [isPressed, setIsPressed] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
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
            setModalVisible(true)
            setIsPressed(false);
        }
    };
    return (
        <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Emergency notifications sent!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <View style={{ padding: 20, backgroundColor: isPressed ? 'green' : 'red' }}>
        <Text>Emergency</Text>
      </View>
    </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});