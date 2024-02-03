import {
  Button,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import InputField from "../../components/input-field";
import Geolocation from "@react-native-community/geolocation";

const requestLocationPermission = () => {
  Geolocation.requestAuthorization();
};

const getCurrentLocation = () => {
  Geolocation.getCurrentPosition(
    (position) => {
      console.log("Current Location:", position.coords);
    },
    (error) => {
      console.error("Error getting location:", error);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
};

export default function InitialShareLocationPage({ navigation }) {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        {/* onPress={() => {
            navigation.navigate("Main"); */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button
            title="Request Location Permission"
            onPress={requestLocationPermission}
          />
          <Button title="Get Current Location" onPress={getCurrentLocation} />
        </View>
      </View>
    </SafeAreaView>
  );
}
