import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polygon } from 'react-native-maps';
import bookmarksData from '../backend/data/bookmarks.json'
import neighborhoodData from '../backend/data/neighborhoods.json'
import { useEffect } from 'react';


const MapScreen = () => {
  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    // Use these coordinates to interact with Google API or other services
  };

  const polygonCoordinates = neighborhoodData.map(coords => {
    return {
        "latitude": coords[1],
        "longitude": coords[0]
    };
  })
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
        //provider={PROVIDER_GOOGLE}
        onPress={handleMapPress}>
        {bookmarksData.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.lat,
              longitude: marker.lon,
            }}
            title={marker.tag}
            pinColor={marker.tag == 'Police' ? 'blue' : marker.tag == 'Hospital' ? 'orange' : 'green'}
            description={marker.description}
          />))}
        {neighborhoodData.map(n => (
          <Polygon
            coordinates={n['coordinates'].map(coords => {
              return {
                "latitude": coords[1],
                "longitude": coords[0]
              }
            })}
            fillColor="rgba(100, 100, 200, 0.3)"
            strokeWidth={0.5}
            />

        ))
          }

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
