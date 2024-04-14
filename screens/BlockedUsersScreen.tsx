import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
} from "react-native";
import BackButton from "../assets/svg-components/back_button";
import { menuBarTop } from "../constants/Layout";
import Colors from "../constants/Colors";
import { useApiClient } from "../api/ApiClientProvider";
import { makeToast } from "../utils/Toast";
import FastImage from "react-native-fast-image";

export default function BlockedUsersScreen({ route, navigation }) {
  const { userID } = route.params;
  const [blockedUsers, setBlockedUsers] = useState([]);

  const apiClient = useApiClient()

  const getBlockedUsers = async () => {
    try {
      console.log("COOL")
      const response = await apiClient.post(`/user/id/${userID}/blocked`);
      if (response.users) {
        setBlockedUsers(response.users)
      } else {
        makeToast({ message: "Error blocking user", type: "ERROR" });
      }
    } catch (e: unknown) { }
  }

  const unblockUser = ({ item }) => {

  }

  useEffect(() => {
    getBlockedUsers()
  }, userID);

  getBlockedUsers()

  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <FastImage style={styles.profileImage} source={{ uri: item.photoUrl }} />
      <Text style={styles.userName}>{item.username}</Text>
      <TouchableOpacity
        onPress={() => unblockUser(item.id)}
        style={styles.unblockButton}
      >
        <Text style={styles.unblockButtonText}>Unblock</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <BackButton color="black" />
      </TouchableOpacity>
      <View style={styles.title}>
        <Text style={styles.titleText}>Blocked Users</Text>
      </View>
      <FlatList
        data={blockedUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  userContainer: {
    top: Platform.OS === "ios" ? menuBarTop + 40 : 60,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    height: 84
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
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? menuBarTop : 20,
    left: 10,
    zIndex: 1,
    width: 50,
    height: 50,
    alignItems: "center",
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 50,
    marginRight: 15,
  },
  userName: {
    flex: 1,
    fontFamily: "Rubik-Regular",
    fontSize: 18,
  },
  unblockButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.resellPurple,
    borderRadius: 50,
  },
  unblockButtonText: {
    color: "white",
    fontFamily: "Rubik-Regular",
    fontSize: 18,
  },
});