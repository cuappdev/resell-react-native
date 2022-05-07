import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ScrollView,
  RefreshControl,
  View,
  Platform,
} from "react-native";
import ProductCard from "./ProductCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Constructs a Button react component
 * @param {int} count - position of the category selected, starting from 0
 * @param {list} filter - a list of button names/ filter product categories
 * @param {list} data - a list of product with basic information like, title, id, price, and images directory
 * @returns two horizontal list of product cards
 */
export function ProductList({ data, navigation, onRefresh, screen }) {
  const [userId, setUserId] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  AsyncStorage.getItem("userId", (errs, result) => {
    if (!errs) {
      if (result !== null) {
        setUserId(result);
      }
    }
  });
  const renderItem = ({ item }) => {
    return (
      <ProductCard
        title={item.title}
        price={item.price}
        image={item.images ? item.images[0] : null}
        onPress={() => {
          fetch(
            "https://resell-dev.cornellappdev.com/api/post/isSaved/userId/" +
              userId +
              "/postId/" +
              item.id
          )
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else return null;
            })
            .then((response) => {
              if (response != null) {
                navigation.navigate("ProductHome", {
                  post: item,
                  screen: screen,
                  savedInitial: response.isSaved,
                });
              }
            });
        }}
      />
    );
  };

  var i,
    j,
    data1 = [],
    data2 = [];

  if (data) {
    for (i = 0, j = data.length; i < j; i += 1) {
      if (i % 2 == 0) {
        data1.push(data[i]);
      } else {
        data2.push(data[i]);
      }
    }
  }

  return (
    <SafeAreaView style={styles.inner}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh && (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          )
        }
      >
        <View
          style={[
            { display: "flex", flexDirection: "row" },
            Platform.OS === "ios" ? { marginBottom: 60 } : { marginBottom: 90 },
          ]}
        >
          <FlatList
            data={data1}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            style={{ width: "50%" }}
          />
          <FlatList
            data={data2}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            style={{ width: "50%" }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inner: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "transparent",
    marginHorizontal: 8,
  },
});
