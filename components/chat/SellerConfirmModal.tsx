import { collection, doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { auth, historyRef } from "../../config/firebase";
import { fonts } from "../../globalStyle/globalFont";
import { makeToast } from "../../utils/Toast";
import PurpleButton from "../PurpleButton";
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
  const [isLoading, setIsLoading] = useState(false);
  const [showSyncCalendar, setShowSyncCalendar] = useState(false);

  return (
    <Modal //Confirm Meeting details
      isVisible={visible}
      backdropOpacity={0.2}
      onModalHide={() => {
        if (showSyncCalendar) {
          setSyncMeetingVisible(true);
        }
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
            onPress={async () => {
              setIsLoading(true);
              try {
                // update sellers and buyers docs:
                const sellerDoc = doc(
                  collection(doc(historyRef, auth.currentUser.email), "buyers"),
                  email
                );
                updateDoc(sellerDoc, {
                  proposedView: true,
                  confirmedTime: startDate,
                  proposedTime: "",
                });

                const buyerDoc = doc(
                  collection(doc(historyRef, email), "sellers"),
                  auth.currentUser.email
                );
                await updateDoc(buyerDoc, {
                  recentMessage: "Seller Confirmed",
                  recentSender: auth?.currentUser?.email,
                  confirmedTime: startDate,
                  confirmedViewed: false,
                  viewed: false,
                  proposedTime: "",
                });
                setVisible(false);
                setShowNotice(false);
                setActivateIcon(true);
                setShowSyncCalendar(true);
                makeToast({
                  message: "Meeting time confirmed.",
                });
              } catch (_) {
                makeToast({
                  message: "Error confirming meeting time",
                  type: "ERROR",
                });
              }
              setIsLoading(false);
            }}
            isLoading={isLoading}
            enabled
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
