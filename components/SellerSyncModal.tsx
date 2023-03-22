import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
} from "react-native";
import PurpleButton from "../components/PurpleButton";
import * as Calendar from "expo-calendar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Toast from "react-native-root-toast";
import { fonts } from "../globalStyle/globalFont";
import moment from "moment";
import { makeToast } from "../utils/Toast";
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
  const [calendarID, setCalendarID] = useState("");
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        console.log("Here are all your calendars:");
        console.log({ calendars });
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("calendarID", (errs, result) => {
      if (!errs) {
        if (result !== null && result !== undefined) {
          setCalendarID(result);
        } else {
          createCalendar();
        }
      }
    });
  }, []);

  const storeCalendarID = async (calendarID) => {
    try {
      await AsyncStorage.setItem("calendarID", calendarID);
    } catch (e) {
      console.log(e);
    }
  };

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
      color: "#9E70F6",
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: "internalCalendarName",
      ownerAccount: "personal",
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
    storeCalendarID(newCalendarID);
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
      makeToast("Cannot access your calendar!");

      console.log(e);
    }
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
          <PurpleButton
            text={"Sync"}
            onPress={() => {
              async () => {
                const { status } =
                  await Calendar.requestCalendarPermissionsAsync();
                if (status === "granted") {
                  addNewEvent();
                  makeToast("Added event to your calendar!");

                  console.log("CalendarID: ", calendarID);
                } else {
                  console.log("permission not granted");
                  makeToast("Calendar Permission not Granted");
                }
              };
              setVisible(false);
            }}
            enabled={true}
          />
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
