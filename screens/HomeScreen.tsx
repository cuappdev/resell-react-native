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
import { HeaderIcon } from "../navigation/index";
import { pressedOpacity } from "../constants/Values";
import { homeBackgroundGray } from "../constants/Colors";
import SearchBar from "../components/SearchBar";

// LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
// LogBox.ignoreAllLogs();

export default function HomeScreen({ navigation }) {
  const [count, setCount] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearchResult] = useState([]);
  const backtoHome = () => {
    setIsSearch(false);
  };

  return (
    <SafeAreaView style={styles.outer}>
      <View style={styles.header}>
        {!isSearch && <Header style={styles.resellLogo} />}
        {!isSearch && (
          <TouchableOpacity
            activeOpacity={pressedOpacity}
            style={styles.searchButton}
            onPress={() => {
              setIsSearch(true);
            }}
          >
            <HeaderIcon name="search" color="black" size={28} />
          </TouchableOpacity>
        )}
        {isSearch && (
          <TouchableOpacity
            activeOpacity={pressedOpacity}
            style={styles.searchBar}
          >
            <SearchBar back={backtoHome} setSearchResult={setSearchResult} />
          </TouchableOpacity>
        )}
      </View>
      <ButtonBanner
        count={count}
        setCount={setCount}
        data={FILTER}
        //   modalVisible={undefined}
        //   setModalVisible={undefined}
      />
      <ProductList
        count={count}
        data={DATA}
        filter={FILTER}
        navigation={navigation}
      />
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
    position: "absolute",
    left: 26,
  },
  searchBar: {
    position: "absolute",
    right: 20,
    top: 4,
    left: 0,
  },
  searchButton: {
    position: "absolute",
    right: 20,
    top: 4,
  },
});
