import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import { Dimensions, StyleSheet, Text, View, Platform } from "react-native";
import PurpleButton from "../components/PurpleButton";
import * as Calendar from "expo-calendar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Toast from "react-native-root-toast";
export default function SellerSyncModal({
  syncMeetingVisible,
  setSyncMeetingVisible,
  eventTitle,
}) {
  const [calendarID, setCalendarID] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("calendarID", (errs, result) => {
      if (!errs) {
        if (result !== null && result !== undefined) {
          setCalendarID(result);
        } else {
          createCalendar();
          setCalendarID(calendarID);
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
  async function createCalendar() {
    const defaultCalendarSource: Calendar.Source =
      Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: "Resell Appointments", type: "LOCAL" };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: "Resell Appointments",
      color: "blue",
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

  async function getDefaultCalendarSource() {
    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    const defaultCalendars = calendars.filter(
      (each) => each.source.name === "Default"
    );
    return defaultCalendars.length
      ? defaultCalendars[0].source
      : calendars[0].source;
  }

  const addNewEvent = async () => {
    try {
      const startDate = "2022-11-03";
      const startDateWithTime = new Date(startDate + "T11:30:00");
      // const endDateWithTime = new Date(startDate + 'T12:30:00')
      const endDateWithTime = new Date(startDate + "T12:30:00");
      const res = await Calendar.createEventAsync(calendarID, {
        endDate: startDateWithTime,
        startDate: endDateWithTime,
        title: eventTitle,
      });
      console.log("added event: ", res);
      console.log("added event: ", startDateWithTime);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal //Confirm Meeting details
      isVisible={syncMeetingVisible}
      backdropOpacity={0.2}
      onBackdropPress={() => {
        setSyncMeetingVisible(false);
      }}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View style={styles.slideUp}>
        <Text style={styles.MeetingDetailsBoldText}>
          Sync meeting to Google Calendar?
        </Text>
        <View style={styles.purpleButton}>
          <PurpleButton
            text={"Sync"}
            onPress={() => {
              (async () => {
                const { status } =
                  await Calendar.requestCalendarPermissionsAsync();
                if (status === "granted") {
                  addNewEvent();
                  setSyncMeetingVisible(false);
                  console.log("CalendarID: ", calendarID);
                } else {
                  console.log("permission not granted");
                  let toast = Toast.show("Calendar Permission not Granted", {
                    duration: Toast.durations.LONG,
                  });
                }
              })();
            }}
            enabled={true}
          />
        </View>

        <Text
          style={styles.MeetingDetailsBoldText}
          onPress={() => {
            setSyncMeetingVisible(false);
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
    height: 220,
    backgroundColor: "#ffffff",
    width: "100%",
    marginHorizontal: 0,
    alignItems: "center",
    padding: 35,
    paddingLeft: 20,
    paddingRight: 20,
  },
  purpleButton: {
    marginTop: 35,
    marginBottom: 21,
  },
  MeetingDetailsBoldText: {
    fontFamily: "Rubik-Medium",
    fontSize: 17,
  },
});
