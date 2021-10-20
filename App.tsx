import * as Font from "expo-font";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import SignIn from "./screens/SignIn";
import { StyleSheet, Text, View } from 'react-native';


export default function App() {
    return (
      <View style={styles.container}>
        <Text>Test</Text>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
