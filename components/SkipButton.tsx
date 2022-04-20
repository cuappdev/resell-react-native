// this is the general layout for the button that allows users to continue
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function SkipButton({ text }) {
  return (
    <TouchableOpacity>
      <View style={styles.button}>
        <Text style={styles.buttonText}> {"Skip"}</Text>

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 230,
    flexDirection: "column",
    alignItems: "center",
    // HOW DO U SEE THE EXACT SHADE OF COLOR OF THE BUTTON
    backgroundColor: "white",
    padding: "3%",
    borderRadius: 25,
    // shadowOffset: { width: 3, height: 3 },
    // shadowColor: "purple",
    // shadowOpacity: 0.5
  },

  buttonText: {
    color: "#9E70F6",
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center'
  }
})