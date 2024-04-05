import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useApiClient } from "../api/ApiClientProvider";
import ProductCard from "./ProductCard";

/**
 * Constructs a Button react component
 * @param {int} count - position of the category selected, starting from 0
 * @param {list} filter - a list of button names/ filter product categories
 * @param {list} data - a list of product with basic information like, title, id, price, and images directory
 * @returns two horizontal list of product cards
 */
export function ProductList({ data, navigation, onRefresh, screen }) {
  const [userId, setUserId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  AsyncStorage.getItem("accessToken", (errs, result) => {
    if (!errs) {
      if (result !== null && result != undefined) {
        setAccessToken(result);
      }
    }
  });
  const api = useApiClient();

  AsyncStorage.getItem("userId", (errs, result) => {
    if (!errs) {
      if (result !== null && result !== undefined) {
        setUserId(result);
      }
    }
  });
  const isSaved = async (item) => {
    try {
      const response = await api.get(`/post/isSaved/postId/${item.id}`);
      console.log(`response: ${JSON.stringify(response)}`);

      if (response.ok) {
        const json = await response.json();
        if (json != null) {
          navigation.navigate("ProductHome", {
            post: item,
            screen: screen,
            savedInitial: json.isSaved,
          });
        }
        console.log("ok");
      } else {
        const json = await response.json();
        console.log("NoProduct");
        console.log(`json: ${JSON.stringify(json)}`);
      }
    } catch (error) {
      console.log(error);
      console.log(accessToken);
      console.log(item.id);
      console.log(userId);
    }
  };
  const renderItem = ({ item }) => {
    return (
      <ProductCard
        title={item.title}
        price={item.altered_price}
        image={item.images ? item.images[0] : null}
        onPress={() => isSaved(item)}
      />
    );
  };

  var i,
    j,
    data1: any[] = [],
    data2: any[] = [];

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
            <RefreshControl
              tintColor={"#DE6CD3"}
              colors={["#DE6CD3"]}
              refreshing={false}
              onRefresh={onRefresh}
            />
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
