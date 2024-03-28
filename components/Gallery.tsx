import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
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
  const [currentPage, setCurrentPage] = useState(0);

  var images: JSX.Element[] = [];
  for (let i = 0; i < imagePaths.length; i++) {
    images.push(
      <View key={i} style={styles.page}>
        <Background>
          <View>
            <FastImage
              style={styles.itemImage}
              source={{ uri: imagePaths[i] }}
            />
          </View>
        </Background>
      </View>
    );
  }

  const onPageSelected = (event: any) => {
    setCurrentPage(event.nativeEvent.position);
  };

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={onPageSelected}
      >
        {images}
      </PagerView>
      <View style={styles.indicatorContainer}>
        {imagePaths.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              { backgroundColor: index === currentPage ? "#333" : "#ccc" },
            ]}
          />
        ))}
      </View>
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
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
