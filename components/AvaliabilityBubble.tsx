import React, { useState } from "react";
import Modal from "react-native-modal";

import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import WeekView, { createFixedWeekDate } from "react-native-week-view";
import { AntDesign, Feather } from "@expo/vector-icons";

export function AvaliabilityBubble({ userName, schedule }) {
  return (
    <View style={styles.outer}>
      <Text style={styles.textStyle}>{userName}'s Avaliability</Text>
      <TouchableOpacity
        style={{
          marginLeft: 15,
          marginTop: "auto",
        }}
        onPress={() => {}}
      >
        <Feather name="chevron-right" size={24} color="#9E70F6" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,

    flexDirection: "row",
    width: "80%",
    backgroundColor: "rgba(158, 112, 246, 0.1)",
    borderRadius: 15,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignContent: "space-around",
  },

  textStyle: {
    fontFamily: "Rubik-Medium",
    fontSize: 16,
    fontWeight: "500",
    color: "#9E70F6",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
