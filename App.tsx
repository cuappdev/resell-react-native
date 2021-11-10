import React from 'react';
import SignIn from "./screens/SignIn";
import { StyleSheet, View } from 'react-native';

export default function App() {
    return (
      <View style={styles.container}>
        <SignIn/>
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