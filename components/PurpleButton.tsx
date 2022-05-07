// this is the general layout for the button that allows users to continue
import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function PurpleButton(props) {
  return (
    <TouchableOpacity onPress={props.enabled ? props.onPress : undefined}>
      <View
        style={[
          styles.button,
          props.enabled
            ? { backgroundColor: "#9E70F6" }
            : { backgroundColor: "#c8b9fa" },
        ]}
      >
        <Text style={styles.buttonText}> {props.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    flexDirection: "column",
    alignItems: "center",
    padding: "3%",
    borderRadius: 25,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
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
