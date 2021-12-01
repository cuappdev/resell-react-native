import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import { ListItem } from "react-native-elements/dist/list/ListItem";
import { useState, useEffect } from "react";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [count, setCount] = useState(0);

  const renderItem = ({ item }) => {
    return (
      <ProductCard title={item.title} price={item.price} image={item.image} />
    );
  };

  const renderButton = ({ item }) => {
    return (
      <Button
        title={item.title}
        id={item.id}
        count={count}
        setCount={setCount}
      />
    );
  };
  return (
    <View
      style={{
        backgroundColor: "#F9F9F9",
        height: "100%",
        padding: 0,
        paddingBottom: 75,
      }}
    >
      <SafeAreaView style={styles.filter}>
        <FlatList
          data={FILTER}
          renderItem={renderButton}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          horizontal={true}
        />
      </SafeAreaView>

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView style={styles.outer}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          />
          <FlatList
            data={DATA1}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
const FILTER = [
  {
    id: "0",
    title: "Funiture",
  },
  { id: "1", title: "Books" },
  { id: "2", title: "Kitchen Supplies" },
  { id: "3", title: "Electronics" },
  { id: "4", title: "Clothes" },
];

const DATA = [
  {
    id: "1",
    title: "Nike Air Force - Size 9.5",
    image: require("../assets/images/item2.png"),
    price: "$90.00",
  },
  {
    id: "2",
    title: "Brown Rotating Chair",
    image: require("../assets/images/item3.png"),
    price: "$52.00",
  },
  {
    id: "3",
    title: "Pants",
    image: require("../assets/images/Pants.png"),
    price: "$52.00",
  },
  {
    id: "4",
    title: "Nike Air Force - Size 9.5",
    image: require("../assets/images/item1.png"),
    price: "$90.00",
  },
  {
    id: "5",
    title: "Guitar",
    image: require("../assets/images/Guitar.png"),
    price: "$90.00",
  },
];
const DATA1 = [
  {
    id: "1",
    title: "Milk and Honey Paperback",
    image: require("../assets/images/item1.png"),
    price: "$16.00",
  },
  {
    id: "2",
    title: "Lamp",
    image: require("../assets/images/item4.png"),
    price: "$14.00",
  },
  {
    id: "3",
    title: "Nice Pair of Jeans",
    image: require("../assets/images/item5.png"),
    price: "$18.00",
  },
  {
    id: "4",
    title: "Clock",
    image: require("../assets/images/Clock.png"),
    price: "$14.00",
  },
  {
    id: "5",
    title: "White Shirt",
    image: require("../assets/images/WhiteT.png"),
    price: "$14.00",
  },
];

const styles = StyleSheet.create({
  outer: {
    flexDirection: "row",
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "transparent",
    marginVertical: 8,
    marginHorizontal: 8,
  },
  filter: { marginStart: 12, marginTop: 9, marginBottom: 12 },
});
