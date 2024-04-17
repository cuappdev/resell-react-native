// import firebase from "firebase/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import firebase, { getApps, initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = firebase.getApp(); // if already initialized, use that one
}

export let db;
if (process.env.DATABASE_ID !== "resell-prod") {
  // Dev
  db = getFirestore(app);
} else {
  db = getFirestore(app, process.env.DATABASE_ID);
}
export const fcmRef = collection(db, "fcmTokens");
export const chatRef = collection(db, "chats");
export const historyRef = collection(db, "history");
export const userRef = collection(db, "user");
export const requestRef = collection(db, "requests");
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
