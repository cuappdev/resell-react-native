import React from "react";
import { Animated, Dimensions, Image, StyleSheet } from "react-native";
import { useLoadAnim } from "../hooks/useLoadAnim";

const scaledWidth = Dimensions.get("window").width - 32;
const scaledHeight = (scaledWidth * 961) / 512;

export default function LoadingScreen({ screen }) {
  const loadAnim = useLoadAnim();
  return (
    <Animated.View
      style={[
        styles.container,
        {
          // Bind opacity to animated value
          opacity: loadAnim,
        },
      ]}
    >
      {(screen == "Saved" || screen == "Search") && (
        <Image
          style={styles.emptyFeed}
          source={require("../assets/images/smallLoading.png")}
          resizeMethod="resize"
        />
      )}
      {screen == "Profile" && (
        <Image
          style={styles.emptyFeed}
          source={require("../assets/images/mediumLoading.jpg")}
        />
      )}
      {screen == "Home" && (
        <Image
          style={styles.emptyFeed}
          source={require("../assets/images/empty_feed.png")}
          resizeMethod="resize"
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 8,
  },
  emptyFeed: {
    width: scaledWidth,
    resizeMode: "stretch",
  },
});
