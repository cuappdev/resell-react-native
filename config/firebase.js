// import firebase from "firebase/app";
import firebase, { getApps, initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoA6LS50__vx9PsHk_olqlM_CInjJnG7o",
  authDomain: "resell-e99a2.firebaseapp.com",
  databaseURL: "https://resell-e99a2-default-rtdb.firebaseio.com",
  projectId: "resell-e99a2",
  storageBucket: "resell-e99a2.appspot.com",
  messagingSenderId: "1534649394",
  appId: "1:1534649394:web:39e74eb15a13233f38082b",
  measurementId: "G-QL0J1HN712",
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
