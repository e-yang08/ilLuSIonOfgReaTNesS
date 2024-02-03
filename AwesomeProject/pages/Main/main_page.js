import React, { useState, useRef } from 'react';
import { Text, View, SafeAreaView, TouchableWithoutFeedback, Modal, Pressable } from "react-native";
import { SearchBar } from 'react-native-elements';
import MapScreen from '../MapScreen'; 
import EmergencyButton from '../../components/EmergencyButton';

export default function MainPage({ navigation }) {
    const [searchText, setSearchText] = useState('');

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
            <MapScreen />
            <EmergencyButton />
        </SafeAreaView>
    )
}
