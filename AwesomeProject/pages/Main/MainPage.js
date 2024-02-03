import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import MapScreen from '../MapScreen';
import EmergencyButton from '../../components/EmergencyButton';
import Geocoder from 'react-native-geocoding';
import { REACT_APP_GOOGLE_API_KEY } from '@env';

export default function MainPage({ navigation }) {
    const [searchText, setSearchText] = useState('');
    const [routeCoordinates, setRouteCoordinates] = useState([]);

    useEffect(() => {
        Geocoder.init(REACT_APP_GOOGLE_API_KEY, { language: "en" });
    }, []);

    const handleSearch = () => {
        console.log("Searching for: ", searchText);
        Geocoder.from(searchText, {
            northeast: { lat: 37.83, lng: -122.34 },
            southwest: { lat: 37.63, lng: -122.55 }
        })
            .then(json => {
                const geocodedLocation = json.results[0].geometry.location;
                setRouteCoordinates([{ latitude: geocodedLocation.lat, longitude: geocodedLocation.lng }]);
            })
            .catch(error => console.error("Problem with GeoCoder: ", error));
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
            <MapScreen routeCoordinates={routeCoordinates} />
            <EmergencyButton />
        </SafeAreaView>
    );
}
