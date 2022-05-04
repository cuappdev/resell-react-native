import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDoA6LS50__vx9PsHk_olqlM_CInjJnG7o",
  authDomain: "resell-e99a2.firebaseapp.com",
  databaseURL: "https://resell-e99a2-default-rtdb.firebaseio.com",
  projectId: "resell-e99a2",
  storageBucket: "resell-e99a2.appspot.com",
  messagingSenderId: "1534649394",
  appId: "1:1534649394:web:a95f1aec87d22f9d38082b",
  measurementId: "G-0FZ6ZEMC8E",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
export const provider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
// export const firestore = firebase.firestore().ref();
export const auth = firebase.auth();
export default firebase;
