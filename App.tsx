import React from 'react';
import SignIn from "./screens/SignIn";
import PostScreen from "./screens/PostScreen"
import { StyleSheet, View } from 'react-native';

export default function App() {
    return (
      <View>
        <View style={styles.container}>
        </View>
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