import * as React from "react";
import { StyleSheet, FlatList, SafeAreaView, Text } from "react-native";
import { LogBox } from "react-native";
import { View } from "../components/Themed";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../components/ProductCard";
import { ProductList } from "../components/ProductList";

import { RootTabScreenProps } from "../types";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import { useIsFocused } from "@react-navigation/native";

export default function SavedScreen({
  navigation,
}: RootTabScreenProps<"SavedTab">) {
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);
  const isFocused = useIsFocused();

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
        // console.log(json);
        setPosts(json.user.saved);
      }
    } catch (error) {
      console.error(error);
      setFetchFailed(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // update posts when home screen is entered again
    getPostsIngress();
  }, [isFocused]);
  const getPostsIngress = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/user/id/" + userId
      );
      if (response.ok) {
        const json = await response.json();
        // console.log(json);
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
    <View style={[styles.outer]}>
      {isLoading ? (
        <LoadingScreen screen={"Saved"} />
      ) : fetchFailed ? (
        <LoadingScreen screen={"Saved"} />
      ) : posts.length == 0 ? (
        <View style={styles.noResultView}>
          <Text style={styles.noResultHeader}>No results</Text>
          <Text style={styles.noResultSubHeader}>
            Go and explore some posts
          </Text>
        </View>
      ) : (
        <ProductList
          data={posts}
          navigation={navigation}
          screen={"Saved"}
          onRefresh={undefined}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    padding: 0,
    paddingTop: 10,
    flex: 1,
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
