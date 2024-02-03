import React, { useState, useEffect, useRef } from 'react';
import { Text, View, SafeAreaView, TouchableWithoutFeedback, Modal, Pressable } from "react-native";
import styles from '../pages/Main/MainPageStyles';
import * as Location from 'expo-location';
import bookmarksData from '../backend/bookmarks.json';
import { Linking } from 'react-native';



export default function EmergencyButton() {
  const [isPressed, setIsPressed] = useState(false);
  const pressTimeout = useRef(null);
  const [isTriggered, setTriggered] = useState(false);
  const [emergencyText, setEmergencyText] = useState("Emergency")
  const [modalVisible, setModalVisible] = useState(false);

  const openGoogleMaps = (originLat, originLon, destLat, destLon) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLon}&destination=${destLat},${destLon}&travelmode=walking`;
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const handlePressIn = () => {
        if (!isTriggered) {
            setIsPressed(true);
                setEmergencyText("Hold for 3 seconds..")
                pressTimeout.current = setTimeout(() => {
                    setTriggered(true)
                }, 3000); // 3000 milliseconds (3 seconds)        
        }
    
    };

  const handlePressOut = () => {
        clearTimeout(pressTimeout.current);
        setIsPressed(false);
        if (isTriggered) {
            // Handle long press action here
            console.log('Button was long-pressed!');
            setModalVisible(true)
            //setTriggered(false);
            setEmergencyText("Emergency Triggered")
        } else {
            setEmergencyText("Emergency")
        }
  };

  const navigateToClosestBookmark = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
  
    let { coords } = await Location.getCurrentPositionAsync({});
    const userLocation = { latitude: coords.latitude, longitude: coords.longitude };
    // test location below
    // const userLocation = { latitude: 37.78825, longitude: -122.4324 };
    let closestLocation = bookmarksData.reduce((prev, curr) => {
      let prevDistance = getDistance(prev, userLocation);
      let currDistance = getDistance(curr, userLocation);
      return (currDistance < prevDistance) ? curr : prev;
    });
  
    openGoogleMaps(userLocation.latitude, userLocation.longitude, closestLocation.lat, closestLocation.lon); // Reuse the openGoogleMaps function from Case 1
  };

  // Function to calculate distance between two lat/lon points
function getDistance(location1, location2) {
  // Implement haversine formula or use a library that can calculate distance between two coordinates

  const result = Math.sqrt(
    Math.pow(location2.latitude - location1.latitude, 2) +
    Math.pow(location2.longitude - location1.longitude, 2)
  );

  return result;
}

useEffect(() => {
  if (isTriggered) {
    navigateToClosestBookmark();
  }
}
, [isTriggered]);



  const buttonColor = (isPressed && !isTriggered) ? '#B71C1C': (isTriggered)?'#B0BEC5':'#F44336';

  return (
    <View>
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
      <View style={{
        padding: 20,
        backgroundColor: buttonColor,
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
          zIndex: 1000,
          width: 200,
        justifyContent: 'center',
          alignItems: 'center',
        borderRadius:20
      }}>
          <Text style={{ fontWeight: 'bold' }}>{emergencyText}</Text>
      </View>
      </TouchableWithoutFeedback>
      </View>
  );
}