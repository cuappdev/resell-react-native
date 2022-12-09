import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";

import {
  StyleSheet,
  Text,
  View,
  Alert,
  ViewStyle,
  StyleProp,
  Platform,
} from "react-native";
import WeekView from "react-native-week-view";
import PurpleButton from "./PurpleButton";
import BuyerSyncModal from "./BuyerSyncModal";
const moment = require("moment");
import * as Calendar from "expo-calendar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fonts } from "../globalStyle/globalFont";
import { type } from "os";

export function AvailabilityModal({
  availabilityVisible,
  setAvailabilityVisible,
  setIsSendingAvailability,
  setBuyerProposeVisible,
  setScheduleCallback,
  bubbleInput,
  isBubble,
  setIsBubble,
  setHeight,
  selectdate,
  username,
  isBuyer,
  setSelectedTime,
}) {
  interface availabilityEvent {
    id: number;
    description?: string;
    startDate: Date;
    endDate: Date;
    color: String;
  }
  const myEvents: availabilityEvent[] = [
    {
      id: 1,
      description: "Event",
      startDate: new Date(2022, 12, 4, 12, 0),
      endDate: new Date(2022, 12, 4, 12, 30),
      color: "blue",
    },
    {
      id: 2,
      description: "Event",
      startDate: new Date(2022, 12, 4, 12, 30),
      endDate: new Date(2022, 12, 4, 13, 0),
      color: "blue",
    },
    {
      id: 3,
      description: "Event",
      startDate: new Date(2022, 12, 4, 13, 0),
      endDate: new Date(2022, 12, 4, 13, 30),
      color: "blue",
    },
    {
      id: 4,
      description: "Event",
      startDate: new Date(2022, 12, 4, 13, 30),
      endDate: new Date(2022, 12, 4, 14, 0),
      color: "blue",
    },
    {
      id: 5,
      description: "Event",
      startDate: new Date(2022, 12, 4, 14, 0),
      endDate: new Date(2022, 12, 4, 14, 30),
      color: "blue",
    },
    {
      id: 6,
      description: "Event",
      startDate: new Date(2022, 12, 4, 14, 30),
      endDate: new Date(2022, 12, 4, 15, 0),
      color: "blue",
    },
    {
      id: 7,
      description: "Event",
      startDate: new Date(2022, 12, 4, 15, 0),
      endDate: new Date(2022, 12, 4, 15, 30),
      color: "blue",
    },
    {
      id: 8,
      description: "Event",
      startDate: new Date(2022, 12, 4, 15, 30),
      endDate: new Date(2022, 12, 4, 16, 0),
      color: "blue",
    },
    {
      id: 9,
      description: "Event",
      startDate: new Date(2022, 12, 4, 16, 0),
      endDate: new Date(2022, 12, 4, 16, 30),
      color: "blue",
    },
    {
      id: 10,
      description: "Event",
      startDate: new Date(2022, 12, 4, 16, 30),
      endDate: new Date(2022, 12, 4, 17, 0),
      color: "blue",
    },
    {
      id: 11,
      description: "Event",
      startDate: new Date(2022, 12, 4, 17, 0),
      endDate: new Date(2022, 12, 4, 17, 30),
      color: "blue",
    },
    {
      id: 12,
      description: "Event",
      startDate: new Date(2022, 12, 4, 17, 30),
      endDate: new Date(2022, 12, 4, 18, 0),
      color: "blue",
    },
    {
      id: 13,
      description: "Event",
      startDate: new Date(2022, 12, 4, 18, 30),
      endDate: new Date(2022, 12, 4, 19, 0),
      color: "blue",
    },
    {
      id: 14,
      description: "Event",
      startDate: new Date(2022, 12, 4, 19, 0),
      endDate: new Date(2022, 12, 4, 19, 30),
      color: "blue",
    },
    {
      id: 15,
      description: "Event",
      startDate: new Date(2022, 12, 4, 19, 30),
      endDate: new Date(2022, 12, 4, 20, 0),
      color: "blue",
    },

    {
      id: 16,
      description: "Event",
      startDate: new Date(2022, 12, 5, 12, 0),
      endDate: new Date(2022, 12, 5, 12, 30),
      color: "blue",
    },
    {
      id: 17,
      description: "Event",
      startDate: new Date(2022, 12, 5, 12, 30),
      endDate: new Date(2022, 12, 5, 13, 0),
      color: "blue",
    },
    {
      id: 18,
      description: "Event",
      startDate: new Date(2022, 12, 5, 13, 0),
      endDate: new Date(2022, 12, 5, 13, 30),
      color: "blue",
    },
    {
      id: 19,
      description: "Event",
      startDate: new Date(2022, 12, 5, 13, 30),
      endDate: new Date(2022, 12, 5, 14, 0),
      color: "blue",
    },
    {
      id: 20,
      description: "Event",
      startDate: new Date(2022, 12, 5, 14, 0),
      endDate: new Date(2022, 12, 5, 14, 30),
      color: "blue",
    },
    {
      id: 21,
      description: "Event",
      startDate: new Date(2022, 12, 5, 14, 30),
      endDate: new Date(2022, 12, 5, 15, 0),
      color: "blue",
    },
    {
      id: 22,
      description: "Event",
      startDate: new Date(2022, 12, 5, 15, 0),
      endDate: new Date(2022, 12, 5, 15, 30),
      color: "blue",
    },
    {
      id: 23,
      description: "Event",
      startDate: new Date(2022, 12, 5, 15, 30),
      endDate: new Date(2022, 12, 5, 16, 0),
      color: "blue",
    },
    {
      id: 24,
      description: "Event",
      startDate: new Date(2022, 12, 5, 16, 0),
      endDate: new Date(2022, 12, 5, 16, 30),
      color: "blue",
    },
    {
      id: 25,
      description: "Event",
      startDate: new Date(2022, 12, 5, 16, 30),
      endDate: new Date(2022, 12, 5, 17, 0),
      color: "blue",
    },
    {
      id: 26,
      description: "Event",
      startDate: new Date(2022, 12, 5, 17, 0),
      endDate: new Date(2022, 12, 5, 17, 30),
      color: "blue",
    },
    {
      id: 27,
      description: "Event",
      startDate: new Date(2022, 12, 5, 17, 30),
      endDate: new Date(2022, 12, 5, 18, 0),
      color: "blue",
    },
    {
      id: 28,
      description: "Event",
      startDate: new Date(2022, 12, 5, 18, 30),
      endDate: new Date(2022, 12, 5, 19, 0),
      color: "blue",
    },
    {
      id: 29,
      description: "Event",
      startDate: new Date(2022, 12, 5, 19, 0),
      endDate: new Date(2022, 12, 5, 19, 30),
      color: "blue",
    },
    {
      id: 30,
      description: "Event",
      startDate: new Date(2022, 12, 5, 19, 30),
      endDate: new Date(2022, 12, 5, 20, 0),
      color: "blue",
    },
  ];

  const [schedule, setSchedule] = useState<any[]>([]);
  const [largestIndex, setLargestIndex] = useState(30);
  function MyEventComponent({ event, position }) {
    switch (event.color) {
      case "#9E70F6":
        return (
          //a complete event style
          <View
            style={{
              width: position.width,
              height: "100%",
              backgroundColor: "#9E70F6",
            }}
          />
        ) as any;
      case "f8f4fc":
        return (
          //select time of an event style, start event always have color of "f8f4fc"
          <View
            style={{
              width: position.width,
              height: "100%",
              borderWidth: 2,
              borderStyle: "dashed",
              borderColor: "#9E70F6",
              backgroundColor: "#f8f4fc",
            }}
          />
        ) as any;
    }
  }

  const onClickGrid = (event, startHour, date) => {
    if (!isBubble && schedule.length < 20) {
      //Make sure it's not avaliability bubble mode, which is not editable
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let minute = date.getMinutes();
      var duplicate = false;

      schedule.forEach(checkIfExisted);

      function checkIfExisted(s) {
        if (s.startDate <= date && s.endDate >= date) {
          console.log("here");
          duplicate = true;
        }
      }

      // If there is no previous event, create a 30 minute start event, with color ""
      if (!duplicate) {
        setSchedule([
          ...schedule,
          {
            id: largestIndex + 1,
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
            color: "#9E70F6",
          },
        ]);
        setLargestIndex(largestIndex + 1);
      }
    }
  };
  const onEventPress = (event) => {
    let length = schedule.length;
    if (!isBubble) {
      if (schedule.length == 1) {
        setSchedule([]);
      } else {
        var tempt = schedule.filter((e) => e.id !== event.id);
        setSchedule(tempt);
      }
    } else if (isBuyer) {
      setAvailabilityVisible(false);
      setSelectedTime(moment(event.startDate).format("MMMM Do YYYY, h:mm a"));
      console.log("gotTime");
    }
  };
  const resetScheduleIndex = (temptSchedule) => {
    //reorder the id, make sure each id is unique
    for (let i = 0; i < temptSchedule.length; i++) {
      temptSchedule[i].id = i;
    }
  };

  return (
    <Modal
      backdropColor="black"
      backdropOpacity={0.2}
      isVisible={availabilityVisible}
      onModalHide={() => {
        if (isBubble && isBuyer && selectdate != "") {
          setBuyerProposeVisible(true);
        }
      }}
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
          {!isBubble && (
            <Text style={fonts.body2}>{schedule.length + "/ 20"}</Text>
          )}
          <WeekView
            selectedDate={new Date()}
            headerStyle={styles.headerStyle}
            formatTimeLabel={"h:mm A"}
            hourTextStyle={styles.hourTextStyle}
            headerTextStyle={styles.headerTextStyle as StyleProp<ViewStyle>}
            events={isBubble ? bubbleInput : schedule}
            fixedHorizontally={false}
            showTitle={false}
            numberOfDays={3}
            beginAgendaAt={9 * 60}
            endAgendaAt={23 * 60}
            hoursInDisplay={20}
            startHour={8}
            timesColumnWidth={0.28}
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
                      resetScheduleIndex(schedule);
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
