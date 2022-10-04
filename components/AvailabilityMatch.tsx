import React, { useState } from "react";
import Modal from "react-native-modal";

import {
  StyleSheet,
  Text,
  View,
  Alert,
  StyleProp,
  ViewStyle,
} from "react-native";
import WeekView from "react-native-week-view";
import PurpleButton from "./PurpleButton";
const moment = require("moment");

export function AvailabilityModal({
  availabilityVisible,
  setAvailabilityVisible,
  setIsSendingAvailability,
  setScheduleCallback,
  bubbleInput,
  isBubble,
  setIsBubble,
  setHeight,
  username,
}) {
  const [hasPrev, setHasPrev] = useState(false);
  const [schedule, setSchedule] = useState<any[]>([]);
  function MyEventComponent({ event, position }) {
    switch (event.color) {
      case "#c8b9fa":
        return (
          //While deleting an event style
          <View
            style={{
              width: position.width,
              height: "100%",
              borderWidth: 2,
              borderStyle: "dashed",
              borderColor: "#ffffff",
              backgroundColor: "#c8b9fa",
            }}
          ></View>
        ) as any;
      case "#9E70F6":
        return (
          //a complete event style
          <View
            style={{
              width: position.width,
              height: "100%",
              backgroundColor: "#9E70F6",
            }}
          ></View>
        ) as any;
      case "":
        return (
          //Start time of an event style, start event always have color of ""
          <View
            style={{
              width: position.width,
              height: "100%",
              borderWidth: 2,
              borderStyle: "dashed",
              borderColor: "#9E70F6",
              backgroundColor: "#f8f4fc",
            }}
          ></View>
        ) as any;
    }
  }

  const onClickGrid = (event, startHour, date) => {
    if (!isBubble) {
      //Make sure it's not avaliability bubble mode, which is not editable
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let minute = date.getMinutes();
      let length = schedule.length;

      for (let i = 0; i < schedule.length; i++) {
        //If current grid is already an event in schedule, return
        if (schedule[i].startDate <= date && schedule[i].endDate >= date) {
          return;
        }
      }

      if (!hasPrev) {
        // If there is no previous event, create a 30 minute start event, with color ""
        setSchedule([
          ...schedule,
          {
            id: length,
            startDate: new Date(
              year,
              month,
              day,
              startHour,
              minute >= 30 ? 30 : 0,
              0,
              0
            ),

            endDate: new Date(
              year,
              month,
              day,
              minute >= 30 ? startHour + 1 : startHour,
              minute >= 30 ? 0 : 30,
              0,
              0
            ),
            color: "",
          },
        ]);
        setHasPrev(true);
      } else {
        if (
          //Make sure event are on the same day, and after the start event start date
          schedule[length - 1].startDate <= date &&
          schedule[length - 1].startDate.getDay() == date.getDay()
        ) {
          var endDate = new Date(
            year,
            month,
            day,
            minute >= 30 ? startHour + 1 : startHour,
            minute >= 30 ? 0 : 30,
            0,
            0
          );

          var oldStartDate = schedule[length - 1].startDate;
          var temptSchedule = [
            ...schedule
              .slice(0, length - 1)
              .filter((e) => e.endDate < oldStartDate || e.startDate > endDate),
            {
              id: length - 1,
              startDate: oldStartDate,
              endDate: endDate,
              color: "#9E70F6",
            },
          ];
          resetScheduleIndex(temptSchedule);
          setSchedule(temptSchedule);
          setHasPrev(false);
        }
      }
    }
  };

  const onEventPress = (event) => {
    let length = schedule.length;
    if (!isBubble) {
      //Make sure it's not avaliability bubble mode, which is not editable

      if (hasPrev) {
        // connect two events, if an event is clicked after the start event, rather than a grid is clicked
        if (
          schedule[length - 1].startDate <= event.startDate &&
          schedule[length - 1].startDate.getDay() == event.startDate.getDay()
        ) {
          var temptSchedule = [
            ...schedule.slice(0, length - 1).filter((e) => e.id !== event.id),
            {
              id: length - 1,
              startDate: schedule[length - 1].startDate,
              endDate: event.endDate,
              color: "#9E70F6",
            },
          ];
          setHasPrev(false);
          resetScheduleIndex(temptSchedule);
          setSchedule(temptSchedule);
        }
      } else {
        //Delete an event, changed the event color
        var temptSchedule = [
          ...schedule.filter((e) => e.id !== event.id),
          {
            id: parseInt(event.id),
            startDate: event.startDate as Date,
            endDate: event.endDate,
            color: "#c8b9fa",
          },
        ];
        setSchedule(temptSchedule);
        Alert.alert(
          "Delete an Avaliability",
          "Are you sure you want to delete the availability starts at \n " +
            moment(event.startDate).format("MMMM Do YYYY, h:mm a"),
          [
            {
              text: "Cancel",
              onPress: () => {
                var temptSchedule = [
                  ...schedule.filter((e) => e.id !== event.id),
                  {
                    id: event.id,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    color: "#9E70F6",
                  },
                ];
                setSchedule(temptSchedule);
              },

              style: "cancel",
            },
            { text: "OK", onPress: () => deleteEvent(event) },
          ]
        );
      }
    }
  };
  const resetScheduleIndex = (temptSchedule) => {
    //reorder the id, make sure each id is unique
    for (let i = 0; i < temptSchedule.length; i++) {
      temptSchedule[i].id = i;
    }
  };
  const deleteEvent = (event) => {
    if (schedule.length == 1) {
      setSchedule([]);
    } else {
      var tempt = schedule.filter((e) => e.id !== event.id);
      resetScheduleIndex(tempt);
      setSchedule(tempt);
    }
  };

  return (
    <Modal
      backdropColor="black"
      backdropOpacity={0.2}
      isVisible={availabilityVisible}
      onBackdropPress={() => {
        setAvailabilityVisible(false);
        setSchedule([]);
      }}
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={[styles.textStyle, { marginBottom: 30 }]}>
            {isBubble ? username + "'s Avaliability" : "Select a time to meet"}
          </Text>
          <WeekView
            selectedDate={new Date()}
            headerStyle={styles.headerStyle}
            formatTimeLabel={"h:mm A"}
            hourTextStyle={styles.hourTextStyle}
            headerTextStyle={styles.headerTextStyle as StyleProp<ViewStyle>}
            events={isBubble ? bubbleInput : schedule}
            fixedHorizontally={false}
            showTitle={false}
            numberOfDays={4}
            beginAgendaAt={9 * 60}
            endAgendaAt={23 * 60}
            hoursInDisplay={20}
            startHour={8}
            eventContainerStyle={{ marginLeft: 2 }}
            onGridClick={onClickGrid}
            formatDateHeader={"  ddd[\n]MMM D"}
            EventComponent={MyEventComponent}
            onEventPress={onEventPress}
            showNowLine={true}
            nowLineColor={"#9E70F6"}
          />
          {!isBubble && (
            <View style={styles.greyButton}>
              <PurpleButton
                onPress={() => {
                  setAvailabilityVisible(!availabilityVisible);
                  if (!isBubble) {
                    if (schedule.length > 0) {
                      setIsSendingAvailability(true);
                      setScheduleCallback(schedule);
                      setSchedule([]);
                      setHeight(120);
                    }
                  } else {
                    setIsBubble(false);
                  }
                }}
                text={"Continue"}
                enabled={true}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    alignItems: "center",
    height: "90%",
    width: "100%",
    paddingHorizontal: 30,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  modalView: {
    height: "100%",
    width: "100%",
    paddingVertical: 25,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  buttonContinue: {
    backgroundColor: "#ECECEC",
    paddingHorizontal: 60,
    paddingVertical: 13,
    borderRadius: 25,
    elevation: 2,
  },
  textStyle: {
    fontFamily: "Roboto-Medium",
    fontSize: 20,
    color: "black",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  greyButton: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    width: "100%",
    zIndex: 10,
    height: 50,
    backgroundColor: "transparent",
  },
  headerStyle: {
    color: "#ffffff",
    borderColor: "#ffffff",
  },
  headerTextStyle: {
    color: "#7B7B7B",
    fontSize: 14,
  },
  hourTextStyle: {
    color: "#7B7B7B",
    fontWeight: "bold",
    fontSize: 12,
  },
});
