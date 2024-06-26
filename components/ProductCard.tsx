import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-elements";

/**
 *
 * @param {directory} image - image directory surrounded by required() or image url
 * @param {string} title - title of the product
 * @param {double} price - price of the product
 * @param {boolean} hidden - whether this product should be hidden
 * @returns one cardview containing some basic product information
 */

const ProductCard = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View>
        <Image source={{ uri: props.image }} style={styles.image} />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.itemName}>{props.title}</Text>
        <Text style={styles.priceTag}>{"$" + props.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 4,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#CECECE",
    flex: 1,
    justifyContent: "center",
  },
  textBox: {
    padding: 4,
    margin: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  image: {
    height: 200,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: "cover",
  },
  itemName: {
    fontFamily: "Rubik-Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    width: "70%",
    margin: 1,
    paddingEnd: 10,
  },
  priceTag: {
    fontFamily: "Rubik-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 13,
    maxWidth: "30%",
    margin: 1,
    paddingEnd: 1,
    marginTop: 2,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
