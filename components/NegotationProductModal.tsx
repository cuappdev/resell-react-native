import React, { useState } from "react";
import Modal from "react-native-modal";

import { StyleSheet, Text, Pressable, View, Alert, Image } from "react-native";
export function NegotiationProductBubble({ product, price, image }) {
  return (
    <View style={styles.outer}>
      <View>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.inner}>
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
  },
  inner: {
    flexDirection: "column",
    marginVertical: 24,
    marginHorizontal: 10,
    width: "70%",
  },
  productText: {
    fontFamily: "Rubik-Bold",
    fontSize: 20,
    marginVertical: 4,
    maxWidth: "85%",
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
    margin: 8,
  },
});
