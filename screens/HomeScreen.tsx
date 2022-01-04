import * as React from "react";
import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { FlatList, SafeAreaView, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { FAB } from "react-native-paper";
import { LogBox } from "react-native";
import { FILTER } from "../data/filter";
import { DATA } from "../data/product";
import { ButtonBanner } from "../components/ButtonBanner";
import { ProductRecyclerView } from "../components/ProductRecyclerView";

// LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
// LogBox.ignoreAllLogs();

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeTab">) {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.outer}>
      <ButtonBanner count={count} setCount={setCount} data={FILTER} />
      <ProductRecyclerView count={count} data={DATA} filter={FILTER} />
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

const styles = StyleSheet.create({
  outer: {
    backgroundColor: "#F9F9F9",
    height: "100%",
    padding: 0,
    paddingBottom: 75,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 10,
    bottom: 90,
  },
});
