import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import PurpleButton from "./PurpleButton";

import { auth, historyRef } from "../config/firebase";
import moment from "moment";
import { fonts } from "../globalStyle/globalFont";
export default function meetingDetailModal({
  visible,
  setVisible,
  startDate,
  sellerEmail,
  name,
  post,
  isBuyer,
  setActivateIcon,
}) {
  const momentDate = moment(startDate, "MMMM Do YYYY, h:mm a");
  const startText = moment(momentDate).format("dddd, MMMM Do · h:mm");
  const endDate = moment(momentDate).add(30, "m").format("h:mm a");
  const dateText = startText + "-" + endDate;
  return (
    <Modal //Confirm Meeting details
      isVisible={visible}
      backdropOpacity={0.2}
      onBackdropPress={() => {
        setVisible(false);
      }}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View style={styles.slideUp}>
        <Text style={[fonts.pageHeading3, { marginTop: "14%" }]}>
          Meeting Details
        </Text>
        <View style={{ marginTop: 24 }}>
          <Text style={fonts.body1}>
            {"Meeting with " +
              name +
              " for " +
              post.title +
              " is confirmed for"}
          </Text>

          <Text
            style={[fonts.pageHeading3, { marginTop: 24, marginBottom: 4 }]}
          >
            Time
          </Text>
          <Text style={fonts.body1}>{dateText}</Text>
        </View>

        <TouchableOpacity
          style={{ position: "absolute", bottom: "11%" }}
          onPress={async () => {
            await historyRef
              .doc(isBuyer ? sellerEmail : auth?.currentUser?.email)
              .collection("buyers")
              .doc(isBuyer ? auth?.currentUser?.email : sellerEmail)
              .update({
                proposedTime: "",
                proposedViewed: false,
              });
            await historyRef
              .doc(isBuyer ? auth?.currentUser?.email : sellerEmail)
              .collection("sellers")
              .doc(isBuyer ? sellerEmail : auth?.currentUser?.email)
              .update({
                confirmedTime: "",
                confirmedViewed: false,
              });

            setVisible(false);
            setActivateIcon(false);
          }}
        >
          <View style={styles.button}>
            <Text
              style={[{ color: "white", textAlign: "center" }, fonts.Title2]}
            >
              Cancel Meeting
            </Text>
          </View>
        </TouchableOpacity>
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
  button: {
    width: 230,
    flexDirection: "column",
    alignItems: "center",
    padding: "3%",
    borderRadius: 25,
    backgroundColor: "#d52300",
    minHeight: 45,
    justifyContent: "center",
  },
});
