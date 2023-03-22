import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { makeToast } from "../utils/Toast";

const RequestCard = ({
  title,
  description,
  numberReceived,
  requestId,
  index,
  row,
  prevOpenedRow,
  setPrevOpenedRow,
  navigation,
}) => {
  function closeRow(index) {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }

    setPrevOpenedRow(row[index]);
  }
  const deleteRequest = () => {
    fetch("https://resell-dev.cornellappdev.com/api/request/id/" + requestId, {
      method: "DELETE",
    }).then(function (response) {
      if (!response.ok) {
        let error = new Error(response.statusText);
        throw error;
      } else {
        makeToast("Request Deleted");
        return response.json();
      }
    });
  };

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-105, -104, 0],
      outputRange: [0, 1, 104],
    });
    return (
      <TouchableOpacity onPress={deleteRequest}>
        <Animated.View
          style={[
            {
              width: 80,
              height: 80,
              backgroundColor: "#F20000",
              borderRadius: 15,
              marginTop: 10,
              marginEnd: 24,
              justifyContent: "center",
              alignItems: "center",
            },
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          <Feather name="trash" size={28} color="white" />
        </Animated.View>
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable
      renderRightActions={renderRightActions}
      ref={(ref) => (row[index] = ref)}
      onSwipeableOpen={() => closeRow(index)}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          navigation.navigate("RequestMatches", {
            requestId: requestId,
            title: title,
          })
        }
      >
        <Animated.View style={[styles.textBox]}>
          <Text style={styles.title}>{title}</Text>
          <Text numberOfLines={1} style={styles.description}>
            {description}
          </Text>
        </Animated.View>
        {numberReceived > 0 && (
          <View
            style={{
              position: "absolute",
              width: numberReceived > 9 ? 26 : 20,
              height: 16,
              backgroundColor: "#9E70F6",
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              marginStart: 12,
              right: 16,
              top: 12,
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 10, lineHeight: 12 }}>
              {numberReceived ? "9+" : numberReceived}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Swipeable>
  );
};
export default RequestCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#CECECE",
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 16,
    height: 80,
  },
  textBox: {
    width: "100%",

    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "space-between",
  },

  title: {
    fontFamily: "Rubik-Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    width: "100%",

    marginEnd: 40,
  },
  description: {
    fontFamily: "Rubik-Regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    width: "100%",

    marginEnd: 40,
  },
});
