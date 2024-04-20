import React from "react";

import { Image, StyleSheet, Text, View } from "react-native";
export function NegotiationProductBubble({ product, price, image }) {
  return (
    <View style={[styles.outer]}>
      <View>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={[styles.inner]}>
        <Text style={styles.productText}>{product}</Text>
        <Text style={styles.priceText}>$ {price}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  outer: {
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    flexDirection: "row",
    borderRadius: 15,
    width: "90%",
    paddingHorizontal: 16,
    gap: 16,
  },
  inner: {
    flexDirection: "column",
    marginVertical: 24,
    flex: 1,
  },
  productText: {
    fontFamily: "Rubik-Bold",
    fontSize: 20,
    marginVertical: 4,
    maxWidth: "100%",
  },
  priceText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    marginVertical: 4,
  },
  image: {
    height: 90,
    width: 120,
    resizeMode: "cover",
    borderRadius: 15,
  },
});
