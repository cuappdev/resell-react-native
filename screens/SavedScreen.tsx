import { useIsFocused } from "@react-navigation/native";
import * as React from "react";
import { useEffect, useState } from "react";
import { LogBox, StyleSheet, Text, View } from "react-native";
import { useApiClient } from "../api/ApiClientProvider";
import { ProductList } from "../components/ProductList";
import { fonts } from "../globalStyle/globalFont";
import { makeToast } from "../utils/Toast";
import LoadingScreen from "./LoadingScreen";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

export default function SavedScreen({ navigation }) {
  const [posts, setPosts] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const api = useApiClient();
  const isFocused = useIsFocused();

  const getPosts = async () => {
    try {
      if (posts === null) {
        setLoading(true);
      }
      const response = await api.get("/post/save/");
      if (response.posts) {
        setPosts(response.posts);
        setLoading(false);
      } else {
        makeToast({ message: "Failed to load saved posts", type: "ERROR" });
      }
    } catch (error) {
      makeToast({ message: "Failed to load saved posts", type: "ERROR" });
    }
  };

  useEffect(() => {
    // update posts when home screen is entered again
    getPosts();
  }, [isFocused]);

  return (
    <View style={[styles.outer]}>
      {isLoading ? (
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
          onRefresh={getPosts}
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
