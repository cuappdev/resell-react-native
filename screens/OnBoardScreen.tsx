import * as React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import PurpleButton from "../components/PurpleButton";
import { menuBarTop } from "../constants/Layout";

export default function OnBoardScreen({ navigation }) {
  const [text, setText] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Set Up Your Profile</Text>
      <Image
        style={styles.profilePic}
        source={require("../assets/images/empty_profile.png")}
      />
      <View style={{ flexDirection: "column", width: "100%" }}>
        <Text style={styles.username}>
          {text.length > 0 ? "Username" : "Username*"}
        </Text>
        <TextInput
          value={text}
          onChangeText={(text) => setText(text)}
          style={styles.username_input}
          placeholderTextColor={"#707070"}
        />
        <Text style={styles.bio}>Bio</Text>
        <TextInput style={styles.bio_input} placeholderTextColor={"#707070"} />
      </View>

      <View style={styles.purpleButton}>
        <PurpleButton
          text={"Continue"}
          onPress={() => {
            navigation.navigate("Venmo");
          }}
        />
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
    height: "100%",
    paddingTop: menuBarTop,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
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
    marginBottom: 10,
    fontSize: 18,
    marginStart: 10,
    fontFamily: "Rubik-Medium",
  },
  username_input: {
    backgroundColor: "#F4F4F4",
    width: "100%",
    borderRadius: 15,
    paddingVertical: 10,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  bio: {
    marginBottom: 10,
    marginTop: 30,
    marginStart: 10,
    fontSize: 18,
    fontFamily: "Rubik-Medium",
  },
  bio_input: {
    backgroundColor: "#F4F4F4",
    width: "100%",
    borderRadius: 15,
    paddingVertical: 10,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 18,
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
