import {
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
export default function AddEmergencyContactsPage({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 5,
          }}
        >
          Emergency Contacts
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#333",
            marginBottom: 30,
          }}
        >
          Add 2-3 people that you want to notify when you are in risk.
        </Text>
        <InputField
          label={"Full name"}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={name}
          onChangeFunc={(text) => setName(text)}
        />
        <InputField
          label={"Phone Number"}
          icon={
            <MaterialIcons
              name="local-phone"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType={"email-address"}
          onChangeFunc={(text) => setEmail(text)}
          value={email}
        />

        <TouchableOpacity
          style={{
            backgroundColor: "#7455f6",
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
          }}
          onPress={() => {
            navigation.navigate("InitialShareLocation");
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: 700, color: "#FFF" }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
