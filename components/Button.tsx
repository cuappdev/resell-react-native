import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

const Button = ({ title }) => (
  <TouchableOpacity style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#ffffff",
    borderRadius: 100,
    paddingVertical: 11,
    paddingHorizontal: 11,
    marginVertical: 5,
    marginHorizontal: 11,
    borderWidth: 1,
    borderColor: "#D3D3D3",
  },
  appButtonText: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 18,
    color: "#4D4D4D",
    alignSelf: "center",
  },
});
export default Button;
