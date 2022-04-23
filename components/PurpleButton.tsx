// this is the general layout for the button that allows users to continue
import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function GreyButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}> {text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 230,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#9E70F6",
    padding: "3%",
    borderRadius: 25,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  purpleButton: {
    bottom: 100,
    alignItems: "center",
    width: "100 %",
    zIndex: 10,
    height: 170,
    backgroundColor: "white",
    marginTop: 350,
  },
});
