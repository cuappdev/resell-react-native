import React from "react";
import { SafeAreaView, StyleSheet, FlatList, ScrollView, RefreshControl, View } from "react-native";
import ProductCard from "./ProductCard";

/**
 * Constructs a Button react component
 * @param {int} count - position of the category selected, starting from 0
 * @param {list} filter - a list of button names/ filter product categories
 * @param {list} data - a list of product with basic information like, title, id, price, and images directory
 * @returns two horizontal list of product cards
 */
export function ProductList({ count, filter, data, navigation, onRefresh, fromProfile = false }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const renderItem = ({ item }) => {
    var show = true;
    if (filter && count) {
      show = filter[count].title === item.category;
      if (filter[count].title === "All") show = true;
    } else {
      show = true;
    }

    return show ? (
      <ProductCard
        title={item.title}
        price={item.price}
        image={item.images ? item.images[0] : null}
        onPress={() => navigation.navigate("ProductHome", {post: item, showTrash: fromProfile})}
      />
    ) : null;
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
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh &&
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={{display: 'flex', flexDirection: 'row'}}>
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
