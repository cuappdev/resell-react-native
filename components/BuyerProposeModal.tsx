import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
} from "react-native";
import PurpleButton from "./PurpleButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Calendar from "expo-calendar";
import { auth, historyRef } from "../config/firebase";
import moment from "moment";
import { fonts } from "../globalStyle/globalFont";
import { makeToast } from "../utils/Toast";
export default function BuyerProposeModal({
  visible,
  setVisible,
  setAvailabilityVisible,
  startDate,
  sellerEmail,
  post,
  setStartDate,
}) {
  const momentDate = moment(startDate, "MMMM Do YYYY, h:mm a");
  const startText = moment(momentDate).format("dddd, MMMM Do · h:mm");
  const endDate = moment(momentDate).add(30, "m").format("h:mm a");
  const dateText = startText + "-" + endDate;
  console.log(visible);
  return (
    <Modal //Confirm Meeting details
      isVisible={visible}
      backdropOpacity={0.2}
      onBackdropPress={() => {
        setVisible(false);
        setStartDate(null);
        setAvailabilityVisible(true);
      }}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View style={styles.slideUp}>
        <Text style={[fonts.pageHeading3, { marginTop: "14%" }]}>
          Meeting Details
        </Text>
        <View style={{ marginTop: 24 }}>
          <Text style={fonts.body1}>
            You are proposing the following meeting:
          </Text>

          <Text
            style={[fonts.pageHeading3, { marginTop: 24, marginBottom: 4 }]}
          >
            Time
          </Text>
          <Text style={fonts.body1}>{dateText}</Text>
        </View>
        <View style={{ position: "absolute", bottom: "22%" }}>
          <PurpleButton
            text={"Propose Meeting"}
            onPress={async () => {
              const myHistoryRef = await historyRef
                .doc(sellerEmail)
                .collection("buyers")
                .doc(auth?.currentUser?.email);
              const doc = await myHistoryRef.get();

              if (doc.exists) {
                myHistoryRef.update({
                  recentMessage: "Proposed a Time",
                  recentSender: auth?.currentUser?.email,
                  proposedTime: startDate,
                  proposedViewed: false,
                  viewed: false,
                });
              } else {
                historyRef
                  .doc(sellerEmail)
                  .collection("buyers")
                  .doc(auth?.currentUser?.email)
                  .set({
                    item: post,
                    recentMessage: "Proposed a Time",
                    recentSender: auth?.currentUser?.email,
                    name: auth?.currentUser?.displayName,
                    image: auth?.currentUser?.photoURL,
                    viewed: false,
                    proposedTime: startDate,
                    proposedViewed: false,
                  });
              }
              setStartDate("");
              setVisible(false);
              makeToast("Time proposed");
            }}
            enabled={true}
          />
        </View>
        <Text
          style={[fonts.Title2, { position: "absolute", bottom: "11%" }]}
          onPress={() => {
            setVisible(false);
            setStartDate(null);
            setAvailabilityVisible(true);
          }}
        >
          Cancel
        </Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  slideUp: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 400,
    backgroundColor: "#ffffff",
    width: "100%",
    marginHorizontal: 0,
    alignItems: "center",
    paddingLeft: "14%",
    paddingRight: "14%",
  },
});
