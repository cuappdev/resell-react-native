// this is the general layout for the button that allows users to continue
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { fonts } from "../globalStyle/globalFont";

export default function PurpleButton({
  enabled,
  onPress,
  text,
  isLoading = false,
}: {
  enabled: boolean;
  onPress: () => void;
  text: string;
  isLoading?: boolean;
}) {
  return (
    <TouchableOpacity onPress={enabled ? onPress : undefined}>
      <View
        style={[
          styles.button,
          enabled
            ? { backgroundColor: "#9E70F6" }
            : { backgroundColor: "#c8b9fa" },
        ]}
      >
        {isLoading && <ActivityIndicator color="white" size="small" />}
        <Text style={[{ color: "white", textAlign: "center" }, fonts.Title2]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "3%",
    borderRadius: 25,
    minHeight: 45,
    gap: 12,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Rubik-Regular",
  },
});
