import React from "react";
import { FlatList, Image, StyleSheet, ScrollView } from "react-native";
import { Text, View } from "./Themed";
import ModalBar from "../assets/svg-components/modal_bar";

export type Item = {
  images: string[];
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
      <View style={styles.modalBar}>
        <ModalBar/>
      </View>
      <View style={styles.expandRow}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{"$" + item.price}</Text>
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
  modalBar: {
    width: "100%",
    alignItems: "center",
    position: 'absolute',
    top: 12,
    backgroundColor: "transparent",
  },
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
    marginTop: 40
  },
  paddedRow: {
    flexDirection: 'row',
    alignItems: "center",
    marginBottom: 25
  },
  title: {
    fontSize: 24,
    paddingLeft: 20,
    fontFamily: 'Rubik-Medium',
  },
  price: {
    fontSize: 22,
    fontFamily: 'Rubik-Medium',
    paddingRight: 20,
  },
  profile: {
    fontSize: 16,
    paddingLeft: 25,
    fontFamily: 'Rubik-Regular',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  details: {
    fontSize: 15,
    paddingLeft: 20,
    fontFamily: 'Rubik-Regular',
  },
  itemsHeader: {
    fontSize: 18,
    marginBottom: 20,
    paddingLeft: 20,
    paddingTop: 20,
    fontFamily: 'Rubik-Medium',
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