import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { auth, chatRef, historyRef } from "../../config/firebase";
import Colors from "../../constants/Colors";
import {
  MEETING_CANCELED,
  MEETING_CONFIRMED,
  MEETING_DECLINED,
} from "../../data/struct";
import { fonts } from "../../globalStyle/globalFont";
import { makeToast } from "../../utils/Toast";
import OutlinedButton from "../OutlinedButton";
import PurpleButton from "../PurpleButton";
/**
 * Modal that allows the user to edit a proposal that they have made
 */
export default function EditMeetingModal({
  visible,
  setVisible,
  text,
  startDate,
  setSyncMeetingVisible,
  email: otherEmail,
  proposer,
  editAvailability,
  isBuyer,
  isConfirmed,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  startDate: string;
  setSyncMeetingVisible: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  proposer: string;
  editAvailability: () => void;
  /**
   * Whether the current user is the buyer
   */
  isBuyer: boolean;
  isConfirmed: boolean;
}) {
  const momentDate = moment(startDate, "MMMM Do YYYY, h:mm a");
  const startText = moment(momentDate).format("dddd, MMMM Do · h:mm");
  const endDate = moment(momentDate).add(30, "m").format("h:mm a");
  const dateText = startText + "-" + endDate;
  const [showSyncCalendar, setShowSyncCalendar] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);

  const buyerEmail = isBuyer ? auth.currentUser.email : otherEmail;
  const sellerEmail = isBuyer ? otherEmail : auth.currentUser.email;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [declineLoading, setDeclineLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const onConfirmPress = async () => {
    setConfirmLoading(true);
    try {
      // update sellers and buyers history docs:
      const sellerDoc = doc(
        collection(doc(historyRef, sellerEmail), "buyers"),
        buyerEmail
      );
      updateDoc(sellerDoc, {
        confirmedTime: startDate,
        recentMessage: "Confirmed",
        recentSender: auth?.currentUser?.email,
        recentMessageTime: new Date().toISOString(),
        viewed: auth.currentUser.email === sellerEmail,
      });

      const buyerDoc = doc(
        collection(doc(historyRef, buyerEmail), "sellers"),
        sellerEmail
      );
      await updateDoc(buyerDoc, {
        recentMessage: "Confirmed",
        recentSender: auth?.currentUser?.email,
        confirmedTime: startDate,
        confirmedViewed: false,
        viewed: auth.currentUser.email === buyerEmail,
        recentMessageTime: new Date().toISOString(),
        proposedTime: "",
      });

      // update state of chat message
      // if the user just confirmed the meeting then that means they did not propose it
      // so email references the email of the proposer
      // chats are stored by buyer emails
      // doc(doc(chatRef, buyerEmail), sellerEmail);
      const chatCollection = collection(doc(chatRef, buyerEmail), sellerEmail);
      // the message that the user is confirming
      const messageRef = doc(chatCollection, `proposer_${otherEmail}`);
      // if there's another proposal we should delete if since this was confirmed
      // this document may or may not exist
      const otherProposalRef = doc(
        chatCollection,
        `proposer_${auth.currentUser.email}`
      );
      // don't need to check if doc exists because we want an error to happen if it doesn't
      // this error will be caught and show the user the meeting confirmation failed
      await updateDoc(messageRef, {
        "meetingInfo.state": MEETING_CONFIRMED,
      });
      await deleteDoc(otherProposalRef);
      setVisible(false);
      setShowSyncCalendar(true);
      makeToast({
        message: "Meeting time confirmed.",
      });
    } catch (error) {
      makeToast({
        message: "Error confirming meeting time",
        type: "ERROR",
      });
    } finally {
      setConfirmLoading(false);
      setVisible(false);
    }
  };

  const onDeclinePress = async () => {
    setDeclineLoading(true);
    try {
      // update sellers and buyers history docs:
      const sellerDoc = doc(
        collection(doc(historyRef, sellerEmail), "buyers"),
        buyerEmail
      );
      const commonData = {
        recentMessage: "Declined",
        recentSender: auth.currentUser.email,
        recentMessageTime: new Date().toISOString(),
      };
      await updateDoc(sellerDoc, {
        ...commonData,
        viewed: auth.currentUser.email === sellerEmail,
      });

      const buyerDoc = doc(
        collection(doc(historyRef, buyerEmail), "sellers"),
        sellerEmail
      );
      await updateDoc(buyerDoc, {
        ...commonData,
        viewed: auth.currentUser.email === buyerEmail,
      });

      // update state of chat message
      // if the user just confirmed the meeting then that means they did not propose it
      // so email references the email of the proposer
      // chats are stored by buyer emails
      const chatCollection = collection(doc(chatRef, buyerEmail), sellerEmail);
      // the message that the user is confirming
      const messageRef = doc(chatCollection, `proposer_${otherEmail}`);

      await updateDoc(messageRef, {
        "meetingInfo.state": MEETING_DECLINED,
      });
    } catch (_) {
      makeToast({
        message: "Error declining meeting",
        type: "ERROR",
      });
    } finally {
      setDeclineLoading(false);
      setVisible(false);
    }
  };

  const onCancelMeetingPress = async () => {
    setCancelLoading(true);
    try {
      //#region update sellers and buyers history docs:
      const sellerDoc = doc(
        collection(doc(historyRef, sellerEmail), "buyers"),
        buyerEmail
      );
      const commonData = {
        recentMessage: "Canceled",
        recentSender: auth.currentUser.email,
        recentMessageTime: new Date().toISOString(),
      };
      await updateDoc(sellerDoc, {
        ...commonData,
        viewed: auth.currentUser.email === sellerEmail,
      });

      const buyerDoc = doc(
        collection(doc(historyRef, buyerEmail), "sellers"),
        sellerEmail
      );
      await updateDoc(buyerDoc, {
        ...commonData,
        viewed: auth.currentUser.email === buyerEmail,
      });
      //#endregion

      //#region update chat message
      const chatCollection = collection(doc(chatRef, buyerEmail), sellerEmail);
      // the message that the user is confirming
      const messageRef = doc(chatCollection, `proposer_${proposer}`);

      await updateDoc(messageRef, {
        "meetingInfo.state": MEETING_CANCELED,
        "meetingInfo.canceler": auth.currentUser.email,
      });
      setShowSyncCalendar(false);
    } catch (_) {
      makeToast({ message: "Error canceling meeting", type: "ERROR" });
    } finally {
      setCancelLoading(false);
      setVisible(false);
    }
  };
  return (
    <Modal //Confirm Meeting details
      isVisible={visible}
      backdropOpacity={0.2}
      onModalHide={() => {
        if (showSyncCalendar && !isConfirmed) {
          setSyncMeetingVisible(true);
        }
        if (showAvailability) {
          editAvailability();
          setShowAvailability(false);
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
        {/* Time text */}
        <View style={{ marginTop: 24 }}>
          <Text style={fonts.body1}>{text}</Text>
          <Text
            style={[fonts.pageHeading3, { marginTop: 24, marginBottom: 4 }]}
          >
            Time
          </Text>
          <Text style={fonts.body1}>{dateText}</Text>
        </View>

        {/* Cancelable view */}
        {isConfirmed && (
          <View style={styles.buttonAndCancelContainer}>
            <PurpleButton
              style={{ backgroundColor: Colors.errorState }}
              text="Cancel Meeting"
              onPress={onCancelMeetingPress}
              isLoading={cancelLoading}
            />
            <View style={{ height: 24 }} />
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}
            >
              <Text style={[fonts.Title1, { color: Colors.secondaryGray }]}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {!isConfirmed && proposer !== auth.currentUser.email ? (
          // Confirm view
          <View style={styles.buttonContainer}>
            <PurpleButton
              text={"Confirm"}
              onPress={onConfirmPress}
              isLoading={confirmLoading}
              enabled={!confirmLoading && !declineLoading}
            />
            <View style={{ height: 12 }} />
            <OutlinedButton
              text="Decline"
              onPress={onDeclinePress}
              isLoading={declineLoading}
              enabled={!confirmLoading && !declineLoading}
            />
          </View>
        ) : (
          !isConfirmed && (
            // Editable view
            <View style={styles.buttonAndCancelContainer}>
              <PurpleButton
                text="Edit Proposal"
                enabled
                onPress={() => {
                  setVisible(false);
                  setShowAvailability(true);
                }}
              />
              <View style={{ height: 24 }} />
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                }}
              >
                <Text style={[fonts.Title1, { color: Colors.secondaryGray }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          )
        )}
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
    position: "absolute",
    bottom: "14%",
  },
  buttonAndCancelContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 48,
  },
});
