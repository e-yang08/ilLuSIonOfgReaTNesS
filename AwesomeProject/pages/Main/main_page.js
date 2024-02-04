import React, { useState, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Modal,
  Pressable,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapScreen from "../MapScreen";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import EmergencyButton from "../../components/EmergencyButton";
import styles from "./MainPageStyles";
import SafetyInfo from "../../backend/SafetyInfo";
import { GOOGLE_API_KEY, AMADEUS_CLIENT_ID, AMADEUS_CLIENT_SECRET } from "@env";

export default function MainPage({ navigation }) {
  const [isPressed, setIsPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const pressTimeout = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [safetyInfo, setSafetyInfo] = useState("");

  const handlePressIn = () => {
    pressTimeout.current = setTimeout(() => {
      setIsPressed(true);
    }, 3000); // 3000 milliseconds (3 seconds)
  };

  const handlePressOut = () => {
    clearTimeout(pressTimeout.current);
    if (isPressed) {
      // Handle long press action here
      console.log("Button was long-pressed!");
      setModalVisible(true);
      setIsPressed(false);
    }
  };

  const handleSearch = () => {
    // Perform search based on the searchText
    console.log("Performing search for:", searchText);
    setAddressModalVisible();
  };

  const handleTextChange = (text) => {
    setSearchText(text);
  };
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleSelectLocation = (data, details) => {
    // console.log(details);
    const { geometry } = details;
    // console.log(geometry);
    const { location } = geometry;
    // console.log(location);
    const { lat, lng } = location;

    setSelectedLocation({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <EmergencyButton />
      <MapScreen selectedLoc={selectedLocation} />
      {/* <MapView
        style={styles.map}
        region={selectedLocation}
        showsUserLocation={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        provider={PROVIDER_GOOGLE}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            title={"Selected Location"}
          />
        )}
      </MapView> */}

      <View style={styles.searchContainer}>
        {/* </View> */}
        <GooglePlacesAutocomplete
          placeholder="Search..."
          enablePoweredByContainer={false}
          onPress={handleSelectLocation}
          fetchDetails={true}
          suppressDefaultStyles={true}
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
          styles={{
            container: styles.searchInputContainer,
            textInput: styles.searchInput,
            listView: styles.searchListView,
            row: styles.searchRow,
          }}
        />
      </View>

      {/* <SearchBar
        placeholder="Type here..."
        onChangeText={handleTextChange}
        onSubmitEditing={handleSearch}
        value={searchText}
        lightTheme
      /> */}

      {/* Modal for Displaying Emergency Notification Information */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Emergency notifications sent!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal for Displaying Safety Information */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addressModalVisible}
        onRequestClose={() => {
          Alert.alert("Safety Info Modal has been closed.");
          setAddressModalVisible(!addressModalVisible);
        }}
      >
        <View style={styles.toppedView}>
          <View style={styles.modalTopView}>
            {/* Pass searchText as a prop to SafetyInfo or fetch data here and pass it down */}
            <SafetyInfo address={searchText} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setAddressModalVisible(!addressModalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
