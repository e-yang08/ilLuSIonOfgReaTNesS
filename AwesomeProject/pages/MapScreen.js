import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import bookmarksData from '../backend/bookmarks.json'

const MapScreen = () => {
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

        </MapView>
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
