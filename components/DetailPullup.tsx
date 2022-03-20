import React from "react";
import { FlatList, Image, StyleSheet, ScrollView } from "react-native";
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
    <View
      style={[styles.container_header, styles.roundCorner]}>
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
    <ScrollView style={styles.pullUpScrollView} >
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
    </ScrollView >
  );
}

const styles = StyleSheet.create({

  pullUpScrollView: {
    flex: 1,
    width: "100%",
    backgroundColor: 'white',
    marginBottom: 130
  },
  container_header: {
    justifyContent: "flex-start",
    width: "100%"
  },
  container_body: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%"
  },
  roundCorner: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  expandRow: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 50
  },
  paddedRow: {
    flexDirection: 'row',
    alignItems: "center",
    marginBottom: 25
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 20
  },
  price: {
    fontSize: 20,
    paddingRight: 20,
  },
  profile: {
    fontSize: 16,
    paddingLeft: 25,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  details: {
    fontSize: 15,
    paddingLeft: 20,
  },
  itemsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    paddingLeft: 20,
    paddingTop: 20
  },
  similarItem: {
    width: 85,
    height: 85,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    paddingLeft: 20,
  }
});