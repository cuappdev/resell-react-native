import * as React from "react";
import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import { LogBox } from "react-native";
import { View } from "../components/Themed";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../components/ProductCard";
import { ProductList } from "../components/ProductList";

import { RootTabScreenProps } from "../types";
// LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
// LogBox.ignoreAllLogs();

export default function SavedScreen({
  navigation,
}: RootTabScreenProps<"SavedTab">) {
  return (
    <View style={styles.outer}>
      <ProductList count={null} data={DATA} filter={null} />
    </View>
  );
}

const DATA = [
  {
    id: "1",
    title: "Bedside Table - Beige ",
    image: require("../assets/images/beige.png"),
    price: "$15.00",
  },
  {
    id: "2",
    title: "Pan",
    image: require("../assets/images/pan.png"),
    price: "$9.00",
  },
  {
    id: "3",
    title: "Stainless Steel Teapot",
    image: require("../assets/images/teapot.png"),
    price: "$16.00",
  },
];
const styles = StyleSheet.create({
  outer: {
    backgroundColor: "#F9F9F9",
    height: "100%",
    padding: 0,
    paddingBottom: 75,
  },
});
