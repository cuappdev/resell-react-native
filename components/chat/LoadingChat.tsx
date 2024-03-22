import { Feather } from "@expo/vector-icons";
import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";
import { useLoadAnim } from "../../hooks/useLoadAnim";

export default function LoadingChat() {
  const loadAnim = useLoadAnim();

  return (
    <Animated.View style={[{ opacity: loadAnim }, styles.animatedContainer]}>
      <View style={styles.profileImage} />
      <View style={{ flexDirection: "column", flex: 1, gap: 8 }}>
        <View style={styles.biggerPreview} />
        <View style={styles.smallerPreview} />
      </View>
      <View style={{ flex: 1 }} />
      <Feather
        name="chevron-right"
        color={Colors.stroke}
        size={24}
        style={{ marginRight: 16 }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    borderRadius: 26,
    width: 52,
    height: 52,
    backgroundColor: Colors.wash,
    marginLeft: 32,
    marginRight: 16,
  },
  biggerPreview: {
    height: 19,
    width: "100%",
    backgroundColor: Colors.wash,
    borderRadius: 100,
  },
  smallerPreview: {
    height: 17,
    width: "75%",
    backgroundColor: Colors.wash,
    borderRadius: 100,
  },
  animatedContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
