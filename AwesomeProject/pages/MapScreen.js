import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Linking,
  Text,
  TouchableOpacity,
} from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Polygon,
  Callout,
} from "react-native-maps";
import { Button } from "react-native-elements";

import bookmarksData from "../backend/data/bookmarks.json";
import neighborhoodData from "../backend/data/neighborhoods.json";

const MapScreen = ({ selectedLoc }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [buttonOpacity, setButtonOpacity] = useState(1);

  const openGoogleMaps = (lat, lon) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=walking`;
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  const flashButton = () => {
    setButtonOpacity(0.5); // Make button semi-transparent quickly
    setTimeout(() => setButtonOpacity(1), 100); // Then quickly revert to full opacity
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(() => marker);
    console.log("chose marker");
    flashButton(); // Call flashButton when a marker is pressed
  };

  // const handleMapPress = (e) => {
  //     console.log("coord", e.nativeEvent.coordinate);
  //     const { latitude, longitude } = e.nativeEvent.coordinate;
  //     // Use these coordinates to interact with Google API or other services
  // };

  const getColorWithAlpha = (hue, saturation, lightness, alpha) => {
    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
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
        region={
          selectedLoc
            ? {
                latitude: selectedLoc.latitude + 0.02,
                longitude: selectedLoc.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            : selectedLoc
        }
        showsUserLocation={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        provider={PROVIDER_GOOGLE}
        // onPress={handleMapPress}
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

        {/* without marker parencesis? */}
        {bookmarksData.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.lat,
              longitude: marker.lon,
            }}
            style={{ margin: 2 }}
            title={marker.tag}
            pinColor={
              marker.tag == "Police"
                ? "blue"
                : marker.tag == "Hospital"
                ? "orange"
                : "green"
            }
            description={marker.description}
            onPress={() => handleMarkerPress(marker)} // Update to use handleMarkerPress
          >
            <Callout
              style={{ margin: 2 }}
              onPress={() => openGoogleMaps(marker.lat, marker.lon)}
            >
              <View style={styles.calloutView}>
                <Text style={{ fontWeight: "500", fontSize: 15 }}>
                  {marker.tag}
                </Text>
                <Text>{marker.description}</Text>
                <TouchableOpacity
                  style={styles.directionsButton}
                  onPress={() => openGoogleMaps(marker.lat, marker.lon)}
                >
                  <Text style={styles.directionsButtonText}>
                    Get Directions
                  </Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
        {neighborhoodData.map((n) => (
          <Polygon
            key={n["neighborhood"]}
            coordinates={n["coordinates"].map((coords) => {
              return {
                latitude: coords[1],
                longitude: coords[0],
              };
            })}
            fillColor={getColorWithAlpha(30, 100, 50, (n["safety"] / 10) * 1.2)}
            strokeWidth={0.5}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    marginBottom: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  directionsButton: {
    marginTop: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "blue",
    // alignSelf: 'flex-start',
    justifyContent: "center",
    alignContent: "center",
  },

  directionsButtonText: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
  calloutView: {
    padding: 10,
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
  },
});

export default MapScreen;
