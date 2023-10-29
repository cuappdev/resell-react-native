// import firebase from "firebase/app";
import firebase, { getApps, initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO use environment variables
export const firebaseConfig = {
  apiKey: "TODO",
  authDomain: "TODO",
  databaseURL: "TODO",
  projectId: "TODO",
  storageBucket: "TODO",
  messagingSenderId: "TODO",
  appId: "TODO",
  measurementId: "TODO",
};
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = firebase.getApp(); // if already initialized, use that one
}

export const db = getFirestore(app);
export const chatRef = collection(db, "chats");
export const historyRef = collection(db, "history");
export const userRef = collection(db, "user");
export const requestRef = collection(db, "requests");
export const auth = getAuth(app);
