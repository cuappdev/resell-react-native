import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from "react-native";
import PurpleButton from "../components/PurpleButton";
import { menuBarTop } from "../constants/Layout";

export default function OnBoardScreen({ navigation }) {

  return (
    <View style={styles.container}>
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
    paddingHorizontal: 20
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
