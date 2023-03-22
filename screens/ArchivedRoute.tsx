import React from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import { ProductList } from "../components/ProductList";
import { fonts } from "../globalStyle/globalFont";
import LoadingScreen from "./LoadingScreen";

export const ArchivedPost = ({
  navigation,
  isLoading,
  fetchFailed,
  archived,
  onRefresh,
}) => (
  <View style={[{ height: "100%", flex: 1 }]}>
    {isLoading ? (
      <LoadingScreen screen={"Profile"} />
    ) : fetchFailed ? (
      <LoadingScreen screen={"Profile"} />
    ) : archived.length == 0 ? (
      <View
        style={[
          styles.noResultView,
          Platform.OS === "ios" ? { marginBottom: 60 } : { marginBottom: 90 },
        ]}
      >
        <Text style={[fonts.pageHeading2, { marginBottom: 8 }]}>
          No Archived Item Found
        </Text>
      </View>
    ) : (
      <ProductList
        data={archived}
        screen={"Archived"}
        navigation={navigation}
        onRefresh={onRefresh}
      />
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
