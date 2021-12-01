import * as React from "react";
import { StyleSheet, Pressable } from "react-native";

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
import { FAB } from "react-native-paper";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [count, setCount] = useState(0);

  const renderItem = ({ item }) => {
    var show = FILTER[count].title === item.category;
    if (FILTER[count].title === "All") show = true;
    return show ? (
      <ProductCard title={item.title} price={item.price} image={item.image} />
    ) : null;
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
          keyExtractor={(item) => item.id.toString(10)}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          horizontal={true}
        />
      </SafeAreaView>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={styles.outer}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            style={{ width: "50%" }}
          />
          <FlatList
            data={DATA1}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            style={{ width: "50%" }}
          />
        </SafeAreaView>
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("NewPost")}
        color={"#808080"}
        theme={{ colors: { accent: "white" } }}
      />
    </View>
  );
}
const FILTER = [
  {
    id: 0,
    title: "All",
  },
  {
    id: 1,
    title: "Funiture",
  },
  { id: 2, title: "Books" },
  { id: 3, title: "Electronics" },
  { id: 4, title: "Clothes" },
  { id: 5, title: "Musical Instruments" },
];

const DATA = [
  {
    id: "1",
    title: "Nike Air Force - Size 9.5",
    image: require("../assets/images/item2.png"),
    price: "$90.00",
    category: "Clothes",
  },
  {
    id: "2",
    title: "Brown Rotating Chair",
    image: require("../assets/images/item3.png"),
    price: "$52.00",
    category: "Funiture",
  },
  {
    id: "3",
    title: "Pants",
    image: require("../assets/images/Pants.png"),
    price: "$52.00",
    category: "Clothes",
  },
  {
    id: "4",
    title: "Lamp",
    image: require("../assets/images/item4.png"),
    price: "$14.00",
    category: "Electronics",
  },

  {
    id: "5",
    title: "Guitar",
    image: require("../assets/images/Guitar.png"),
    price: "$90.00",
    category: "Musical Instruments",
  },
  {
    id: "6",
    title: "Book For Trading",
    image: require("../assets/images/booktrade.png"),
    price: "$25.00",
    category: "Books",
  },
];
const DATA1 = [
  {
    id: "1",
    title: "Milk and Honey Paperback",
    image: require("../assets/images/item1.png"),
    price: "$16.00",
    category: "Books",
  },

  {
    id: "2",
    title: "Nice Pair of Jeans",
    image: require("../assets/images/item5.png"),
    price: "$18.00",
    category: "Clothes",
  },
  {
    id: "3",
    title: "Clock",
    image: require("../assets/images/Clock.png"),
    price: "$14.00",
    category: "Electronics",
  },
  {
    id: "4",
    title: "Piano",
    image: require("../assets/images/piano.png"),
    price: "$200.00",
    category: "Musical Instruments",
  },
  {
    id: "5",
    title: "White Shirt",
    image: require("../assets/images/WhiteT.png"),
    price: "$14.00",
    category: "Clothes",
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 10,
    bottom: 90,
  },
});
