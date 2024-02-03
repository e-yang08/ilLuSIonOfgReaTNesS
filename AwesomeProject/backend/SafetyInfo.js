import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Geocoder from 'react-native-geocoding';
import { REACT_APP_GOOGLE_API_KEY, REACT_APP_AMADEUS_CLIENT_ID, REACT_APP_AMADEUS_CLIENT_SECRET } from '@env';

const SafetyInfo = () => {
    const [coords, setCoords] = useState('loading...');
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [safety, setSafety] = useState('loading...');
    const [loading, setIsLoading] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        Geocoder.init(REACT_APP_GOOGLE_API_KEY, { language: "en" }); 
        fetchToken();
    }, []);

    useEffect(() => {
        if (token && lat && long) { 
            getSafetyRating();
        }
    }, [lat, long, token]);

    const fetchToken = async () => {
        try {
            const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `grant_type=client_credentials&client_id=${REACT_APP_AMADEUS_CLIENT_ID}&client_secret=${REACT_APP_AMADEUS_CLIENT_SECRET}`,
            });
            const json = await response.json();
            setToken(json.access_token);
        } catch (error) {
            console.error("Error fetching token: ", error);
        }
    };

    const getSafetyRating = async () => {
        const radiusInDegrees = 0.5 / 69; // Approximate conversion for latitude/longitude degrees to miles
        const north = parseFloat(lat) + radiusInDegrees;
        const south = parseFloat(lat) - radiusInDegrees;
        const east = parseFloat(long) + radiusInDegrees;
        const west = parseFloat(long) - radiusInDegrees;

        setIsLoading(true);
        try {
            const url = `https://test.api.amadeus.com/v1/safety/safety-rated-locations/by-square?north=${north}&west=${west}&south=${south}&east=${east}&page[limit]=10&page[offset]=0`;
            const response = await fetch(url, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
            const json = await response.json();

            if (json.data && json.data.length > 0) {
                const averageScores = json.data.reduce((acc, cur) => {
                    Object.keys(cur.safetyScores).forEach(key => {
                        acc[key] = (acc[key] || 0) + cur.safetyScores[key];
                    });
                    return acc;
                }, {});

                Object.keys(averageScores).forEach(key => {
                    averageScores[key] /= json.data.length;
                });

                setSafety(averageScores);
            } else {
                setSafety("No data available for this area.");
            }
        } catch (error) {
            console.error("Error fetching safety rating: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const geocode = async () => {
        try {
            const json = await Geocoder.from("16 Turk", {
                northeast: { lat: 37.83, lng: -122.34 },
                southwest: { lat: 37.63, lng: -122.55 }
            });
            const location = json.results[0].geometry.location;
            setLat(location.lat);
            setLong(location.lng);
            setCoords(`${location.lat}, ${location.lng}`);
        } catch (error) {
            console.warn("Error in geocoding: ", error);
        }
    };

    useEffect(() => { geocode(); }, []); // Call geocode once after component mounts

    return (
        <View>
            <Text>Map Component</Text>
            <Text>{coords}</Text>
            <Text>{
                Object.entries(safety).map(([key, value]) => `${key}: ${value.toFixed(2)}`).join('\n')
            }</Text>
        </View>
    );
};

export default SafetyInfo;
