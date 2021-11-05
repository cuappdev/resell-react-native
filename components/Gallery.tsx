import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { View, Text } from "./Themed";

export default function Gallery() {
  return (
    <View style={styles.container}>
      <PagerView style={styles.pagerView} initialPage={0} showPageIndicator={true}>
        <View key="1" style={styles.page}>
          <LinearGradient
            colors={['#D4D4D4', '#ECECEC', '#ECECEC']}
            start={{ x: 0, y: 0.01 }}
            end={{ x: 0, y: 1 }}
            style={styles.button}>
            <Image style={styles.itemImage} source={require("../assets/images/favicon.png")} />
          </LinearGradient>
        </View>
        <View key="2" style={styles.page}>
          <LinearGradient
            colors={['#D4D4D4', '#ECECEC', '#ECECEC']}
            start={{ x: 0, y: 0.01 }}
            end={{ x: 0, y: 1 }}
            style={styles.button}
          >
            <Image style={styles.itemImage} source={require("../assets/images/icon.png")} />
          </LinearGradient>
        </View>
        <View key="3">
          <LinearGradient
            colors={['#D4D4D4', '#ECECEC', '#ECECEC']}
            start={{ x: 0, y: 0.01 }}
            end={{ x: 0, y: 1 }}
            style={styles.button}>
            <Image style={styles.itemImage} source={require("../assets/images/splash.png")} />
          </LinearGradient>
        </View>
      </PagerView >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pagerView: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "55%"
  },
  page: {
    alignItems: "center",
    justifyContent: "center"
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  button: {
    width: "100%",
    height: "100%"
  }
});