import React from "react";
import Modal from "react-native-modal";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import PurpleButton from "./PurpleButton";
import { auth, historyRef } from "../config/firebase";
export default function MeetingDetailModal({
  meetingVisible,
  setMeetingVisible,
  text,
  dateText,
  setSyncMeetingVisible,
  isBuyer,
  email,
  isProposed,
}) {
  return (
    <Modal //Confirm Meeting details
      isVisible={meetingVisible}
      backdropOpacity={0.2}
      onBackdropPress={() => {
        setMeetingVisible(false);
      }}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      {!isBuyer && (
        <View style={styles.slideUp}>
          <Text style={styles.MeetingDetailsBoldText}>Meeting Details</Text>
          <View style={styles.MeetingDetails}>
            <Text style={styles.SubMeetingDetails}>{text}</Text>

            <Text style={styles.MeetingDetailsBoldText}>Time</Text>
            <Text style={styles.SubMeetingDetails}>{dateText}</Text>
          </View>
          <View style={styles.purpleButton}>
            <PurpleButton
              text={"Confirm"}
              onPress={() => {
                setMeetingVisible(false);
                setSyncMeetingVisible(true);
                historyRef
                  .doc(isBuyer ? auth?.currentUser?.email : email)
                  .collection("sellers")
                  .doc(isBuyer ? email : auth?.currentUser?.email)
                  .update({
                    isConfirmed: true,
                  });
              }}
              enabled={true}
            />
          </View>
          <Text
            style={styles.MeetingDetailsBoldText}
            onPress={() => {
              setMeetingVisible(false);
            }}
          >
            Cancel
          </Text>
        </View>
      )}

      {isBuyer && (
        <View style={styles.slideUp}>
          <Text style={styles.MeetingDetailsBoldText}>Meeting Details</Text>
          <View style={styles.MeetingDetails}>
            <Text style={styles.SubMeetingDetails}>
              You are proposing the following meeting:
            </Text>

            <Text style={styles.MeetingDetailsBoldText}>Time</Text>
            <Text style={styles.SubMeetingDetails}>{dateText}</Text>
          </View>
          <View style={styles.purpleButton}>
            {!isProposed && (
              <PurpleButton
                text={"Propose Meeting"}
                onPress={() => {
                  setMeetingVisible(false);
                  // setSyncMeetingVisible(true);

                  historyRef
                    .doc(isBuyer ? email : auth?.currentUser?.email)
                    .collection("buyers")
                    .doc(isBuyer ? auth?.currentUser?.email : email)
                    .update({
                      isProposed: true,
                    });
                }}
                enabled={true}
              />
            )}
            {isProposed && (
              <Text style={styles.MeetingDetailsBoldText}>
                Waiting on Seller to Confirm
              </Text>
            )}
          </View>
          {!isProposed && (
            <Text
              style={styles.MeetingDetailsBoldText}
              onPress={() => {
                setMeetingVisible(false);
                historyRef
                  .doc(isBuyer ? email : auth?.currentUser?.email)
                  .collection("buyers")
                  .doc(isBuyer ? auth?.currentUser?.email : email)
                  .update({
                    isProposed: false,
                    isConfirmed: false,
                  });

                historyRef
                  .doc(isBuyer ? auth?.currentUser?.email : email)
                  .collection("sellers")
                  .doc(isBuyer ? email : auth?.currentUser?.email)
                  .update({
                    isConfirmed: false,
                    isProposed: false,
                  });
              }}
            >
              Reject Proposal
            </Text>
          )}
        </View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  slideUp: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 320,
    backgroundColor: "#ffffff",
    width: "100%",
    marginHorizontal: 0,
    alignItems: "center",
    padding: 30,
    paddingLeft: 50,
    paddingRight: 50,
  },
  purpleButton: {
    marginBottom: 18,
  },
  MeetingDetailsBoldText: {
    fontFamily: "Rubik-Medium",
    fontSize: 17,
  },

  SubMeetingDetails: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    marginBottom: 16,
  },
  MeetingDetails: {
    flex: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 20,
  },
});
