import { collection, doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { auth, chatRef, historyRef } from "../../config/firebase";
import { fonts } from "../../globalStyle/globalFont";
import { makeToast } from "../../utils/Toast";
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
}) {
  const momentDate = moment(startDate, "MMMM Do YYYY, h:mm a");
  const startText = moment(momentDate).format("dddd, MMMM Do · h:mm");
  const endDate = moment(momentDate).add(30, "m").format("h:mm a");
  const dateText = startText + "-" + endDate;
  const [isLoading, setIsLoading] = useState(false);
  const [showSyncCalendar, setShowSyncCalendar] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);

  const buyerEmail = isBuyer ? auth.currentUser.email : otherEmail;
  const sellerEmail = isBuyer ? otherEmail : auth.currentUser.email;
  return (
    <Modal //Confirm Meeting details
      isVisible={visible}
      backdropOpacity={0.2}
      onModalHide={() => {
        if (showSyncCalendar) {
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
        <View style={{ marginTop: 24 }}>
          <Text style={fonts.body1}>{text}</Text>

          <Text
            style={[fonts.pageHeading3, { marginTop: 24, marginBottom: 4 }]}
          >
            Time
          </Text>
          <Text style={fonts.body1}>{dateText}</Text>
        </View>
        {proposer !== auth.currentUser.email ? (
          <View style={styles.purpleButton}>
            <PurpleButton
              text={"Confirm"}
              onPress={async () => {
                setIsLoading(true);
                try {
                  // update sellers and buyers history docs:
                  const sellerDoc = doc(
                    collection(doc(historyRef, sellerEmail), "buyers"),
                    buyerEmail
                  );
                  updateDoc(sellerDoc, {
                    proposedView: true,
                    confirmedTime: startDate,
                    proposedTime: "",
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
                    viewed: false,
                    proposedTime: "",
                  });

                  // update state of chat message
                  // if the user just confirmed the meeting then that means they did not propose it
                  // so email references the email of the proposer
                  // chats are stored by buyer emails
                  // doc(doc(chatRef, buyerEmail), sellerEmail);
                  const messageRef = doc(
                    collection(doc(chatRef, buyerEmail), sellerEmail),
                    `proposer_${otherEmail}`
                  );
                  // don't need to check if doc exists because we want an error to happen if it doesn't
                  // this error will be caught and show the user the meeting confirmation failed
                  updateDoc(messageRef, {
                    "meetingInfo.isConfirmed": true,
                  });

                  setVisible(false);
                  setShowSyncCalendar(true);
                  makeToast({
                    message: "Meeting time confirmed.",
                  });
                } catch (error) {
                  console.log(`error: ${error}`);
                  console.log(`error json: ${JSON.stringify(error)}`);
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
        ) : (
          <View style={styles.purpleButton}>
            <PurpleButton
              text="Edit Proposal"
              enabled
              onPress={() => {
                setVisible(false);
                setShowAvailability(true);
              }}
            />
          </View>
        )}

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
