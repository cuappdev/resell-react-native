import { StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";
import { fonts } from "../globalStyle/globalFont";

export default function VenmoInput({
  venmo,
  onChangeVenmo,
  style,
}: {
  venmo: string;
  onChangeVenmo: React.Dispatch<React.SetStateAction<string>>;
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.textInputContainer, style]}>
      <Text style={[fonts.body2]}>@</Text>
      <View style={{ width: 7 }} />
      <TextInput
        style={[fonts.body2, styles.textInput]}
        placeholderTextColor={"#707070"}
        value={venmo}
        onChangeText={onChangeVenmo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F4F4F4",
    borderRadius: 10,
    width: "100%",
    height: 40,
    flexDirection: "row",
  },
  textInput: {
    width: "100%",
  },
});
