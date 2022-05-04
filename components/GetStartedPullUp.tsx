import React from "react";
import { FlatList, Image, StyleSheet, ScrollView } from "react-native";
import ResellLogo from "../assets/svg-components/resell_logo";
import { Text, View } from "./Themed";

export function DetailPullUpHeader({ title, description }) {
  return (
    <View style={[styles.container_header, styles.roundCorner]}>
      <View style={styles.expandRow}>
        <Text style={styles.title}>{title}</Text>
        <ResellLogo width={58} height={78} props={undefined} />
        <Text style={styles.details}>{description}</Text>
      </View>
      <View style={styles.paddedRow}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  pullUpScrollView: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    marginBottom: 130,
  },
  container_header: {
    justifyContent: "flex-start",
    width: "100%",
  },
  container_body: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
  },
  roundCorner: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  expandRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 50,
    alignItems: "center",
  },
  paddedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#9E70F6",
    marginBottom: 20,
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
    borderRadius: 15,
  },
  details: {
    fontSize: 18,
    paddingTop: 40,
    paddingHorizontal: 40,
    textAlign: "center",
  },
  itemsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    paddingLeft: 20,
    paddingTop: 20,
  },
  similarItem: {
    width: 85,
    height: 85,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    paddingLeft: 20,
  },
});
