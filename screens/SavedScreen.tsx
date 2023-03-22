import * as React from "react";
import { StyleSheet, FlatList, SafeAreaView, Text, View } from "react-native";
import { LogBox } from "react-native";
import { ProductList } from "../components/ProductList";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import { useIsFocused } from "@react-navigation/native";
import { fonts } from "../globalStyle/globalFont";
import { getAccessToken } from "../utils/asychStorageFunctions";

export default function SavedScreen({ navigation }) {
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);
  const isFocused = useIsFocused();
  const [accessToken, setAccessToken] = useState("");
  getAccessToken(setAccessToken);

  useEffect(() => {
    getPosts();
  }, [userId]);

  const getPosts = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/post/save/",
        {
          method: "GET",
          headers: {
            Authorization: accessToken,

            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
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

  useEffect(() => {
    // update posts when home screen is entered again
    getPostsIngress();
  }, [isFocused]);
  console.log(userId);
  const getPostsIngress = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/post/save/",
        {
          method: "GET",
          headers: {
            Authorization: accessToken,

            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
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

  const getSavedRefreshed = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/post/save/",
        {
          method: "GET",
          headers: {
            Authorization: accessToken,

            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
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
      setTimeout(() => {
        setLoading(false);
      }, 500); //display loading animation
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
          <Text style={[fonts.pageHeading2, { marginBottom: 8 }]}>
            No results
          </Text>
          <Text
            style={[
              fonts.body1,
              {
                color: "#707070",
              },
            ]}
          >
            Go and explore some posts
          </Text>
        </View>
      ) : (
        <ProductList
          data={posts}
          navigation={navigation}
          screen={"Saved"}
          onRefresh={getSavedRefreshed}
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
});
