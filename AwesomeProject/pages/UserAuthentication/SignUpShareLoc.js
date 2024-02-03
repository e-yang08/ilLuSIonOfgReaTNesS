import React, { useState } from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  Text,
  Linking,
  SafeAreaView,
} from "react-native";
import * as Location from "expo-location";

export default function InitialShareLocationPage({ navigation }) {
  const [locationPermission, setLocationPermission] = useState(null);
  const [hasSharedLocation, setHasSharedLocation] = useState(false);

  const getLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status);
    } catch (error) {
      console.error("Error while requesting location permission:", error);
    }
  };

  const handleLocationPermission = async () => {
    await getLocationPermission();
    setHasSharedLocation(true);
  };

  // if permission is denied, trigger to open settings
  const openSettings = () => {
    Linking.openSettings();
  };
  const handleLocationPermissionSettings = () => {
    if (locationPermission !== "granted") {
      console.log(locationPermission);
      Alert.alert(
        "Location Access Denied",
        "Please go to settings and enable location access for this app.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: openSettings },
        ]
      );
    } else {
      openSettings();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
          }}
        >
          Share Location
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: "#333",
            marginBottom: 50,
          }}
        >
          Choose{" "}
          <Text
            style={{
              fontWeight: "800",
            }}
          >
            "Allow While Using App"
          </Text>
          so that we can assist you when you are in danger.
        </Text>

        {!hasSharedLocation && (
          <TouchableOpacity
            style={{
              backgroundColor: "#7455f6",
              padding: 20,
              borderRadius: 10,
            }}
            onPress={handleLocationPermission}
          >
            <Text
              style={{ textAlign: "center", fontWeight: 700, color: "#FFF" }}
            >
              Press to share location
            </Text>
          </TouchableOpacity>
        )}
        {locationPermission === "granted" && (
          <TouchableOpacity
            style={{
              backgroundColor: "#7455f6",
              padding: 20,
              borderRadius: 10,
            }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text
              style={{ textAlign: "center", fontWeight: 700, color: "#FFF" }}
            >
              Register
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={{
            backgroundColor: "rgba(0, 0, 0, 0)",
            padding: 20,
            borderRadius: 10,
          }}
          onPress={handleLocationPermissionSettings}
        >
          <Text
            style={{ textAlign: "center", fontWeight: 500, color: "#808080" }}
          >
            Change the location permission
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
