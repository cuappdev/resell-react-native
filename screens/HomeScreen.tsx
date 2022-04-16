import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
// import { SafeAreaView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAB } from "react-native-paper";
import { LogBox } from "react-native";
import { FILTER } from "../data/filter";
import { DATA } from "../data/product";
import { ButtonBanner } from "../components/ButtonBanner";
import { ProductList } from "../components/ProductList";
import Header from "../assets/svg-components/header";
import { HeaderIcon } from '../navigation/index';
import { pressedOpacity } from "../constants/Values";
import { homeBackgroundGray } from "../constants/Colors";

// LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
// LogBox.ignoreAllLogs();

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeTab">) {
  const [count, setCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await fetch("https://resell-dev.cornellappdev.com/api/post");
      const json = await response.json();
      setPosts(json.posts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    getPosts();
  }, []);


  return (
    <SafeAreaView style={styles.outer}>
      <View style={styles.header}>
        <Header style={styles.resellLogo} />
        <TouchableOpacity
          activeOpacity={pressedOpacity}
          style={styles.search}
        >
          <HeaderIcon name="search" color="black" size={28} />
        </TouchableOpacity>
      </View>
      <ButtonBanner count={count} setCount={setCount} data={FILTER} />
      <ProductList count={count} data={posts} filter={FILTER} navigation={navigation} />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("NewPost")}
        color={"#808080"}
        theme={{ colors: { accent: "white" } }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outer: {
    backgroundColor: "#F9F9F9",
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 10,
    bottom: 90,
  },
  header: {
    height: 40,
    backgroundColor: homeBackgroundGray,
  },
  resellLogo: {
    position: 'absolute', 
    left: 26,
  },
  search: {
    position: 'absolute',
    right: 20,
    top: 4,
  },
});
