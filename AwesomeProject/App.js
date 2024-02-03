import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginPage from "./pages/UserAuthentication/LogIn";
import RegistrationPage from "./pages/UserAuthentication/SignUpInitial";
import AddEmergencyContactsPage from "./pages/UserAuthentication/SignUpEmergency";
import InitialShareLocationPage from "./pages/UserAuthentication/SignUpShareLoc";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const AppStack = createStackNavigator();
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen name="Login" component={LoginPage} />
        <AppStack.Screen name="Register" component={RegistrationPage} />
        <AppStack.Screen name="AddEmergencyContacts" component={ AddEmergencyContactsPage } />
        <AppStack.Screen name="InitialShareLocation" component={InitialShareLocationPage} />
      </AppStack.Navigator>
    </NavigationContainer>
  );

  /*return (
    <View style={styles.container}>
      <LoginPage />
    </View>
  );*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
