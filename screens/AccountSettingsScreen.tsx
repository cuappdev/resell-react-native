import React, { useEffect, useState } from "react";
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
import DeleteAccountPopupSheet from "../components/DeleteAccountPopupSheet";
import { useApiClient } from "../api/ApiClientProvider";
import { makeToast } from "../utils/Toast";
import { useDispatch } from "react-redux";
import { logout } from "../state_manage/reducers/signInReducer";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { userRef } from "../config/firebase";

export default function AccountSettingsScreen({ navigation }) {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const apiClient = useApiClient();
  const dispatch = useDispatch();
  const log_out = () => dispatch(logout());

  getUserId(setUserId);

  const getUsername = async () => {
    try {
      const response = await apiClient.get(`/user/id/${userId}`);

      if (response.user) {
        const user = response.user;
        setUsername(user.username);
        setUserEmail(user.email);
        setDeleteModalVisible(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await apiClient.get(`/user/id/${userId}`);
      if (response.user) {
        const user = response.user;
        setUsername(user.username);
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

  const deleteAccount = async () => {
    try {
      const response = await apiClient.post(`/user/softdelete/id/${userId}/`);
      if (response.user) {
        const ref = doc(userRef, userEmail);
        await deleteDoc(ref)
        console.log("Successfully Deleted Account");
        console.log(JSON.stringify(response));
        log_out();
      } else {
        makeToast({ message: "Error deleting account", type: "ERROR" });
      }
    } catch (e) {
      console.log(`AccountSettingsScreen.deleteAccount failed: ${e}`);
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
            onPress: () => {
              getUsername();
            },
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
            >
              {item.text}
            </Text>
            <Feather
              name="chevron-right"
              size={22}
              color="black"
              style={[
                styles.itemChevron,
                item.icon == null && { color: "red" },
              ]}
            />
          </TouchableOpacity>
        )}
      />
      <DeleteAccountPopupSheet
        isVisible={deleteModalVisible}
        setIsVisible={setDeleteModalVisible}
        deleteAction={deleteAccount}
        username={username}
      />
    </View>
  );
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
});
