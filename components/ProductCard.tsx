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
          marginHorizontal: 4,
          marginVertical: 8,
          borderWidth: 1,
          borderColor: "#CECECE",
        }}
      >
        <View>
          <Image
            source={props.image}
            style={{
              width: "100%",
              borderRadius: 10,
              resizeMode: "cover",
            }}
          />
        </View>
        <View
          style={{
            padding: 4,
            margin: 6,
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 8,
          }}
        >
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
    fontFamily: "Rubik-Medium",

    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    width: "65%",
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
