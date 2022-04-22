import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TextInput,
  ScrollView,
} from "react-native";
import PurpleButton from "../components/PurpleButton";
import SkipButton from "../components/SkipButton";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { menuBarTop } from "../constants/Layout";

import { IconButton, Colors } from "react-native-paper";
import { black } from "react-native-paper/lib/typescript/styles/colors";

export default function LinkVenmoScreen({
  setSignIn,
}: {
  setSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Link Your Venmo</Text>
      <Text style={styles.description}>
        Your Venmo handle will only be visible to people interested in buying
        your listing.
      </Text>
      <Text style={styles.handle}>Venmo Handle</Text>
      <TextInput
        style={styles.username_input}
        placeholderTextColor={"#707070"}
      />
      <View style={styles.purpleButton}>
        <PurpleButton text={"Continue"} onPress={undefined} />
      </View>
      <View style={styles.skipButton}>
        <SkipButton text={"Skip"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    position: "absolute",
    top: menuBarTop,
    left: 20,
    right: 20,
    alignItems: "center",
    // possubly remove this if all the text is center
  },
  titleText: {
    fontFamily: "Roboto-Medium",
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
  },
  description: {
    height: 132,
    width: 132,
    marginTop: 40,
  },
  handle: {
    marginTop: 30,
    marginRight: 260,
    fontWeight: "bold",
    // position: "absolute"
  },
  username_input: {
    backgroundColor: "#F4F4F4",
    width: "100%",
    borderRadius: 15,
    height: 40,
  },
  bio: {
    marginTop: 30,
    marginRight: 320,
    fontWeight: "bold",
    // position: "absolute"
  },
  bio_input: {
    backgroundColor: "#F4F4F4",
    width: "100%",
    borderRadius: 15,
    height: 40,
  },
  purpleButton: {
    // position: "absolute",
    bottom: 100,
    alignItems: "center",
    width: "100 %",
    zIndex: 10,
    height: 170,
    backgroundColor: "white",
    marginTop: 350,
  },
  skipButton: {
    // position: "absolute",
    bottom: 100,
    alignItems: "center",
    width: "100 %",
    zIndex: 10,
    height: 170,
    backgroundColor: "white",
    marginTop: 350,
  },
});
