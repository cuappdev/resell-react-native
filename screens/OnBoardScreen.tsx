import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Platform,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import PurpleButton from "../components/PurpleButton";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { menuBarTop } from "../constants/Layout";

import { IconButton, Colors } from "react-native-paper";
import { black } from "react-native-paper/lib/typescript/styles/colors";

export default function OnBoardScreen({ navigation }) {
  // HOW DO U DEFINE LIKE THE NEW HOME??

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.titleText}>Set Up Your Profile</Text>
      <Image
        style={styles.profilePic}
        source={require("../assets/images/empty_profile.png")}
      />
      <Text style={styles.username}>Username*</Text>
      <TextInput
        style={styles.username_input}
        placeholderTextColor={"#707070"}
      />
      <Text style={styles.bio}>Bio</Text>

      <TextInput style={styles.bio_input} placeholderTextColor={"#707070"} />
      <KeyboardAvoidingView style={styles.purpleButton}>
        <PurpleButton
          text={"Continue"}
          onPress={() => {
            navigation.navigate("Venmo");
          }}
        />
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
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
    height: "100%",
    top: menuBarTop,
    alignItems: "center",
    flexDirection: "column",
    // possubly remove this if all the text is center
  },
  titleText: {
    fontFamily: "Roboto-Medium",
    fontSize: 18,
    marginTop: 20,
  },
  profilePic: {
    height: 132,
    width: 132,
    marginTop: 40,
  },
  username: {
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
    alignItems: "center",
    width: "100%",
    height: 170,
    backgroundColor: "white",
    position: "absolute",
    bottom: 20,
  },
});
