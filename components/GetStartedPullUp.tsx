import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import ResellLogo from "../assets/svg-components/resell_logo";
import { fonts } from "../globalStyle/globalFont";

export function DetailPullUpHeader({ title, description }) {
  return (
    <View style={styles.expandRow}>
      <Text
        style={[fonts.pageHeading3, { color: "#9E70F6", marginBottom: 30 }]}
      >
        {title}
      </Text>
      <ResellLogo width={75} height={145} props={undefined} />
      <Text
        style={[
          fonts.body1,
          { marginTop: 30, width: 269, textAlign: "center" },
        ]}
      >
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container_header: {
    justifyContent: "flex-start",
    width: "100%",
  },

  expandRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 40,
    alignItems: "center",
  },
});
