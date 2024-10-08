import firestore from "@react-native-firebase/firestore";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { WebView } from "react-native-webview";
import BackButton from "../assets/svg-components/back_button";
import Feedback from "../assets/svg-components/feedback";
import Logout from "../assets/svg-components/logout";
import Notifications from "../assets/svg-components/notifications";
import { menuBarTop } from "../constants/Layout";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import Blocked from "../assets/svg-components/blocked";
import EditPencil from "../assets/svg-components/editPencil";
import Terms from "../assets/svg-components/terms";
import { auth, userRef } from "../config/firebase";
import Colors from "../constants/Colors";
import { logout } from "../state_manage/reducers/signInReducer";
import {
  getUserId,
  getUsername,
  storeEmail,
  storeSignedIn,
} from "../utils/asychStorageFunctions";
import Privacy from "../assets/svg-components/privacy";
import { ActivityIndicator } from "react-native-paper";
import { useApiClient } from "../api/ApiClientProvider";
import { makeToast } from "../utils/Toast";
import DeleteAccountPopupSheet from "../components/DeleteAccountPopupSheet";

export default function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();
  const log_out = () => dispatch(logout());

  const [loading, setLoading] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [showEULA, setShowEULA] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  getUserId(setUserId);
  getUsername(setUsername);

  const apiClient = useApiClient();

  const editProfile = async () => {
    try {
      const response = await apiClient.get(`/user/id/${userId}`);
      if (response.user) {
        const user = response.user;
        setUserId(user.id);

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
      console.error(`SettingsScreen.editProfile failed: ${error}`);
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await apiClient.post(`/user/softdelete/id/${userId}/`);
      if (response.user) {
        await userRef
          .doc(auth.currentUser.email)
          .delete()
        log_out();
      }
    } catch (error) {
      console.log(`SettingsScreen.deleteAccount failed: ${error}`);
      makeToast({ message: "Error deleting account", type: "ERROR" });
    }
  };

  const presentEULA = () => {
    setShowEULA(true);
  };

  const presentPrivacyPolicy = () => {
    setShowPrivacyPolicy(true);
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
        <Text style={styles.titleText}>Settings</Text>
      </View>
      <FlatList
        scrollEnabled={false}
        style={styles.list}
        data={[
          {
            icon: EditPencil,
            text: "Edit Profile",
            onPress: () => {
              editProfile();
            },
          },
          {
            icon: Notifications,
            text: "Notifications",
            onPress: () => navigation.navigate("NotificationPreferences"),
          },
          {
            icon: Feedback,
            text: "Send Feedback",
            onPress: () => navigation.navigate("SendFeedback"),
          },
          {
            icon: Blocked,
            text: "Blocked Users",
            onPress: () =>
              navigation.navigate("BlockedUsers", {
                userID: userId,
              }),
          },
          {
            icon: Terms,
            text: "Terms and Conditions",
            onPress: presentEULA,
          },
          {
            icon: Privacy,
            text: "Privacy Policy",
            onPress: presentPrivacyPolicy,
          },
          {
            icon: Logout,
            text: "Log Out",
            onPress: () => {
              setModalVisibility(true);
            },
          },
          {
            icon: null,
            text: "Delete Account",
            onPress: () => {
              setDeleteModalVisible(true);
            },
          },
        ]}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={item.onPress ? item.onPress : () => {}}
            style={styles.item}
          >
            {item.icon != null && <item.icon style={styles.itemIcon} />}
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
      <Modal
        isVisible={modalVisibility}
        backdropOpacity={0.2}
        onBackdropPress={() => {
          setModalVisibility(false);
        }}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View style={styles.slideUp}>
          <Text style={[styles.buttonText2, { padding: "3%" }]}>
            Log out of Resell?
          </Text>
          <TouchableOpacity
            onPress={async () => {
              storeSignedIn("false");
              storeEmail("");
              AsyncStorage.clear();

              log_out();

              auth
                .signOut()
                .then(() => {})
                .catch((error) => {});
            }}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}> Logout</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisibility(false);
            }}
          >
            <View style={styles.button1}>
              <Text style={styles.buttonText2}> Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={showEULA}
        backdropOpacity={0.2}
        style={styles.EULAModal}
      >
        <View style={styles.EULAView}>
          <WebView
            originWhitelist={["*"]}
            source={{ uri: "https://www.cornellappdev.com/license/resell" }}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
          {loading && ( // Show activity indicator when loading is true
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.resellPurple} />
            </View>
          )}
          <TouchableOpacity
            onPress={() => setShowEULA(false)}
            style={styles.doneButton}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={showPrivacyPolicy}
        backdropOpacity={0.2}
        style={styles.EULAModal}
      >
        <View style={styles.EULAView}>
          <WebView
            originWhitelist={["*"]}
            source={{ uri: "https://www.cornellappdev.com/privacy" }}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
          {loading && ( // Show activity indicator when loading is true
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.resellPurple} />
            </View>
          )}
          <TouchableOpacity
            onPress={() => setShowPrivacyPolicy(false)}
            style={styles.doneButton}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemIcon: {
    marginRight: 20,
  },
  itemText: {
    fontFamily: "Rubik-Regular",
    fontSize: 18,
  },
  itemChevron: {
    marginLeft: "auto",
    marginRight: 0,
  },
  list: {
    top: Platform.OS === "ios" ? menuBarTop + 40 : 50,
  },
  slideUp: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 200,
    backgroundColor: "#ffffff",
    width: "100%",
    marginHorizontal: 0,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  button: {
    width: 230,
    flexDirection: "column",
    alignItems: "center",
    padding: "3%",
    borderRadius: 25,
    backgroundColor: "#d52300",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "Rubik-Regular",
  },
  button1: {
    width: 230,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: "3%",
    borderRadius: 25,
  },
  buttonText2: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "Rubik-Medium",
  },
  doneButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: Colors.resellPurple,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
  },
  doneButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Rubik-Regular",
  },
  EULAModal: {
    top: Platform.OS === "ios" ? menuBarTop : 30,
    margin: 0,
  },
  EULAView: {
    flex: 1,
  },
  loadingContainer: {
    position: "absolute",
    top: Dimensions.get("window").height / 3,
    left: (Dimensions.get("window").width - 100) / 2,
    width: 100,
  },
});
