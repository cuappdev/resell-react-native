import * as Calendar from "expo-calendar";
import React, { useEffect, useState } from "react";
import { Linking, Platform, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import PurpleButton from "../PurpleButton";

import moment from "moment";
import Colors from "../../constants/Colors";
import { fonts } from "../../globalStyle/globalFont";
import { makeToast } from "../../utils/Toast";
import {
  getCalendarID,
  storeCalendarID,
} from "../../utils/asychStorageFunctions";
export default function SellerSyncModal({
  visible,
  setVisible,
  eventTitle,
  startDate,
}) {
  const momentDate = moment(startDate, "MMMM Do YYYY, h:mm a");
  const startText = moment(momentDate).format("dddd, MMMM Do · h:mm");
  const endDate = moment(momentDate).add(30, "m");
  const dateText = startText + "-" + endDate.format("h:mm a");
  const [calendarID, setCalendarID] = useState<string | null>(null);
  useEffect(() => {
    Calendar.requestCalendarPermissionsAsync();
    getCalendarID(setCalendarID);
  }, []);

  async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }

  async function createCalendar() {
    const defaultCalendarSource: Calendar.Source =
      Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: "Resell Appointments", type: "LOCAL" };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: "Resell Appointments",
      color: Colors.resellPurple,
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: "internalCalendarName",
      ownerAccount: "personal",
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    await storeCalendarID(newCalendarID);
    setCalendarID(newCalendarID);
    return newCalendarID;
  }

  const addNewEvent = async () => {
    try {
      const startDateWithTime = momentDate.toDate();
      const endDateWithTime = endDate.toDate();
      await Calendar.createEventAsync(calendarID, {
        endDate: endDateWithTime,
        startDate: startDateWithTime,
        title: eventTitle,
      });
      console.log("added event: ", endDateWithTime);
      console.log("added event: ", startDateWithTime);
    } catch (e) {
      makeToast({ message: "Cannot access your calendar!", type: "ERROR" });

      console.log(e);
    }
  };
  const onSyncPress = async () => {
    const event = {
      title: "Meeting for Resell",
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
    // try {
    //   const { status } = await Calendar.requestCalendarPermissionsAsync();
    //   if (status === "granted") {
    //     let targetCalendarID = calendarID;
    //     if (targetCalendarID === null) {
    //       targetCalendarID = await createCalendar();
    //     }
    //     await addNewEvent();
    //     makeToast({ message: "Added event to your calendar!" });

    //     console.log("CalendarID: ", calendarID);
    //   } else {
    //     throw new Error("No calendar permissions");
    //   }
    // } catch (_) {
    //   console.log("permission not granted");
    //   makeToast({
    //     message: "Calendar Permission not Granted",
    //     type: "ERROR",
    //   });
    // }
    // setVisible(false);
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
