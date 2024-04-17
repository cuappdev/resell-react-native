import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Switch,
  Platform,
} from "react-native";
import BackButton from "../assets/svg-components/back_button";
import { menuBarTop } from "../constants/Layout";

import {
  setPauseAllNotifications,
  setChatNotifications,
  setNewListings,
} from "../state_manage/actions/settingsScreenActions";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmail,
  getNotificationSettings,
  getUserId,
  storeNotificationSettings,
} from "../utils/asychStorageFunctions";
import { saveNotificationSettings } from "../api/FirebaseNotificationManager";
import { doc, getDoc } from "firebase/firestore";
import { userRef } from "../config/firebase";
import { useApiClient } from "../api/ApiClientProvider";

export default function NotificationPreferencesScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const dispatch = useDispatch();

  const apiClient = useApiClient();

  const getEmail = async () => {
    try {
      const response = await apiClient.get(`/user/id/${userId}`);
      if (response.user) {
        const user = response.user;
        setUserEmail(user.email);
        const docRef = doc(userRef, userEmail);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setNotificationsEnabled(docSnap.data().notificationsEnabled);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setIsAllNotificationsPaused = async (
    pauseAllNotifications: boolean
  ) => {
    dispatch(setPauseAllNotifications(pauseAllNotifications));
    setNotificationsEnabled(JSON.stringify(pauseAllNotifications));
    await storeNotificationSettings(JSON.stringify(pauseAllNotifications));
    saveNotificationSettings(userEmail, pauseAllNotifications);
  };

  const setIsChatNotificationsOn = async (chatNotifications: boolean) => {
    dispatch(setChatNotifications(chatNotifications));
    setNotificationsEnabled(JSON.stringify(chatNotifications));
    await storeNotificationSettings(JSON.stringify(chatNotifications));
    saveNotificationSettings(userEmail, chatNotifications);
  };

  const setIsNewListingsOn = (newListings: boolean) =>
    dispatch(setNewListings(newListings));

  const isAllNotificationsPaused = useSelector((state: any) => {
    return state.settings.pauseAllNotifications;
  });

  const isChatNotificationsOn = useSelector((state: any) => {
    return state.settings.chatNotifications;
  });

  const isNewListingsOn = useSelector((state: any) => {
    return state.settings.newListings;
  });

  // Fetch user ID first
  useEffect(() => {
    getUserId(setUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      getEmail();
    }
  }, [userId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <BackButton color="black" />
      </TouchableOpacity>
      <View style={styles.title}>
        <Text style={styles.titleText}>Notification Preferences</Text>
      </View>
      <FlatList
        scrollEnabled={false}
        style={styles.list}
        data={[
          {
            text: "Pause All Notifications",
            state: isAllNotificationsPaused,
            action: (value) => setIsAllNotificationsPaused(value),
          },
          {
            text: "Chat Notifications",
            state: notificationsEnabled,
            action: (value) => setIsChatNotificationsOn(value),
          },
          {
            text: "New Listings",
            state: isNewListingsOn,
            action: (value) => setIsNewListingsOn(value),
          },
        ]}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {}} style={styles.item}>
            <Text style={styles.itemText}>{item.text}</Text>
            <Switch
              trackColor={{ false: "#FFFFFF", true: "#9E70F6" }}
              thumbColor={item.state ? "#FFFFFF" : "#BEBEBE"}
              ios_backgroundColor="#FFFFFF"
              onValueChange={(value) => {
                item.action(value);
                return;
              }}
              value={item.state}
              style={styles.itemSwitch}
            />
          </TouchableOpacity>
        )}
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
  },
  itemText: {
    fontFamily: "Rubik-Regular",
    fontSize: 18,
    marginLeft: 0,
  },
  itemSwitch: {
    marginLeft: "auto",
    marginRight: 0,
  },
  list: {
    marginTop: Platform.OS === "ios" ? menuBarTop + 30 : 50,
  },
});
