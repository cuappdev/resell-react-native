import * as React from "react";
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  Platform,
  View,
} from "react-native";
import { LogBox } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../components/ProductCard";
import { ProductList } from "../components/ProductList";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import { useIsFocused } from "@react-navigation/native";

import { fonts } from "../globalStyle/globalFont";

export default function RequestMatches({ navigation, route }) {
  const { requestId } = route.params;

  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    getMatches();
  }, []);

  const getMatches = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/request/matches/id/" +
          requestId
      );
      if (response.ok) {
        const json = await response.json();
        console.log(json.posts);
        setPosts(json.posts);
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
    getMatchesIngress();
  }, [isFocused]);
  const getMatchesIngress = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/request/matches/id/" +
          requestId
      );
      if (response.ok) {
        const json = await response.json();
        // console.log(json);
        setPosts(json.posts);
      }
    } catch (error) {
      console.error(error);
      setFetchFailed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.outer,
        Platform.OS === "ios" ? { paddingBottom: 60 } : { paddingBottom: 90 },
      ]}
    >
      <View
        style={[
          {
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          },
        ]}
      >
        {isLoading ? (
          <LoadingScreen screen={"Saved"} />
        ) : fetchFailed ? (
          <LoadingScreen screen={"Saved"} />
        ) : posts.length > 0 ? (
          <ProductList
            data={posts}
            navigation={navigation}
            screen={"Saved"}
            onRefresh={undefined}
          />
        ) : (
          <View style={styles.noResultView}>
            <Text style={[fonts.pageHeading2, { marginBottom: 8 }]}>
              No Match Found
            </Text>
            <Text
              style={[
                fonts.body1,
                {
                  color: "#707070",
                  textAlign: "center",
                  paddingHorizontal: "10%",
                },
              ]}
            >
              We will notify you if there is any post match your request
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  noResultView: {
    marginTop: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
