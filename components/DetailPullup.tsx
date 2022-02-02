import React from "react";
import { FlatList, Image, StyleSheet } from "react-native";
import { Text, View } from "./Themed";

export type Item = {
  images: number[];
  title: string;
  price: number;
  sellerName: string;
  sellerProfile: string;
  description: string;
  similarItems: number[]
}

export function DetailPullUpHeader({ item }: { item: Item }) {
  return (
    <View style={[styles.container, styles.roundCorner]}>
      <View style={styles.expandRow}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{"$ " + item.price}</Text>
      </View>
      <View style={styles.paddedRow}>
        <Image source={{ uri: item.sellerProfile }} style={styles.profileImage} />
        <Text style={styles.profile}>{item.sellerName}</Text>
      </View>
    </View>
  );
}

export function DetailPullUpBody({ item }: { item: Item }) {
  return (
    <View style={styles.container}>
      <Text style={styles.details}>{item.description}</Text>
      <Text style={styles.itemsHeader}>Similar Items</Text>
      <FlatList
        data={item.similarItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image source={item} style={styles.similarItem}>
          </Image>
        )}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%"
  },
  roundCorner: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  expandRow: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  paddedRow: {
    flexDirection: 'row',
    alignItems: "center",
    marginBottom: 25
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  price: {
    fontSize: 20
  },
  profile: {
    fontSize: 16,
    paddingLeft: 10
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  details: {
    fontSize: 15,
    marginBottom: 50
  },
  itemsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20
  },
  similarItem: {
    width: 85,
    height: 85,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 15,
  }
});
