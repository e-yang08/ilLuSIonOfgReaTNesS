import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './pages/Login/login';
import RegistrationPage from './pages/Login/registration';

export default function App() {
  return (
    <View style={styles.container}>
      <RegistrationPage/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
