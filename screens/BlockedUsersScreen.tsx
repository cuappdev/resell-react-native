import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
  Dimensions,
} from "react-native";
import BackButton from "../assets/svg-components/back_button";
import { menuBarTop } from "../constants/Layout";
import Colors from "../constants/Colors";
import { useApiClient } from "../api/ApiClientProvider";
import { makeToast } from "../utils/Toast";
import FastImage from "react-native-fast-image";
import { relative } from "path";
import PopupSheet from "../components/PopupSheet";

export default function BlockedUsersScreen({ route, navigation }) {
  const { userID } = route.params;
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState("")

  const apiClient = useApiClient()

  const getBlockedUsers = async () => {
    try {
      const response = await apiClient.get(`/user/blocked/id/${userID}/`);
      if (response.users) {
        setBlockedUsers(response.users)
      } else {
        makeToast({ message: "Error blocking user", type: "ERROR" });
      }
    } catch (e: unknown) { }
  }

  const unblockUser = async ({ item }) => {
    try {
      console.log(item)
      const response = await apiClient.post(`/user/unblock/`, {
        blocked: item
      });
      if (response.user) {
        setBlockedUsers(response.user.blocking)
      } else {
        makeToast({ message: "Error blocking user", type: "ERROR" });
      }
    } catch (e: unknown) { }
  }

  useEffect(() => {
    getBlockedUsers()
    setBlockedUsers(
      [
        {
          id: "1",
          username: "Richie",
          photoUrl: ""
        },
        {
          id: "2",
          username: "Zach",
          photoUrl: ""
        },
        {
          id: "3",
          username: "Nancy",
          photoUrl: ""
        },
        {
          id: "4",
          username: "Archit",
          photoUrl: ""
        },
        {
          id: "5",
          username: "Vin",
          photoUrl: ""
        },
        {
          id: "6",
          username: "Justin",
          photoUrl: ""
        }
      ])
  }, userID);



  getBlockedUsers()

  const renderItem = ({ item }) => (
    <View style={styles.cell}>
      <View style={styles.userContainer}>
        <FastImage style={styles.profileImage} source={{ uri: item.photoUrl }} />
        <Text style={styles.userName}>{item.username}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setSelectedUser(item.username)
          setModalVisible(true)
        }}
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
        keyExtractor={(item) => item.id}
        style={styles.userList}
      />
      <PopupSheet
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        actionName={`Unblock ${selectedUser}`}
        submitAction={unblockUser}
        buttonText={"Unblock"}
        description={"They will be able to message you and view your posts."}
        errorState={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cell: {
    flexDirection: "row",
    height: 85,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 48,
  },
  userContainer: {
    zIndex: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    height: 50,
    width: Dimensions.get("window").width - 100,
  },
  title: {
    position: "absolute",
    // zIndex: 100,
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
    backgroundColor: "purple"
  },
  userName: {
    flex: 1,
    fontFamily: "Rubik-Regular",
    fontSize: 18,
  },
  unblockButton: {
    zIndex: 100,
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
  userList: {
    top: Platform.OS === "ios" ? menuBarTop + 40 : 60,
  }
});