import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fonts } from "../../globalStyle/globalFont";
const NoticeBanner = ({
  name,
  onPress,
  isConfirmed,
}: {
  name: string;
  onPress: () => void;
  isConfirmed: boolean;
}) => {
  return (
    <View
      style={{
        height: 60,
        width: "100%",
        marginEnd: 100,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Feather name="calendar" size={17} color="black" />
        <Text style={[fonts.Title4, { marginStart: 6 }]}>
          {isConfirmed
            ? name + " confirmed the meeting"
            : name + " proposed a meeting"}
        </Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        {isConfirmed ? (
          <Text style={[fonts.Title3, { color: "#9E70F6", marginTop: 7 }]}>
            View Details
          </Text>
        ) : (
          <Text style={[fonts.Title3, { color: "#9E70F6", marginTop: 7 }]}>
            View Proposal
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NoticeBanner;
const styles = StyleSheet.create({
  button: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#9E70F6",
    padding: "3%",
    paddingRight: 40,
    paddingLeft: 40,
    borderRadius: 30,
    shadowOffset: { width: 3, height: 3 },
  },

  buttonText: {
    color: "white",
    fontFamily: "Rubik-Medium",
    fontSize: 16,
    textAlign: "center",
  },
});
