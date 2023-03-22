import React, { useRef, useEffect } from "react";
import { Animated, Image, StyleSheet, View, Dimensions } from "react-native";

const scaledWidth = Dimensions.get("window").width - 32;
const scaledHeight = (scaledWidth * 961) / 512;

export default function LoadingScreen({ screen }) {
  const loadAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(loadAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(loadAnim, {
          toValue: 0,
          duration: 500,
          delay: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
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
