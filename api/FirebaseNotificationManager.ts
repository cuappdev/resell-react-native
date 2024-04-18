import messaging from "@react-native-firebase/messaging";
import { userRef } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { auth } from "../config/firebase";

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  saveNotificationSettings(auth.currentUser.email, enabled);
  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
}

export async function getDeviceFCMToken() {
  const token = await messaging().getToken();
  return token;
}

export async function saveDeviceTokenToFireStore(userEmail, deviceToken) {
  try {
    const ref = doc(userRef, userEmail);
    updateDoc(ref, {
      fcmToken: deviceToken,
    });
    console.log("Device token saved successfully");
  } catch (error) {
    console.error("Error saving device token:", error);
  }
}

export async function saveNotificationSettings(
  userEmail,
  notificationsEnabled
) {
  try {
    const ref = doc(userRef, userEmail);
    updateDoc(ref, {
      notificationsEnabled: notificationsEnabled,
    });
    console.log("Notifications Settings saved successfully");
  } catch (error) {
    console.error("Error saving device token:", error);
  }
}

export async function sendNotification(
  recipientToken,
  title,
  body,
  nav,
  chat,
  notificationsEnabled
) {
  const message = {
    to: recipientToken,
    notification: notificationsEnabled ? { body: body, title: title } : null,
    data: {
      navigationId: nav,
      chat: chat,
    },
  };

  try {
    const response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "key=AAAAAFt45DI:APA91bEK63cgXhAPZQ3KpC92q6RjrNOehM2H8zFqytJDuthFEvIBPaEaKfvNplZP90q74WdPcGhoeEo4iFOCks9DIpD9nyLoQpGe4pu6p3_BQGiYSvIx_YxrmLElgPgmv4Hz1P0LFQVO",
      },
      body: JSON.stringify(message),
    });
    const json = await response.json();
  } catch (error) {
    console.error(error);
  }
}
