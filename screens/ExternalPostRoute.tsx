import React from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import { ProductList } from "../components/ProductList";
import { fonts } from "../globalStyle/globalFont";
import LoadingScreen from "./LoadingScreen";

export const ExternalPostRoute = ({
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
          No listings posted
        </Text>
        <Text style={[fonts.body1, styles.bodyText]}>
          When you post a listing, it will be displayed here
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
  bodyText: {
    color: "#707070",
    marginHorizontal: 48,
    textAlign: "center",
  }
});
