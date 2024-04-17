import { useIsFocused } from "@react-navigation/native";
import * as React from "react";
import { useEffect, useState } from "react";
import { LogBox, Platform, StyleSheet, Text, View } from "react-native";
import { ProductList } from "../components/ProductList";
import LoadingScreen from "./LoadingScreen";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

import { fonts } from "../globalStyle/globalFont";
import { useApiClient } from "../api/ApiClientProvider";

export default function RequestMatches({ navigation, route }) {
  const { requestId } = route.params;

  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);
  const isFocused = useIsFocused();

  const apiClient = useApiClient();

  useEffect(() => {
    getMatches();
  }, []);

  const getMatches = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/request/matches/id/${requestId}`);
      if (response.request) {
        setPosts(response.request.matches);
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
      const response = await apiClient.get(`/request/matches/id/${requestId}`);
      if (response.request) {
        setPosts(response.request.matches);
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
