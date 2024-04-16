// this is the general layout for the button that allows users to continue
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../constants/Colors";
import { fonts } from "../globalStyle/globalFont";

/**
 * Resell purple button component
 * @param enabled whether the button is enabled, if false the onPress action will
 * do nothing and the button takes on a disabled style. The disabled state will also
 * occur if isLoading is true regardless of the value of enabled
 * @param onPress the press action
 * @param text the button label
 * @param isLoading whether the button is loading, if true the button goes into
 * a loading state, disabling itself and displaying a loading icon
 * @returns
 */
export default function PurpleButton({
  enabled = true,
  onPress,
  text,
  isLoading = false,
  style,
}: {
  enabled?: boolean;
  onPress: () => void;
  text: string;
  isLoading?: boolean;
  style?: ViewStyle;
}) {
  return (
    <TouchableOpacity onPress={onPress} disabled={!enabled || isLoading}>
      <View
        style={[
          styles.button,
          isLoading || !enabled ? { opacity: 0.4 } : { opacity: 1 },
          style,
        ]}
      >
        {isLoading && <ActivityIndicator color="white" size="small" />}
        <Text style={[{ color: "white", textAlign: "center" }, fonts.Title1]}>
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
    backgroundColor: Colors.resellPurple,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Rubik-Regular",
  },
});
