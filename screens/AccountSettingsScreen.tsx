import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
} from "react-native";

import { getUserId } from "../utils/asychStorageFunctions";
import BackButton from "../assets/svg-components/back_button";
import Edit from "../assets/svg-components/edit";
import { Feather } from "@expo/vector-icons";
import { menuBarTop } from "../constants/Layout";
import DeleteImage from "../assets/svg-components/deleteImage";

export default function AccountSettingsScreen({ navigation }) {
  const [userId, setUserId] = useState("");

  getUserId(setUserId);

  const getUser = async () => {
    try {
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/user/id/" + userId
      );
      if (response.ok) {
        const json = await response.json();
        const user = json.user;
        navigation.navigate("EditProfile", {
          initialRealname: user.givenName + " " + user.familyName,
          initialUsername: user.username,
          initialBio: user.bio,
          initialNetId: user.netid,
          initialVenmo: user.venmoHandle,
          initialImage: user.photoUrl,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <BackButton color="black" />
      </TouchableOpacity>
      <View style={styles.title}>
        <Text style={styles.titleText}>Account Settings</Text>
      </View>
      <FlatList
        scrollEnabled={false}
        style={styles.list}
        data={[
          {
            icon: Edit,
            text: "Edit Profile",
            onPress: () => getUser(),
          },
          {
            icon: null,
            text: "Delete Account",
            onPress: () => console.log("No Screen yet") // TODO: Implement this screen
          },
        ]}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={item.onPress ? item.onPress : () => { }}
            style={styles.item}
          >
            {item.icon != null && <item.icon />}
            <Text
              style={[styles.itemText, item.icon == null && { color: "red" }]}
            >{item.text}</Text>
            <Feather
              name="chevron-right"
              size={22}
              color="black"
              style={[styles.itemChevron, item.icon == null && { color: "red" }]}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? menuBarTop : 20,
    left: 10,
    zIndex: 1,
    width: 50,
    height: 50,
    alignItems: "center",
  },
  title: {
    position: "absolute",
    top: Platform.OS === "ios" ? menuBarTop : 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  titleText: {
    fontFamily: "Rubik-Medium",
    fontSize: 18,
  },
  item: {
    marginTop: 40,
    marginLeft: 24,
    marginRight: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemText: {
    fontFamily: "Rubik-Regular",
    fontSize: 18,
    marginLeft: 20,
  },
  itemChevron: {
    marginLeft: "auto",
    marginRight: 0,
  },
  list: {
    top: Platform.OS === "ios" ? menuBarTop + 30 : 50,
  },
})