import { LinearGradient } from "expo-linear-gradient";
import React, { Children, ReactElement } from "react";
import { Image, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

function Background({ children }: { children: JSX.Element }) {
  return (
    <LinearGradient
      colors={["#D4D4D4", "#ECECEC", "#ECECEC"]}
      start={{ x: 0, y: 0.01 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradientBackground}
    >
      {children}
    </LinearGradient>
  );
}

export default function Gallery({ imagePaths }: { imagePaths: string[] }) {
  var images: JSX.Element[] = [];
  for (let i = 0; i < imagePaths.length; i++) {
    images.push(
      <View key={i.toString()} style={styles.page}>
        <Background>
          <View>
            <Image
              style={styles.itemImage}
              source={{ uri: imagePaths[i] }}
              blurRadius={5}
            />
            <Image
              style={styles.itemImageTop}
              source={{ uri: imagePaths[i] }}
            />
          </View>
        </Background>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        showPageIndicator={true}
      >
        {images}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  page: {
    alignItems: "center",
    justifyContent: "center",
  },
  itemImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  itemImageTop: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    zIndex: 10,
    position: "absolute",
  },
  gradientBackground: {
    width: "100%",
    height: "100%",
  },
});
