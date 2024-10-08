import { setDoc, updateDoc } from "@react-native-firebase/firestore";
import moment from "moment";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { auth, chatRef, historyRef } from "../../config/firebase";
import Colors from "../../constants/Colors";
import { MeetingInfo } from "../../data/struct";
import { fonts } from "../../globalStyle/globalFont";
import { makeToast } from "../../utils/Toast";
import PurpleButton from "../PurpleButton";
export default function MeetingProposeModal({
  visible,
  setVisible,
  setAvailabilityVisible,
  startDate,
  sellerEmail,
  buyerEmail,
  post,
  setStartDate,
  hasProposed,
  originalTime,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setAvailabilityVisible: React.Dispatch<React.SetStateAction<boolean>>;
  startDate: string;
  sellerEmail: string;
  buyerEmail: string;
  post: any;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  /**
   * Whether the user has proposed a meeting prior to this proposition
   */
  hasProposed: boolean;
  /**
   * Time of user's previous proposition
   */
  originalTime: string;
}) {
  const momentDate = moment(startDate, "MMMM Do YYYY, h:mm a");
  const startText = moment(momentDate).format("dddd, MMMM Do · h:mm");
  const endDate = moment(momentDate).add(30, "m").format("h:mm a");
  const dateText = startText + "-" + endDate;

  const [shouldOpenAvailability, setShouldOpenAvailability] = useState(false);

  const [proposeLoading, setProposeLoading] = useState(false);

  const onMeetingPropose = async () => {
    setProposeLoading(true);
    // update the interaction history to include the time proposal
    // This stores the history of the seller's interactions with their buyers
    const sellersInteractionHistory = historyRef
      .doc(sellerEmail)
      .collection("buyers")
      .doc(buyerEmail);
    // this stores the history of the buyers interactions with thier sellers
    const buyersInteractionHistory = historyRef
      .doc(buyerEmail)
      .collection("sellers")
      .doc(sellerEmail);
    // we also wish to update this data for the sellers
    const updateData = {
      recentMessage: "Proposed a Time",
      recentSender: auth.currentUser.email,
      proposedTime: startDate,
      proposer: auth.currentUser.email,
      proposedViewed: false,
    };

    // we also need to send the special meeting message in chat
    const meetingData: MeetingInfo = {
      proposer: auth.currentUser.email,
      proposeTime: startDate,
      state: "proposed",
    };
    // send the message as a chat message
    const messageRef = chatRef
      .doc(buyerEmail)
      .collection(sellerEmail)
      .doc(`proposer_${auth.currentUser.email}`);

    setDoc(messageRef, {
      text: `Proposed a Time`,
      createdAt: new Date(),
      meetingInfo: meetingData,
      _id: Math.random().toString(), // TODO eventually replace with better way to generate IDs
      user: {
        _id: auth.currentUser.email,
        avatar: auth.currentUser.photoURL,
        name: auth.currentUser.displayName,
      },
    });

    try {
      await updateDoc(sellersInteractionHistory, {
        ...updateData,
        viewed: auth.currentUser.email === sellerEmail,
      });
      await updateDoc(buyersInteractionHistory, {
        ...updateData,
        viewed: auth.currentUser.email === buyerEmail,
      });
      setProposeLoading(false);
    } catch (_) {
      setProposeLoading(false);
      makeToast({
        message: "Failed to propose meeting",
        type: "ERROR",
      });
    }
    setShouldOpenAvailability(false);
    setProposeLoading(false);
    setVisible(false);
  };
  return (
    <Modal //Confirm Meeting details
      isVisible={visible}
      backdropOpacity={0.2}
      onBackdropPress={() => {
        setVisible(false);
        setStartDate(null);
        setShouldOpenAvailability(true);
      }}
      style={{ justifyContent: "flex-end", margin: 0 }}
      onModalHide={() => {
        if (shouldOpenAvailability) {
          setAvailabilityVisible(true);
        }
      }}
    >
      <View style={styles.slideUp}>
        <Text style={[fonts.pageHeading3, { marginTop: "14%" }]}>
          {hasProposed ? "New Proposal" : "Meeting Details"}
        </Text>
        <View style={{ marginTop: 24 }}>
          <Text style={fonts.body1}>
            {hasProposed
              ? `This proposal replaces your previous one scheduled for ${originalTime}. Are you sure you want to reschedule?`
              : "You are proposing the following meeting:"}
          </Text>

          {!hasProposed && (
            <>
              <Text
                style={[fonts.pageHeading3, { marginTop: 24, marginBottom: 4 }]}
              >
                Time
              </Text>
              <Text style={fonts.body1}>{dateText}</Text>
            </>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <PurpleButton
            isLoading={proposeLoading}
            text={hasProposed ? "Reschedule" : "Propose Meeting"}
            onPress={onMeetingPropose}
            enabled={true}
          />
          <Text
            style={[fonts.Title2, { color: Colors.secondaryGray }]}
            onPress={() => {
              setStartDate(null);
              setShouldOpenAvailability(true);
              setVisible(false);
            }}
          >
            Cancel
          </Text>
        </View>
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
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
    marginVertical: 48,
  },
});
