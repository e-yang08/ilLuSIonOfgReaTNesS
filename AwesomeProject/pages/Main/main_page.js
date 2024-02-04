import React, { useState, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Modal,
  Pressable,
} from "react-native";
// import { SearchBar } from "react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapScreen from "../MapScreen";
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
  const [address, setAddress] = useState("");
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

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSelectLocation = (data, details) => {
    console.log(details);

    // {"address_components": [{"long_name": "16", "short_name": "16", "types": [Array]}, {"long_name": "Turk Street", "short_name": "Turk St", "types": [Array]}, {"long_name": "Tenderloin", "short_name": "Tenderloin", "types": [Array]}, {"long_name": "San Francisco", "short_name": "SF", "types": [Array]}, {"long_name": "San Francisco County", "short_name": "San Francisco County", "types": [Array]}, {"long_name": "California", "short_name": "CA", "types": [Array]}, {"long_name": "United States", "short_name": "US", "types": [Array]}, {"long_name": "94102", "short_name": "94102", "types": [Array]}, {"long_name": "2808", "short_name": "2808", "types": [Array]}], "adr_address": "<span class=\"street-address\">16 Turk St</span>, <span class=\"locality\">San Francisco</span>, <span class=\"region\">CA</span> <span class=\"postal-code\">94102-2808</span>, <span class=\"country-name\">USA</span>", "formatted_address": "16 Turk St, San Francisco, CA 94102, USA", "geometry": {"location": {"lat": 37.783536, "lng": -122.4094065}, "viewport": {"northeast": [Object], "southwest": [Object]}}, "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png", "icon_background_color": "#7B9EB0", "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet", "name": "16 Turk St", "photos": [{"height": 4080, "html_attributions": [Array], "photo_reference": "AWU5eFjqAOu9bqRlG43lmkOAZInv_MwskcPA1bWmHR-fVAi1HBboZgb57kqUxrZpMbykTXvCQfnHw25wrg_k5kgZFVb8cOktiLLxixwMT8BWc09NV4iQtBpCMzOljk6UVjavo3jOEDpN4W4iOE77QlqXNSLF6yVLJt-VWZKC5Ff1RfaawEGX", "width": 3072}], "place_id": "ChIJ0ayOmIWAhYARC_hkPqnQVj0", "reference": "ChIJ0ayOmIWAhYARC_hkPqnQVj0", "types": ["premise"], "url": "https://maps.google.com/?q=16+Turk+St,+San+Francisco,+CA+94102,+USA&ftid=0x80858085988eacd1:0x3d56d0a93e64f80b", "utc_offset": -480, "vicinity": "San Francisco"}
    // the above is the details json objects. now help me extract the address from it

    const { formatted_address } = details;
    setAddress(formatted_address);
    
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
    console.log(address, 'NAMENAMENAME')

    setAddressModalVisible(true);


  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapScreen selectedLoc={selectedLocation} />
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
        

      {selectedLocation !== null && addressModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            Alert.alert("Safety Info Modal has been closed.");
            setAddressModalVisible(!addressModalVisible);
          }}
        >
          <View style={styles.toppedView}>
            <View style={styles.modalTopView}>
              <SafetyInfo address={address} lat={selectedLocation.latitude} long={selectedLocation.longitude} />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setAddressModalVisible(!addressModalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}

      <EmergencyButton />
    </SafeAreaView>
  );
}
