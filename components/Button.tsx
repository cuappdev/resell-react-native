import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
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
      console.log("here", props.otherEmail);

      const myUserRef = await userRef.doc(props.OthersEmail);
      const doc = await myUserRef.get();
      var venmo = "";
      if (doc.exists) {
        console.log("ww", doc.data());
        venmo = doc.data().venmo;
      }
      if (venmo !== "") {
        Linking.openURL("https://account.venmo.com/u/" + venmo);
      } else {
        Alert.alert(
          "Warning",
          "The user has not set up venmo yet, please contact the user directly."
        );
      }
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
    elevation: 8,
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
    elevation: 8,
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
