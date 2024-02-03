import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './pages/UserAuthentication/LogIn';
import RegistrationPage from './pages/UserAuthentication/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import MainPage from './pages/Main/MainPage';
//import { PaperProvider } from "react-native-paper";

export default function App() {
  const AppStack = createStackNavigator();
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown:false,
      }}>
        <AppStack.Screen name='Login' component={LoginPage}/>
        <AppStack.Screen name='Register' component={RegistrationPage} />
        <AppStack.Screen name="Main" component={MainPage} />
      </AppStack.Navigator>
    </NavigationContainer>
  )

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
