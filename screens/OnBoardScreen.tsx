import { Feather } from "@expo/vector-icons";
import * as React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import PurpleButton from "../components/PurpleButton";
import { pressedOpacity } from "../constants/Values";

export default function OnBoardScreen({ navigation }) {
  const [image, setImage] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const [text, setText] = useState("");
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.profilePic}
          source={
            image === ""
              ? require("../assets/images/empty_profile.png")
              : { uri: image }
          }
        />
        <TouchableOpacity
          activeOpacity={pressedOpacity}
          style={styles.roundButton1}
          onPress={() => {
            pickImage();
          }}
        >
          <Feather name="edit-2" size={18} color="black" />
        </TouchableOpacity>
      </View>
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
          enabled={text.length > 0 && image !== ""}
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
  roundButton1: {
    width: 32,
    height: 32,
    position: "absolute",
    bottom: 0,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    elevation: 10,
    shadowOpacity: 0.2,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 3 },
    backgroundColor: "white",
  },
  container: {
    height: "100%",
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
    marginTop: 30,
    borderRadius: 66,
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
    borderRadius: 10,
    paddingVertical: 10,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  fab: {
    position: "relative",
    right: 10,
    bottom: 10,
    padding: 0,
    width: 32,
    height: 32,
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
    borderRadius: 10,
    paddingVertical: 10,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 18,
    minHeight: 100,
  },
  purpleButton: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    bottom: "10%",
  },
});
