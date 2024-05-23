import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
  Dimensions,
  RefreshControl,
} from "react-native";
import BackButton from "../assets/svg-components/back_button";
import { menuBarTop } from "../constants/Layout";
import Colors from "../constants/Colors";
import { useApiClient } from "../api/ApiClientProvider";
import { makeToast } from "../utils/Toast";
import FastImage from "react-native-fast-image";
import PopupSheet from "../components/PopupSheet";
import { fonts } from "../globalStyle/globalFont";
import { getUserId } from "../utils/asychStorageFunctions";

export default function BlockedUsersScreen({ navigation }) {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Record<string, any>>({});
  const [userId, setUserId] = useState("");

  const apiClient = useApiClient();

  const getBlockedUsers = async () => {
    try {
      const response = await apiClient.get(`/user/blocked/id/${userId}`);
      if (response.users) {
        setBlockedUsers(response.users);
      } else {
        makeToast({ message: "Error blocking user", type: "ERROR" });
      }
    } catch (error) {
      console.log(`BlockedUsersScreen.getBlockedUsers failed: ${error}`);
    }
  };

  const unblockUser = async () => {
    try {
      const response = await apiClient.post(`/user/unblock/`, {
        unblocked: selectedUser.id,
      });
      if (response.user) {
        setBlockedUsers(response.user.blocking);
        setModalVisible(false);
      } else {
        makeToast({ message: "Error unblocking user", type: "ERROR" });
      }
    } catch (e) {
      console.log(`BlockedUsersScreen.unblockUser: ${e}`);
    }
  };

  // Fetch user ID first
  useEffect(() => {
    getUserId(setUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      getBlockedUsers();
    }
  }, [userId]);

  const renderItem = ({ item }) => (
    <View style={styles.cell}>
      <View style={styles.userContainer}>
        <FastImage
          style={styles.profileImage}
          source={{ uri: item.photoUrl }}
        />
        <Text style={styles.userName}>{item.username}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setSelectedUser(item);
          setModalVisible(true);
        }}
        style={styles.unblockButton}
      >
        <Text style={styles.unblockButtonText}>Unblock</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {blockedUsers.length == 0 && (
        <View style={[styles.noResultView]}>
          <Text style={[fonts.pageHeading2, { marginBottom: 8 }]}>
            No blocked users
          </Text>
          <Text
            style={[
              fonts.body1,
              {
                color: "#707070",
                textAlign: "center",
                paddingHorizontal: "10%",
              },
            ]}
          >
            Users you have blocked will appear here.
          </Text>
        </View>
      )}
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
        refreshControl={
          <RefreshControl
            tintColor={"#DE6CD3"}
            colors={["#DE6CD3"]}
            refreshing={false}
            onRefresh={getBlockedUsers}
          />
        }
      />
      <PopupSheet
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        actionName={`Unblock ${selectedUser.username}`}
        submitAction={unblockUser}
        buttonText={"Unblock"}
        description={"They will be able to message you and view your posts."}
        errorState={true}
      />
    </View>
  );
}

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
    backgroundColor: "purple",
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
  },
  noResultView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
