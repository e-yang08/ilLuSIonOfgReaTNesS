import React from 'react';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import bookmarksData from '../backend/bookmarks.json';
import { Button } from 'react-native-elements';
import { Linking } from 'react-native';

const MapScreen = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [buttonOpacity, setButtonOpacity] = useState(1);

  const openGoogleMaps = (lat, lon) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=walking`;
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const flashButton = () => {
    setButtonOpacity(0.5); // Make button semi-transparent quickly
    setTimeout(() => setButtonOpacity(1), 100); // Then quickly revert to full opacity
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    flashButton(); // Call flashButton when a marker is pressed
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    // Use these coordinates to interact with Google API or other services
    
  };

  return (
    <View style={styles.container}>
      <MapView
    style={styles.map}
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    onPress={() => setSelectedMarker(null)} // Add this line
>
    {bookmarksData.map((marker) => (
      <Marker
        key={marker.id}
        coordinate={{
          latitude: marker.lat,
          longitude: marker.lon,
        }}
        title={marker.tag}
        pinColor={marker.tag === 'police' ? 'blue' : marker.tag === 'hospital' ? 'orange' : 'green'}
        onPress={() => handleMarkerPress(marker)} // Update to use handleMarkerPress
      />
    ))}
    </MapView>

    {selectedMarker && (
          <Button
            title="Go Here"
            onPress={() => openGoogleMaps(selectedMarker.lat, selectedMarker.lon)}
          />
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
