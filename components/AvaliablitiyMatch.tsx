import React, { useState } from "react";
import Modal from "react-native-modal";

import { StyleSheet, Text, Pressable, View, Alert } from "react-native";
import WeekView, { createFixedWeekDate } from "react-native-week-view";

export function AvaliabilityModal({
  availabilityVisible,
  setAvailabilityVisible,
  setIsSendingAvaliability,
}) {
  const [numDate, setNumDate] = useState(true);
  const [schedule, setSchedule] = useState([]);
  const MyEventComponent = ({ event, position }) => (
    <View
      style={{
        width: position.width,
        height: "100%",
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#9E70F6",
        backgroundColor: "rgba(158, 112, 246, .1)",
      }}
    ></View>
  );

  const onDragEvent = (event, newStartDate, newEndDate) => {
    var tempt = schedule.filter((e) => e.id !== event.id);
    tempt.push({
      id: tempt.length,
      startDate: newStartDate,
      endDate: newEndDate,
      color: "#9E70F6",
    });
    for (let i = 0; i < tempt.length; i++) {
      tempt[i].id = i;
    }
    setSchedule(tempt);
  };
  const onClickGrid = (event, startHour, date) => {
    let length = schedule.length;
    let day = date.getDay();
    let minute = date.getMinutes();
    if (length == 0) {
      setSchedule([
        {
          id: 0,
          startDate: createFixedWeekDate(day, startHour, minute >= 30 ? 30 : 0),
          endDate: createFixedWeekDate(
            day,
            minute >= 30 ? startHour + 1 : startHour,
            minute >= 30 ? 0 : 30
          ),
          color: "",
        },
      ]);
    } else {
      if (!numDate) {
        setSchedule([
          ...schedule,
          {
            id: length,
            startDate: createFixedWeekDate(
              day,
              startHour,
              minute >= 30 ? 30 : 0
            ),
            endDate: createFixedWeekDate(
              day,
              minute >= 30 ? startHour + 1 : startHour,
              minute >= 30 ? 0 : 30
            ),
            color: "",
          },
        ]);
        setNumDate(true);
      } else {
        setSchedule([
          ...schedule.slice(0, length - 1),
          {
            id: length - 1,
            startDate: schedule[length - 1].startDate,
            endDate: createFixedWeekDate(
              day,
              minute >= 30 ? startHour + 1 : startHour,
              minute >= 30 ? 0 : 30
            ),
            color: "#9E70F6",
          },
        ]);

        setNumDate(false);
      }
    }
  };
  const onEventLongPress = (event) => {
    var tempt = schedule.filter((e) => e.id !== event.id);
    for (let i = 0; i < tempt.length; i++) {
      tempt[i].id = i;
    }
    setSchedule(tempt);
  };

  return (
    <Modal
      backdropColor="black"
      backdropOpacity={0.2}
      isVisible={availabilityVisible}
      onBackdropPress={() => setAvailabilityVisible(false)}
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={[styles.textStyle, { marginBottom: 30 }]}>
            When are you free to meet?
          </Text>
          <WeekView
            headerStyle={{
              color: "#fff",
              borderColor: "#fff",
            }}
            hourTextStyle={{ color: "#7B7B7B" }}
            headerTextStyle={{ color: "#7B7B7B" }}
            events={schedule}
            fixedHorizontally={true}
            showTitle={false}
            numberOfDays={3}
            hoursInDisplay={20}
            startHour={8}
            eventContainerStyle={{ marginLeft: 2 }}
            onGridClick={onClickGrid}
            formatDateHeader={" ddd[\n]MMM D"}
            onDragEvent={onDragEvent}
            EventComponent={MyEventComponent}
            onEventLongPress={onEventLongPress}
          />
          <Pressable
            style={[styles.buttonContinue]}
            onPress={() => {
              setAvailabilityVisible(!availabilityVisible);
              setIsSendingAvaliability(true);
            }}
          >
            <Text style={styles.textStyle}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    alignItems: "center",
    height: "85%",
    width: "100%",
  },
  modalView: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 50,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    fontSize: 18,
    color: "black",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
