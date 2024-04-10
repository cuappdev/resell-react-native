import React from "react";
import { View } from "react-native";
import Colors from "../../constants/Colors";

export default function BottomSheetHandle() {
  // ok to inline styles here since this component is a single view right now
  return (
    <View
      style={{
        width: 64,
        backgroundColor: Colors.stroke,
        borderRadius: 100,
        height: 6,
        alignSelf: "center",
        marginBottom: 30,
        marginTop: 12,
      }}
    ></View>
  );
}
