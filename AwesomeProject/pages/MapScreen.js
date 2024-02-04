import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import bookmarksData from "../backend/bookmarks.json";

const MapScreen = ({ selectedLoc }) => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    // Use these coordinates to interact with Google API or other services
  };

  console.log(selectedLoc);

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
        region={selectedLoc}
        onRegionChange={handleRegionChange}
        showsUserLocation={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        provider={PROVIDER_GOOGLE}
        onPress={handleMapPress}
      >
        {selectedLoc && (
          <Marker
            coordinate={{
              latitude: selectedLoc.latitude,
              longitude: selectedLoc.longitude,
            }}
            title={"Selected Location"}
          />
        )}

        {bookmarksData.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.lat,
              longitude: marker.lon,
            }}
            title={marker.tag}
            pinColor={
              marker.tag == "police"
                ? "blue"
                : marker.tag == "hospital"
                ? "orange"
                : "green"
            }
          />
        ))}
      </MapView>
      {/* <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        } }
        provider={PROVIDER_GOOGLE}
        onPress={handleMapPress}>
        {bookmarksData.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.lat,
              longitude: marker.lon,
            }}
            title={marker.tag}
            pinColor={ marker.tag=='police'?'blue': marker.tag=='hospital'? 'orange':'green' }
          />
        ))}
      </MapView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
