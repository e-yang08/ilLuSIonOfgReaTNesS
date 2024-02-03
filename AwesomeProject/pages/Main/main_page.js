import React, { useState, useRef } from 'react';
import { Text, View, SafeAreaView, TouchableWithoutFeedback, Modal, Pressable } from "react-native";
import { SearchBar } from 'react-native-elements';
import MapScreen from '../MapScreen'; 
import EmergencyButton from '../../components/EmergencyButton';
import styles from './MainPageStyles';
import SafetyInfo from '../../backend/SafetyInfo';

export default function MainPage({ navigation }) {
    const [isPressed, setIsPressed] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [addressModalVisible, setAddressModalVisible] = useState(false);
    const pressTimeout = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [safetyInfo, setSafetyInfo] = useState('');

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
        setAddressModalVisible();
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

            {/* Modal for Displaying Emergency Notification Information */}
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

            {/* Modal for Displaying Safety Information */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={addressModalVisible}
                onRequestClose={() => {
                    Alert.alert('Safety Info Modal has been closed.');
                    setAddressModalVisible(!addressModalVisible);
                }}>
                <View style={styles.toppedView}>
                    <View style={styles.modalTopView}>
                        {/* Pass searchText as a prop to SafetyInfo or fetch data here and pass it down */}
                        <SafetyInfo address={searchText} />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setAddressModalVisible(!addressModalVisible)}>
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <MapScreen />
            <EmergencyButton />
        </SafeAreaView>
    )
}
