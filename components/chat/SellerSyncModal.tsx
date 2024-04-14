import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import PurpleButton from "../PurpleButton";

import moment from "moment";
import { fonts } from "../../globalStyle/globalFont";
export default function SellerSyncModal({
  visible,
  setVisible,
  eventTitle,
  startDate,
}) {
  const momentDate = moment(startDate, "MMMM Do YYYY, h:mm a");
  const endDate = moment(momentDate).add(30, "m");

  const onSyncPress = async () => {
    const event = {
      title: eventTitle,
      startDate: momentDate.toDate(),
      endDate: endDate.toDate(),
      location: "",
      details: "",
    };

    const formattedStartDate = event.startDate
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, "");
    const formattedEndDate = event.endDate
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, "");

    const googleCalendarURL = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${formattedStartDate}/${formattedEndDate}&location=${encodeURIComponent(
      event.location
    )}&details=${encodeURIComponent(event.details)}`;
    console.log(`Event URL: ${googleCalendarURL}`);

    Linking.openURL(googleCalendarURL);
  };

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
        <Text style={[fonts.pageHeading3]}>
          Sync meeting to Google Calendar?
        </Text>
        <View>
          <PurpleButton text={"Sync"} onPress={onSyncPress} enabled={true} />
        </View>

        <Text
          style={fonts.Title2}
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
    height: 240,
    backgroundColor: "#ffffff",
    width: "100%",
    marginHorizontal: 0,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
