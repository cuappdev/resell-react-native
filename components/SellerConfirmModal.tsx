import React from "react";
import Modal from "react-native-modal";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import PurpleButton from "./PurpleButton";
import { auth, historyRef } from "../config/firebase";
import { fonts } from "../globalStyle/globalFont";
import moment from "moment";
export default function SellerConfirmModal({
  visible,
  setVisible,
  text,
  startDate,
  setSyncMeetingVisible,
  email,
  setShowNotice,
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
      onModalHide={() => {
        setSyncMeetingVisible(true);
      }}
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
          <Text style={fonts.body1}>{text}</Text>

          <Text
            style={[fonts.pageHeading3, { marginTop: 24, marginBottom: 4 }]}
          >
            Time
          </Text>
          <Text style={fonts.body1}>{dateText}</Text>
        </View>
        <View style={styles.purpleButton}>
          <PurpleButton
            text={"Confirm"}
            onPress={() => {
              historyRef
                .doc(auth?.currentUser?.email)
                .collection("buyers")
                .doc(email)
                .update({
                  proposedViewed: true,
                });
              historyRef
                .doc(email)
                .collection("sellers")
                .doc(auth?.currentUser?.email)
                .update({
                  recentMessage: "Seller Confirmed",
                  recentSender: auth?.currentUser?.email,
                  confirmedTime: startDate,
                  confirmedViewed: false,
                  viewed: false,
                });
              setVisible(false);
              setShowNotice(false);
              setActivateIcon(true);
            }}
            enabled={true}
          />
        </View>
        <Text
          style={[fonts.Title2, { position: "absolute", bottom: "11%" }]}
          onPress={() => {
            setVisible(false);
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
  purpleButton: {
    position: "absolute",
    bottom: "22%",
  },
});
