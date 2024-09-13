import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateDoc } from "@react-native-firebase/firestore";
import * as Calendar from "expo-calendar";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { auth, historyRef } from "../../config/firebase";
import { fonts } from "../../globalStyle/globalFont";
import { makeToast } from "../../utils/Toast";
import PurpleButton from "../PurpleButton";

/**
 * Modal that displays the details of a confirmed meeting
 */
export default function ConfirmedMeetingModal({
  visible,
  setVisible,
  eventTitle,
  text,
  email,
  startDate,
}) {
  const momentDate = moment(startDate, "MMMM Do YYYY, h:mm a");
  const startText = moment(momentDate).format("dddd, MMMM Do · h:mm");
  const endDate = moment(momentDate).add(30, "m");
  const dateText = startText + "-" + endDate.format("h:mm a");
  const [calendarID, setCalendarID] = useState("");

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
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
      }
    })();
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
    } catch (e) {
      Alert.alert("Sorry we don't have access to you calendar account");
      console.log(e);
    }
  };
  const updateViewed = () => {
    try {
      updateDoc(
        historyRef.doc(auth.currentUser.email).collection("sellers").doc(email),
        { confirmedView: true }
      );
    } catch (e) {
      console.error(`Error in ConfirmedMeetingModal: ${e}`);
    }
  };

  return (
    <Modal //Confirm Meeting details
      isVisible={visible}
      backdropOpacity={0.2}
      onBackdropPress={() => {
        setVisible(false);
        // setShowNotice(false);
        updateViewed();
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
        <View style={{ position: "absolute", bottom: "22%" }}>
          <PurpleButton
            text={"Sync to Calendar"}
            onPress={async () => {
              updateViewed();
              setVisible(false);
              // setShowNotice(false);
              const { status } =
                await Calendar.requestCalendarPermissionsAsync();
              if (status === "granted") {
                addNewEvent();
                makeToast({ message: "Added event to your calendar!" });
              } else {
                makeToast({
                  message: "Calendar Permission not Granted",
                  type: "ERROR",
                });
              }
            }}
            enabled={true}
          />
        </View>
        <Text
          style={[fonts.Title2, { position: "absolute", bottom: "11%" }]}
          onPress={() => {
            setVisible(false);
            // setShowNotice(false);
            updateViewed();
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
});
