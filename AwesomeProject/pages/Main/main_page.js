// main_page.js
import React from 'react';
import { View, SafeAreaView } from "react-native";
import MapScreen from '../MapScreen'; 
import EmergencyButton from '../../components/EmergencyButton';

export default function MainPage({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapScreen />
      <EmergencyButton />
    </SafeAreaView>
  );
}
