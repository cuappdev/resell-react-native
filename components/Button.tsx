import { getDoc } from "@react-native-firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { userRef } from "../config/firebase";

/**
 *
 * @param {state} count - state passed in representing which button is getting clicked, should be less than equal to len(data) -1
 * @param {setState} setCount - setState method passed in to change the current count when new button get clicked
 * @param {int} id - presented current button id, starting from 0, comparing with count to determine whether is clicked
 * @param {string} title - content on the button
 * @returns a button with linear gradient outline, the "All" button will always be initially marked as clicked
 */
function Button(props) {
  const [clicked, setClicked] = useState(props.count === "0");
  useEffect(() => {
    setClicked(props.count === props.id);
  }, [props.count]);
  const onPress = async () => {
    props.setCount(props.id);
    if (props.title == "Negotiate") {
      props.setModalVisible(!props.modalVisible);
    }
    if (props.title == "Send Availablity") {
      props.setAvailabilityVisible(true);
      props.setIsBubble(false);
    }
    if (props.title == "Pay with Venmo") {
      try {
        const myUserRef = userRef.doc(props.otherEmail);
        const myUserDoc = await getDoc(myUserRef);
        var venmo = "";
        if (myUserDoc.exists) {
          venmo = myUserDoc.data().venmo;
        }
        if (venmo !== "") {
          Linking.openURL("https://account.venmo.com/u/" + venmo);
        } else {
          Alert.alert(
            "Warning",
            "The user has not set up venmo yet, please contact the user directly."
          );
        }
      } catch (e) {
        console.error(`Error in Button: ${e}`);
      }
    }
    if (props.title.includes("View")) {
      props.openMostRecentAvailability();
    }
  };

  return clicked || props.alwaysColor ? (
    <LinearGradient
      colors={["#DF9856", "#DE6CD3", "#AD68E3"]}
      style={styles.highLight}
      start={{ x: 0.9, y: 0 }}
      end={{ x: 0.1, y: 1 }}
    >
      <TouchableOpacity style={styles.appButtonContainer} onPress={onPress}>
        <Text style={styles.appButtonText}>{props.title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  ) : (
    <TouchableOpacity style={styles.appUnclickedContainer} onPress={onPress}>
      <Text style={styles.appUnclickText}>{props.title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  appButtonContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 100,
    paddingVertical: 11,
    paddingHorizontal: 11,
    marginVertical: 2,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    minWidth: 60,
  },
  appUnclickedContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 11,
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    minWidth: 60,
  },
  appUnclickText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 18,
    color: "#4D4D4D",
    alignSelf: "center",
    marginTop: 3,
  },
  appButtonText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 18,
    color: "#4D4D4D",
    alignSelf: "center",
  },
  highLight: {
    borderRadius: 23,
    marginVertical: 5,
    marginHorizontal: 5,
  },
});
export default Button;
