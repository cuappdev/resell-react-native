import React, { useState } from "react";

import { BottomSheetView } from "@gorhom/bottom-sheet";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import WeekView, { WeekViewEvent } from "react-native-week-view";
import Colors from "../../constants/Colors";
// TODO https://ui.gorhom.dev/components/bottom-sheet/modal/usage
import PurpleButton from "../PurpleButton";
const moment = require("moment");

interface Event {
  id: number;
  startDate: Date;
  endDate: Date;
  color: string;
}

export function AvailabilityModal({
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
  isViewOnly,
}) {
  const [schedule, setSchedule] = useState<Event[]>([]);
  const [largestIndex, setLargestIndex] = useState(30);

  const onClickGrid = (_, startHour: number, date: Date) => {
    if (!isBubble) {
      //Make sure it's not avaliability bubble mode, which is not editable
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let minute = date.getMinutes();
      var duplicate = false;

      schedule.forEach(checkIfExisted);

      function checkIfExisted(s: Event) {
        if (s.startDate <= date && s.endDate >= date) {
          duplicate = true;
        }
      }

      // If there is no previous event, create a 30 minute start event
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
            color: Colors.resellPurple,
          },
        ]);
        setLargestIndex(largestIndex + 1);
      }
    }
  };
  const onEventPress = (event: WeekViewEvent) => {
    console.log(`event pressed`);
    if (!isBubble) {
      if (schedule.length == 1) {
        setSchedule([]);
      } else {
        var tempt = schedule.filter((e) => e.id !== event.id);
        setSchedule(tempt);
      }
    } else {
      if (!isViewOnly) {
        setAvailabilityVisible(false);
        setSelectedTime(moment(event.startDate).format("MMMM Do YYYY, h:mm a"));
      }
    }
  };
  const resetScheduleIndex = (temptSchedule) => {
    //reorder the id, make sure each id is unique
    for (let i = 0; i < temptSchedule.length; i++) {
      temptSchedule[i].id = i;
    }
  };
  return (
    <BottomSheetView style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={[styles.textStyle, { marginBottom: isBubble ? 32 : 8 }]}>
          {isBubble
            ? username + "'s Avaliability"
            : "When are you free to meet?"}
        </Text>
        {!isBubble && (
          <Text style={{ color: Colors.secondaryGray, marginBottom: 24 }}>
            Tap on a cell to add/remove availability
          </Text>
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
          hoursInDisplay={24}
          startHour={8}
          timesColumnWidth={0.28}
          eventContainerStyle={{ marginLeft: 2 }}
          onGridClick={onClickGrid}
          formatDateHeader={"  ddd[\n]MMM D"}
          onEventPress={onEventPress}
          showNowLine={true}
          nowLineColor={"#9E70F6"}
          allowScrollByDay
        />
        {!isBubble && (
          <View style={styles.greyButton}>
            <PurpleButton
              onPress={() => {
                setAvailabilityVisible(false);
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
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    paddingHorizontal: 30,
    backgroundColor: "white",
  },
  modalView: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 32,
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
    bottom: 44,
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
