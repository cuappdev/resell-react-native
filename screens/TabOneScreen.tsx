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
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import { ListItem } from "react-native-elements/dist/list/ListItem";
export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#ECECEC" : "#ECECEC";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <ProductCard title={item.title} price={item.price} image={item.image} />
      // <Item
      //   item={item}
      //   onPress={() => setSelectedId(item.id)}
      //   backgroundColor={{ backgroundColor }}
      //   textColor={{ color }}
      // />
    );
  };
  const renderButton = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#ECECEC" : "#ECECEC";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Button title={"Funiture"} />
      // <Item
      //   item={item}
      //   onPress={() => setSelectedId(item.id)}
      //   backgroundColor={{ backgroundColor }}
      //   textColor={{ color }}
      // />
    );
  };
  return (
    <View style={{ backgroundColor: "#F9F9F9", height: "100%" }}>
      <SafeAreaView>
        <FlatList
          data={DATA}
          renderItem={renderButton}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
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
            extraData={selectedId}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          />
          <FlatList
            data={DATA1}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

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
    title: "Nice Pair of Jeans",
    image: require("../assets/images/item5.png"),
    price: "$18.00",
  },
  {
    id: "4",
    title: "Nike Air Force - Size 9.5",
    image: require("../assets/images/item1.png"),
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
];

const styles = StyleSheet.create({
  outer: {
    flexDirection: "row",
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "transparent",
    marginVertical: 8,
    marginHorizontal: 4,
  },
});
