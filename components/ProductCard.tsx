import React from "react";

// import all the components we are going to use
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";

//import Card
import { Card } from "react-native-elements";
import { clockRunning } from "react-native-reanimated";

const ProductCard = (props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 10,
          overflow: "hidden",
          width: "90%",
          marginHorizontal: 4,
          marginVertical: 8,
        }}
      >
        <View>
          <Image source={props.image} />
        </View>
        <View style={{ padding: 8, flexDirection: "row" }}>
          <Text style={styles.itemName}>{props.title}</Text>
          <Text>{props.price}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    shadowRadius: 1,
    display: "flex",
    flex: 1,
  },
  image: {
    resizeMode: "cover",
  },
  itemName: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    width: "65%",
  },
  priceTag: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 13,
    lineHeight: 15,
  },
});
