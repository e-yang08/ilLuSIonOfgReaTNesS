import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_API_KEY, AMADEUS_CLIENT_ID, AMADEUS_CLIENT_SECRET } from '@env';


const SafetyInfo = () => {
    const [coords, setCoords] = useState('loading...');
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [safety, setSafety] = useState('loading...');
    const [loading, setIsLoading] = useState(false);
    const [token, setToken] = useState('');

    // Function to fetch the token
    const fetchToken = async () => {
        try {
            const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `grant_type=client_credentials&client_id=${AMADEUS_CLIENT_ID}&client_secret=${AMADEUS_CLIENT_SECRET}`,
            });
            const json = await response.json();
            setToken(json.access_token);
            console.log("Token fetched: ", json.access_token);
        } catch (error) {
            console.error("Error fetching token: ", error);
        }
    };

    const getSafetyRating = async () => {
        // Function to get the Safety Rating of the state variables of latitude and longitude

        if (!lat || !long ) return; // Ensure lat, long, and token are available
        
        const radiusInDegrees = 0.5/69; // 1 degree = 69 miles

        // Find the coordinates of the bound
        const north = parseFloat(lat) + radiusInDegrees;
        const south = parseFloat(lat) - radiusInDegrees;
        const east = parseFloat(long) + radiusInDegrees;
        const west = parseFloat(long) - radiusInDegrees;


        setIsLoading(true);
        try {
            const url = `https://test.api.amadeus.com/v1/safety/safety-rated-locations/by-square?north=${north}&west=${west}&south=${south}&east=${east}&page[limit]=10&page[offset]=0`;
            const response = await fetch(url, {
                method: 'GET',  
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const json = await response.json();
            console.log(json);

        if (json.data && json.data.length > 0) {
            // Example of processing the data:
            // Calculate the average safety score for the area
            const averageScores = json.data.reduce((acc, cur) => {
                acc.lgbtq += cur.safetyScores.lgbtq;
                acc.medical += cur.safetyScores.medical;
                acc.overall += cur.safetyScores.overall;
                acc.physicalHarm += cur.safetyScores.physicalHarm;
                acc.politicalFreedom += cur.safetyScores.politicalFreedom;
                acc.theft += cur.safetyScores.theft;
                acc.women += cur.safetyScores.women;
                return acc;
            }, { lgbtq: 0, medical: 0, overall: 0, physicalHarm: 0, politicalFreedom: 0, theft: 0, women: 0 });

            Object.keys(averageScores).forEach(key => {
                averageScores[key] /= json.data.length;
            });

            setSafety(averageScores);
            console.log(averageScores);
        } else {
            setSafety("No data available for this area.");
        }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchToken();
    }, []);

    useEffect(() => {
        if (token) { // Ensure to call getSafetyRating only when token is available
            getSafetyRating();
        }
    }, [lat, long, token]); 

    
    const geocode = () => {
        // Function to fetch latitude and longitude from address

        useEffect(() => {
            Geocoder.init(GOOGLE_API_KEY, { language: "en" }); // Use your actual Google API key
            Geocoder.from("16 Turk", {
                northeast: { lat: 37.83, lng: -122.34 },
                southwest: { lat: 37.63, lng: -122.55 }
            })
                .then(json => {
                    const location = json.results[0].geometry.location;
                    setLat(location.lat);
                    setLong(location.lng);
                    const latLngString = `${location.lat}, ${location.lng}`;
                    setCoords(latLngString);
                })
                .catch(error => console.warn(error));
        }, []);
    };

    geocode();

    return (
        <View>
            <Text>Map Component</Text>
            <Text>{coords}</Text>
            <Text>{ 
            // map the safety scores to a string
            Object.entries(safety).map(([key, value]) => `${key}: ${value}`).join('\n')
            }</Text>
        </View>
    );
};

export default SafetyInfo;
