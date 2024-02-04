import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import InputField from "../../components/input-field";
export default function AddEmergencyContactsPage({ navigation }) {
  const [name1, setName1] = useState("");
  const [phoneNum1, setPhoneNum1] = useState("");
  const [name2, setName2] = useState("");
  const [phoneNum2, setPhoneNum2] = useState("");
  const [name3, setName3] = useState("");
  const [phoneNum3, setPhoneNum3] = useState("");

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

        <Text
          style={{
            fontSize: 14,
            color: "#333",
            marginBottom: 10,
          }}
        >
          Contact 1
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
          value={name1}
          onChangeFunc={(text) => setName1(text)}
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
          keyboardType={"phone-pad"}
          value={phoneNum1}
          onChangeFunc={(text) => setPhoneNum1(text)}
        />

        <Text
          style={{
            fontSize: 14,
            color: "#333",
            marginBottom: 10,
          }}
        >
          Contact 2
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
          value={name2}
          onChangeFunc={(text) => setName2(text)}
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
          keyboardType={"phone-pad"}
          value={phoneNum2}
          onChangeFunc={(text) => setPhoneNum2(text)}
        />

        <Text
          style={{
            fontSize: 14,
            color: "#333",
            marginBottom: 10,
          }}
        >
          Contact 3
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
          value={name3}
          onChangeFunc={(text) => setName3(text)}
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
          keyboardType={"phone-pad"}
          value={phoneNum3}
          onChangeFunc={(text) => setPhoneNum3(text)}
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
            One more step!
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
