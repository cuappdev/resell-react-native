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
import PurpleButton from "./PurpleButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Calendar from "expo-calendar";
import { fonts } from "../globalStyle/globalFont";
import { auth, historyRef } from "../config/firebase";
import moment from "moment";
import { makeToast } from "../utils/Toast";
export default function BuyerSyncModal({
  visible,
  setVisible,
  eventTitle,
  text,
  email,
  startDate,
  setShowNotice,
  setActivateIcon,
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
        console.log("Here are all your calendars:");
        console.log({ calendars });
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
      console.log("added event: ", startDateWithTime);
      console.log("added event: ", endDateWithTime);
    } catch (e) {
      Alert.alert("Sorry we don't have access to you calendar account");
      console.log(e);
    }
  };
  return (
    <Modal //Confirm Meeting details
      isVisible={visible}
      backdropOpacity={0.2}
      onBackdropPress={() => {
        setActivateIcon(true);
        setVisible(false);
        setShowNotice(false);
        historyRef
          .doc(auth?.currentUser?.email)
          .collection("sellers")
          .doc(email)
          .update({
            confirmedViewed: true,
          });
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
              historyRef
                .doc(auth?.currentUser?.email)
                .collection("sellers")
                .doc(email)
                .update({
                  confirmedViewed: true,
                });
              setVisible(false);
              setShowNotice(false);
              setActivateIcon(true);
              console.log("here");
              const { status } =
                await Calendar.requestCalendarPermissionsAsync();
              if (status === "granted") {
                addNewEvent();
                makeToast("Added event to your calendar!");
              } else {
                console.log("permission not granted");
                makeToast("Calendar Permission not Granted");
              }
            }}
            enabled={true}
          />
        </View>
        <Text
          style={[fonts.Title2, { position: "absolute", bottom: "11%" }]}
          onPress={() => {
            setActivateIcon(true);
            setVisible(false);
            setShowNotice(false);
            historyRef
              .doc(auth?.currentUser?.email)
              .collection("sellers")
              .doc(email)
              .update({
                confirmedViewed: true,
              });
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
