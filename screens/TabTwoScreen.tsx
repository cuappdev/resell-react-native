import * as React from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../components/ProductCard";

export default function TabTwoScreen() {
  const renderItem = ({ item }) => {
    return (
      <ProductCard title={item.title} price={item.price} image={item.image} />
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
    title: "Stainless Steel Teapot",
    image: require("../assets/images/teapot.png"),
    price: "$16.00",
  },
];
const DATA1 = [
  {
    id: "1",
    title: "Pan",
    image: require("../assets/images/pan.png"),
    price: "$9.00",
  },
];

const styles = StyleSheet.create({
  outer: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "transparent",
    marginVertical: 8,
    marginHorizontal: 8,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingBottom: 75,
  },
});
