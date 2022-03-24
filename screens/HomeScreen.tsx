import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
// import { SafeAreaView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
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
import SearchBar from "../components/SearchBar";

// LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
// LogBox.ignoreAllLogs();

export default function HomeScreen({
  navigation,
}) {
  const [count, setCount] = useState(0);
  const search = () => { }

  return (
    <SafeAreaView style={styles.outer}>
      <View style={styles.header}>
        <Header style={styles.resellLogo} />
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('SearchHome')}
          activeOpacity={pressedOpacity}
          style={styles.search}
        >
          <HeaderIcon name="search" color="black" size={28} />
        </TouchableOpacity> */}
        <SearchBar
          setSearchPhrase={search}
        />
      </View>
      <ButtonBanner count={count} setCount={setCount} data={FILTER} />
      <ProductList count={count} data={DATA} filter={FILTER} navigation={navigation} />
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
    width: "100%",
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row",
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
