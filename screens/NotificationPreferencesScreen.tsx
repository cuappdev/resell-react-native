import React, { useState } from "react";
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
import { auth } from "../config/firebase";
import {
  setPauseAllNotifications,
  setChatNotifications,
  setNewListings,
} from "../state_manage/actions/settingsScreenActions";
import { useDispatch, useSelector } from "react-redux";
import { saveNotificationSettings } from "../api/FirebaseNotificationManager";

export default function NotificationPreferencesScreen({ navigation }) {
  const dispatch = useDispatch();

  const setIsAllNotificationsPaused = async (
    pauseAllNotifications: boolean
  ) => {
    dispatch(setPauseAllNotifications(pauseAllNotifications));
    saveNotificationSettings(auth.currentUser.email, !pauseAllNotifications);
  };

  const setIsChatNotificationsOn = async (chatNotifications: boolean) => {
    dispatch(setChatNotifications(chatNotifications));
    saveNotificationSettings(auth.currentUser.email, chatNotifications);
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
            state: isChatNotificationsOn,
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
