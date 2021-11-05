import React from "react";
import { StyleSheet, Image, FlatList } from "react-native";
import { View, Text } from "./Themed";

const item = {
  title: "Blue Pants",
  user: "ravina patel",
  description: `
  Vintage blue pants that are super comfy and cool!
  Condition
  ISBN
  Additional Information
  `,
  price: 25.00
}

const similarItems: string[] = [
  "rainbow pants",
  "clear pants",
  "khaki pants",
  "jean pants",
  "short pants",
  "long pants",
  "pant legs",
  "fancy pants"
]

export default function DetailPullUp() {
  return (
    <View style={styles.container}>
      <View style={styles.expandRow}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{"$ " + item.price + ".00"}</Text>
      </View>
      <View style={styles.paddedRow}>
        <Image source={require("../assets/images/icon.png")} style={styles.profileImage} />
        <Text style={styles.profile}>{item.user}</Text>
      </View>
      <Text style={styles.details}>{item.description}</Text>
      <Text style={styles.itemsHeader}>Similar Items</Text>
      <FlatList
        data={similarItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image source={require("../assets/images/icon.png")} style={styles.similarItem}>
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
    padding: 20,
    justifyContent: "center"
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