// import firebase from "firebase/app";
import * as firebase from "firebase";

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
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app(); // if already initialized, use that one
}

export const db = app.firestore();
export const chatRef = db.collection("chats");
export const historyRef = db.collection("history");
export const userRef = db.collection("user");
export const requestRef = db.collection("requests");
export const auth = firebase.auth();
