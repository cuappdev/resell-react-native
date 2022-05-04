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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";

export default function SavedScreen({
  navigation,
}: RootTabScreenProps<"SavedTab">) {
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);
  AsyncStorage.getItem("userId", (errs, result) => {
    if (!errs) {
      if (result !== null) {
        setUserId(result);
      }
    }
  });
  useEffect(() => {
    getPosts();
  }, [userId]);

  const getPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/user/id/" + userId
      );
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        setPosts(json.user.saved);
      }
    } catch (error) {
      console.error(error);
      setFetchFailed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.outer}>
      {isLoading ? (
        <LoadingScreen />
      ) : fetchFailed ? (
        <LoadingScreen />
      ) : (
        <ProductList
          count={null}
          data={posts}
          filter={null}
          navigation={navigation}
          fromProfile={false}
        />
      )}
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
    backgroundColor: "#FFFFFF",
    height: "100%",
    padding: 0,
    paddingTop: 10,
  },
});
