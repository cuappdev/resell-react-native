import * as React from "react";
import { StyleSheet, TouchableOpacity, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { View } from "../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import { FILTER } from "../data/filter";
import { ProductList } from "../components/ProductList";

import HistoryList from "../components/HistoryList";
import { AntDesign } from "@expo/vector-icons";

// LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
// LogBox.ignoreAllLogs();

export default function SearchScreen({ navigation, route }) {
  const { history } = route.params;

  const [searchKeyWord, setSearchKeyword] = useState("");
  const [searchHistory, setSearchHistory] = useState(history);

  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const [data, setData] = useState([]);
  const [noResult, setNoResult] = useState(false);

  const backtoHome = () => {
    navigation.navigate("Home");
  };

  const [isLoading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);

  const getPosts = async (keyword) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/post/search/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            keywords: keyword,
          }),
        }
      );
      const json = await response.json();
      // console.log("json", json);
      setData(json.posts);
    } catch (error) {
      //console.error(error);
      setFetchFailed(true);
    } finally {
      setLoading(false);
    }
  };

  const searchSubmit = async (text) => {
    setIsSearchSubmitted(true);
    setSearchKeyword(text);

    var tempt = searchHistory.filter((i) => i != text.toLowerCase());
    if (tempt.length > 9) {
      tempt.pop();
    }
    tempt.unshift(text.toLowerCase());
    setSearchHistory(tempt);
    setHistory(JSON.stringify(tempt));
    getPosts(text);
  };
  useEffect(() => {
    if (!data || data.length == 0) {
      setNoResult(true);
    } else {
      setNoResult(false);
    }
  }, [data]);
  const setHistory = async (history) => {
    try {
      await AsyncStorage.setItem("history", history);
    } catch (e) {
      console.log(e);
    }
  };
  console.log("data", data);
  return (
    <SafeAreaView style={styles.outer}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <View style={styles.container}>
            <View style={styles.searchBar__clicked}>
              <TextInput
                style={styles.input}
                placeholder="What are you looking for"
                placeholderTextColor={"#707070"}
                returnKeyType="search"
                value={searchKeyWord}
                autoFocus={true}
                onChangeText={(text) => {
                  setIsSearchSubmitted(false);
                  setSearchKeyword(text);
                }}
                onSubmitEditing={(event) => {
                  var tempt = event.nativeEvent.text;
                  if (tempt.length > 0) {
                    searchSubmit(tempt);
                  }
                }}
              />
            </View>
          </View>
          <TouchableOpacity style={{ marginStart: 15 }} onPress={backtoHome}>
            <AntDesign name="close" size={25} color="#707070" />
          </TouchableOpacity>
        </View>
      </View>

      {isSearchSubmitted && noResult && (
        <View style={styles.noResultView}>
          <Text style={styles.noResultHeader}>No results</Text>
          <Text style={styles.noResultSubHeader}>
            Please try another search
          </Text>
        </View>
      )}
      <View style={{ marginTop: 15 }}>
        {isSearchSubmitted && !noResult && (
          <ProductList
            count={null}
            data={data}
            filter={null}
            navigation={navigation}
            fromProfile={false}
            onRefresh={null}
          />
        )}
        {!isSearchSubmitted && (
          <HistoryList
            searchSubmit={searchSubmit}
            searchHistory={searchHistory}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    paddingBottom: 120,
  },

  header: {
    height: 40,
  },

  container: {
    height: 45,
    marginLeft: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "80%",
  },
  searchBar: {
    position: "absolute",
    right: 20,
    top: 4,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#F4F4F4",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 40,
  },
  input: {
    fontFamily: "Rubik-Regular",
    fontSize: 18,
    width: "90%",
  },
  noResultView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  noResultHeader: { fontFamily: "Rubik-Medium", fontSize: 18, marginBottom: 8 },
  noResultSubHeader: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    color: "#707070",
  },
});
