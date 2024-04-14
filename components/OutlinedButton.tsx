import React from "react";
import { StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../constants/Colors";
import { fonts } from "../globalStyle/globalFont";

/**
 * Outlined button component for general use throughout the app
 * @param enabled whether the button is enabled, if false the onPress action will
 * do nothing and the button takes on a disabled style. The disabled state will also
 * occur if isLoading is true regardless of the value of enabled
 * @param onPress the press action
 * @param text the button label
 * @param textStyle style for the button label text
 * @param isLoading whether the button is loading, if true the button goes into
 * a loading state, disabling itself and displaying a loading icon
 * @returns
 */
export default function OutlinedButton({
  text,
  style,
  textStyle,
  onPress,
  isLoading,
  enabled = true,
}: {
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
  isLoading?: boolean;
  enabled?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        isLoading || !enabled ? { opacity: 0.4 } : undefined,
        style,
      ]}
      onPress={enabled && !isLoading ? onPress : undefined}
    >
      {isLoading && <ActivityIndicator size={20} color={Colors.resellPurple} />}
      <Text style={[fonts.Title1, { color: Colors.resellPurple }, textStyle]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 30,
    borderWidth: 1.5,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 50,
    borderColor: Colors.resellPurple,
    gap: 12,
    flexDirection: "row",
  },
});
