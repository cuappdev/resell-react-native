import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { Modal, Portal } from "react-native-paper";
import ColoredPlus from "../assets/svg-components/colored_plus";
import NewListing from "../assets/svg-components/newListing";
import NewListingClicked from "../assets/svg-components/newListingClicked";
import NewRequest from "../assets/svg-components/newRequest";
import NewRequestClicked from "../assets/svg-components/newRequestClicked";

const spinValue = useRef(new Animated.Value(0)).current;

export const ExpandablePlusButton = ({
  onRequestPressed,
  onListingPressed,
  expand,
  setExpand,
}) => {
  const [onListing, setOnListing] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      Animated.spring(spinValue, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      setExpand(false);
    }
  }, [isFocused]);


  const onExpand = () => {
    if (expand) {
      Animated.spring(spinValue, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      setExpand(false);
    } else {
      Animated.spring(spinValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      setExpand(true);
    }
  };
  // First set up animation

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-45deg"],
  });
  return (
    <View
      style={{
        position: "absolute",
        width: expand ? "100%" : 60,
        height: expand ? "100%" : 60,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        bottom: 0,
        right: 0,
        zIndex: 1,
      }}
    >
      {expand && (
        <TouchableOpacity
          style={styles.expandableView}
          onPress={onExpand}
        />
      )}
      <TouchableOpacity
        style={styles.newListingButton}
        onPressIn={() => setOnListing(true)}
        onPressOut={() => setOnListing(false)}
        onPress={onListingPressed}
      >
      </TouchableOpacity>
      <Animated.View
        style={styles.newListingButtonContainer}
      >
        {onListing ? <NewListingClicked /> : <NewListing />}
      </Animated.View>

      <TouchableOpacity
        style={styles.newRequestButton}
        onPressIn={() => setOnRequest(true)}
        onPressOut={() => setOnRequest(false)}
        onPress={onRequestPressed}
      >
      </TouchableOpacity>
      <Animated.View
        style={styles.newRequestButtonContainer}
      >
        {onRequest ? <NewRequestClicked /> : <NewRequest />}
      </Animated.View>

      <LinearGradient
        colors={["#DF9856", "#DE6CD3", "#AD68E3"]}
        style={styles.highLight}
        start={{ x: 0.9, y: 0 }}
        end={{ x: 0.1, y: 1 }}
      >
        <TouchableOpacity style={[styles.plusButton]} onPress={onExpand}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <ColoredPlus />
          </Animated.View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const listingBottom = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: [0, -160],
});
const requestBottom = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: [0, -90],
});
const fade = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 1],
});

const styles = StyleSheet.create({
  highLight: {
    position: "absolute",
    bottom: 100,
    right: 25,
    borderRadius: 30,
    width: 60,
    height: 60,
    alignContent: "center",
    paddingVertical: 2,
    paddingHorizontal: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  plusButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 28,
    width: 56,
    height: 56,
  },
  expandableView: {
    backgroundColor: "#000000",
    opacity: 0.2,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  newListingButton: {
    position: "absolute",
    right: 25,
    bottom: 260,
    width: 153,
    height: 43,
    zIndex: 100,
  },
  newListingButtonContainer: {
    position: "absolute",
    right: 25,
    bottom: 100,
    opacity: fade,
    zIndex: 0,
    transform: [{ translateY: listingBottom }],
  },
  newRequestButton: {
    position: "absolute",
    right: 25,
    bottom: 190,
    width: 163,
    height: 43,
    zIndex: 100,
  },
  newRequestButtonContainer: {
    position: "absolute",
    right: 25,
    bottom: 100,
    opacity: fade,
    zIndex: 0,
    transform: [{ translateY: requestBottom }],
  },
});
