import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../config/firebase";
import { MeetingInfo } from "../../data/struct";
import { fonts } from "../../globalStyle/globalFont";
const NoticeBanner = ({
  onPress,
  meetingInfo,
  otherName,
}: {
  onPress: () => void;
  meetingInfo: MeetingInfo;
  otherName: string;
}) => {
  const state = meetingInfo.state;

  const proposerName =
    meetingInfo.proposer === auth.currentUser.email ? "You" : otherName;
  const responderName =
    meetingInfo.proposer === auth.currentUser.email ? otherName : "You";

  // otherwise the proposer is the one who is shown
  let noticeText: string = "";
  let previousMeetingProposalText: string = "";
  switch (state) {
    case "confirmed":
      noticeText = `${responderName} confirmed the meeting`;
      break;
    case "canceled":
      // TODO we need to explicitly track who canceled the meeting
      noticeText = `${responderName} canceled the meeting`;
      previousMeetingProposalText = `${responderName} confirmed the meeting`;
      break;
    case "declined":
      // TODO we may also want to explicitly track who declines a proposal
      noticeText = `${responderName} declined the proposal`;
      previousMeetingProposalText = `${proposerName} proposed a meeting`;
      break;
    case "proposed":
      noticeText = `${proposerName} proposed a meeting`;
      break;
  }
  return (
    <View
      style={{
        height: 60,
        width: "100%",
        marginEnd: 100,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
      }}
    >
      {/* Show the previous proposal if the meeting was declined or cancelled */}
      {(state === "declined" || state === "canceled") && (
        <View style={{ flexDirection: "row", opacity: 0.5, marginBottom: 24 }}>
          <Feather name="calendar" size={17} />
          <Text style={[fonts.Title4, { marginStart: 6 }]}>
            {previousMeetingProposalText}
          </Text>
        </View>
      )}

      {/* Show the current status of the proposal */}
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {state === "declined" || state === "canceled" ? (
          <Feather name="slash" size={17} color="black" />
        ) : (
          <Feather name="calendar" size={17} />
        )}
        <Text style={[fonts.Title4, { marginStart: 6 }]}>{noticeText}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        {/* {state === "declined" && (
          <Text style={[fonts.Title3, { color: "#9E70F6", marginTop: 7 }]}>
            Send Another Proposal
          </Text>
        )} */}
        {state === "proposed" && (
          <Text style={[fonts.Title3, { color: "#9E70F6", marginTop: 7 }]}>
            View Proposal
          </Text>
        )}
        {state === "confirmed" && (
          <Text style={[fonts.Title3, { color: "#9E70F6", marginTop: 7 }]}>
            View Details
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NoticeBanner;
const styles = StyleSheet.create({
  button: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#9E70F6",
    padding: "3%",
    paddingRight: 40,
    paddingLeft: 40,
    borderRadius: 30,
    shadowOffset: { width: 3, height: 3 },
  },

  buttonText: {
    color: "white",
    fontFamily: "Rubik-Medium",
    fontSize: 16,
    textAlign: "center",
  },
});
