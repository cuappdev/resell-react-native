import React from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import { ProductList } from "../components/ProductList";
import { fonts } from "../globalStyle/globalFont";
import LoadingScreen from "./LoadingScreen";

export const OwnPostRoute = ({
  navigation,
  isLoading,
  fetchFailed,
  posts,
  onRefresh,
}) => (
  <View
    style={{
      height: "100%",
      flex: 1,
    }}
  >
    {isLoading ? (
      <LoadingScreen screen={"Profile"} />
    ) : fetchFailed ? (
      <LoadingScreen screen={"Profile"} />
    ) : posts.length > 0 ? (
      <ProductList
        data={posts}
        screen={"Profile"}
        navigation={navigation}
        onRefresh={onRefresh}
      />
    ) : (
      <View
        style={[
          styles.noResultView,
          Platform.OS === "ios" ? { marginBottom: 60 } : { marginBottom: 90 },
        ]}
      >
        <Text style={[fonts.pageHeading2, { marginBottom: 8 }]}>
          No Posts Found
        </Text>
        <Text style={[fonts.body1, { color: "#707070" }]}>
          Go and make your first post
        </Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  noResultView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
