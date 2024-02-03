import React, { useState, useRef } from 'react';
import { Text, View, SafeAreaView, TouchableWithoutFeedback, Modal, Pressable } from "react-native";
import { SearchBar } from 'react-native-elements';
import MapScreen from '../MapScreen'; 
import EmergencyButton from '../../components/EmergencyButton';
import styles from './MainPageStyles';

export default function MainPage({ navigation }) {
    const [isPressed, setIsPressed] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const pressTimeout = useRef(null);
    const [searchText, setSearchText] = useState('');

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

    const handleSearch = () => {
        // Perform search based on the searchText
        console.log('Performing search for:', searchText);
    };

    const handleTextChange = (text) => {
        setSearchText(text);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SearchBar
                placeholder="Type here..."
                onChangeText={handleTextChange}
                onSubmitEditing={handleSearch}
                value={searchText}
                lightTheme
            />
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
            <EmergencyButton />
            <MapScreen />
        </SafeAreaView>
    )
}
