import React from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export function AvailabilityBubble({
  userName,
  setIsBubble,
  setAvailabilityVisible,
  setInputSchedule,
  schedule,
  setAvailabilityUserName,
}) {
  return (
    <TouchableOpacity
      style={styles.outer}
      activeOpacity={0.7}
      onPress={() => {
        if (schedule != null) {
          if (!(schedule[0].endDate instanceof Date)) {
            schedule.forEach((element, index) => {
              const endDate = element.endDate.toDate();
              const startDate = element.startDate.toDate();
              schedule[index].endDate = endDate;
              schedule[index].startDate = startDate;
            });
          }
          setInputSchedule(schedule);
          setAvailabilityUserName(userName);
          console.log(schedule);
          setAvailabilityVisible(true);
          setIsBubble(true);
        }
      }}
    >
      <Text style={styles.textStyle}>{userName}'s Availability</Text>
      <View
        style={{
          marginLeft: 15,
          marginTop: "auto",
        }}
      >
        <Feather name="chevron-right" size={24} color="#9E70F6" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outer: {
    flexDirection: "row",
    backgroundColor: "rgba(158, 112, 246, 0.1)",
    borderRadius: 15,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignContent: "space-around",
  },

  textStyle: {
    fontFamily: "Rubik-Regular",
    fontSize: 17,
    color: "#9E70F6",
    lineHeight: 20,
    fontWeight: "700",
    textAlign: "left",
    width: "85%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
