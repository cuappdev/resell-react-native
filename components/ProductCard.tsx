import React from "react";

// import all the components we are going to use
import { StyleSheet, View, Text, Image } from "react-native";

const ProductCard = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={props.image} style={styles.image} />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.itemName}>{props.title}</Text>
        <Text style={styles.priceTag}>{props.price}</Text>
      </View>
    </View>
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
    width: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  itemName: {
    fontFamily: "Rubik-Medium",

    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    width: "75%",
    margin: 1,
    paddingEnd: 15,
  },
  priceTag: {
    fontFamily: "Rubik-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 13,
    lineHeight: 15,
    margin: 1,
    marginTop: 2,
  },
});
