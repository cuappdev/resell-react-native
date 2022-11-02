import React from "react";
import Modal from "react-native-modal";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import PurpleButton from "../components/PurpleButton";
export default function SellerMeetingDetailModal({
  meetingVisible,
  setMeetingVisible,
  text,
  dateText,
  setSyncMeetingVisible,
  isBuyer,
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
      {isBuyer && (
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

      {!isBuyer && (
        <View style={styles.slideUp}>
          <Text style={styles.MeetingDetailsBoldText}>Meeting Details</Text>
          <View style={styles.MeetingDetails}>
            <Text style={styles.SubMeetingDetails}>
              you are proposing the following meeting:
            </Text>

            <Text style={styles.MeetingDetailsBoldText}>Time</Text>
            <Text style={styles.SubMeetingDetails}>{dateText}</Text>
          </View>
          <View style={styles.purpleButton}>
            <PurpleButton
              text={"Propose Meeting"}
              onPress={() => {
                setMeetingVisible(false);
                // setSyncMeetingVisible(true);
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
