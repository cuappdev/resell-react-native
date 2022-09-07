// this is the general layout for the button that allows users to continue
import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function SkipButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}> {"Skip"}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 230,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: "3%",
    borderRadius: 25,
  },

  buttonText: {
    color: "#9E70F6",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});
