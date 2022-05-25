import React from "react";
import { FlatList, Image, StyleSheet, ScrollView } from "react-native";
import ResellLogo from "../assets/svg-components/resell_logo";
import { Text, View } from "./Themed";

export function DetailPullUpHeader({ title, description }) {
  return (
    <View style={[styles.container_header, styles.roundCorner]}>
      <View style={styles.expandRow}>
        <Text style={styles.title}>{title}</Text>
        <ResellLogo width={75} height={145} props={undefined} />
        <Text style={styles.details}>{description}</Text>
      </View>
      <View style={styles.paddedRow}></View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 40,
    alignItems: "center",
  },
  paddedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#9E70F6",
    fontFamily: "Rubik-Regular",
    marginBottom: 30,
  },

  details: {
    fontSize: 16,
    marginTop: 30,
    fontWeight: "500",
    fontFamily: "Rubik-Regular",
    width: "70%",
    textAlign: "center",
  },
});
