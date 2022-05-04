import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import BackButton from "../assets/svg-components/back_button";
import { menuBarTop } from "../constants/Layout";
import Logout from "../assets/svg-components/logout";
import Edit from "../assets/svg-components/edit";
import Notifications from "../assets/svg-components/notifications";
import Feedback from "../assets/svg-components/feedback";
import { HeaderIcon } from "../navigation";
import { Feather } from "@expo/vector-icons";
import Modal from "react-native-modal";
import PurpleButton from "../components/PurpleButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetworkLogger from "react-native-network-logger";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: menuBarTop,
    left: 20,
    zIndex: 1,
    width: 20,
    height: 30,
  },
  title: {
    position: "absolute",
    top: menuBarTop,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  titleText: {
    fontFamily: "Roboto-Medium",
    fontSize: 18,
  },
  item: {
    marginTop: 40,
    marginLeft: 48,
    marginRight: 48,
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    marginLeft: 20,
  },
  itemChevron: {
    marginLeft: "auto",
    marginRight: 0,
  },
  list: {
    marginTop: menuBarTop + 30,
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
});

export default function SettingsScreen({ navigation }) {
  //  const logout = () => dispatch(logout());

  const setSignedIn = async () => {
    try {
      await AsyncStorage.setItem("SignedIn", "false");
    } catch (e) {
      console.log(e);
    }
  };
  const [modalVisibility, setModalVisibility] = useState(false);
  const [userId, setUserId] = useState("");

  AsyncStorage.getItem("userId", (errs, result) => {
    if (!errs) {
      if (result !== null) {
        setUserId(result);
      }
    }
  });

  const getUser = async () => {
    try {
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/user/id/" + userId
      );
      if (response.ok) {
        const json = await response.json();
        const user = json.user;
        console.log(user);
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
        <Text style={styles.titleText}>Settings</Text>
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
            icon: Notifications,
            text: "Notificaton Preferences",
            onPress: () => navigation.navigate("NotificationPreferences"),
          },
          {
            icon: Feedback,
            text: "Send Feedback",
            onPress: () => navigation.navigate("SendFeedback"),
          },
          {
            icon: Logout,
            text: "Log Out",
            onPress: () => setModalVisibility(true),
          },
        ]}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={item.onPress ? item.onPress : () => {}}
            style={styles.item}
          >
            <item.icon />
            <Text style={styles.itemText}>{item.text}</Text>
            <Feather
              name="chevron-right"
              size={22}
              color="black"
              style={styles.itemChevron}
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
            onPress={() => {
              setSignedIn();
              //    logout();
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
    </View>
  );
}
