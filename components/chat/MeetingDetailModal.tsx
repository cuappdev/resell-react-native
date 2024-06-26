import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

import moment from "moment";
import { auth } from "../../config/firebase";
import { fonts } from "../../globalStyle/globalFont";

/**
 * UNUSED COMPONENT, DELETE IN THE FUTURE
 */
export default function MeetingDetailModal({
  visible,
  setVisible,
  startDate,
  otherEmail,
  proposer,
  name,
  post,
  isBuyer,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  startDate: string;
  otherEmail: string;
  proposer: string;
  name: string;
  post: any;
  isBuyer: boolean;
}) {
  const momentDate = moment(startDate, "MMMM Do YYYY, h:mm a");
  const startText = moment(momentDate).format("dddd, MMMM Do · h:mm");
  const endDate = moment(momentDate).add(30, "m").format("h:mm a");
  const dateText = startText + "-" + endDate;
  const sellerEmail = isBuyer ? otherEmail : auth.currentUser.email;
  const buyerEmail = isBuyer ? auth.currentUser.email : otherEmail;
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
          onPress={async () => {}}
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
