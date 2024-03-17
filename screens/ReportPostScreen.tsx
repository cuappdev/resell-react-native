import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BackButton from "../assets/svg-components/back_button";
import Layout, { menuBarTop } from "../constants/Layout";

export default function ReportPostScreen({ navigation, route }) {

  const presentDetails = (label) => {
    navigation.navigate("ReportPostDetails", {
      option: label
    });
  }

  const reportOptions = [
    { id: 1, title: 'Hate speech or symbols' },
    { id: 2, title: 'Bullying or harassment' },
    { id: 3, title: 'Sexual misconduct or nudity' },
    { id: 4, title: 'Spam' },
    { id: 5, title: 'Other' },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <BackButton color="black" />
      </TouchableOpacity>
      <Text style={styles.navHeader}>Report Post</Text>
      <Text style={styles.header}>Why do you want to report this post?</Text>
      <View style={styles.options}>
        {reportOptions.map(report => (
          <TouchableOpacity style={styles.cellContainer} onPress={() => presentDetails(report.title)}>
            <Text style={styles.cellText}>{report.title}</Text>
            <Feather style={styles.arrow} name={"chevron-right"} size={24} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  options: {
    flex: 1,
    top: Platform.OS === "ios" ? menuBarTop : 20,
    backgroundColor: "white",
    alignItems: "flex-start",
    marginTop: 16,
    width: "100%",
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? menuBarTop : 20,
    left: 10,
    zIndex: 15,
    width: 50,
    height: 50,
    alignItems: "center",
    color: "black"
  },
  navHeader: {
    top: Platform.OS === "ios" ? menuBarTop : 20,
    fontSize: 20,
    fontFamily: "Rubik-Medium",
  },
  header: {
    top: Platform.OS === "ios" ? menuBarTop : 20,
    marginTop: 30,
    fontSize: 18,
    fontFamily: "Rubik-Medium",
  },
  cellContainer: {
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 61,
    width: "100%",
    gap: 10,
  },
  cellText: {
    textAlign: "left",
    fontSize: 18,
    fontFamily: "Rubik-Regular",
  },
  arrow: {
    position: "absolute",
    right: 24,
  },
})