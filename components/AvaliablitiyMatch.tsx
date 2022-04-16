import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";

import { StyleSheet, Text, Pressable, View, Alert } from "react-native";
import WeekView, { createFixedWeekDate } from "react-native-week-view";

export function AvaliabilityModal({
  availabilityVisible,
  setAvailabilityVisible,
  setIsSendingAvaliability,
  setHeight,
}) {
  const [numDate, setNumDate] = useState(true);
  const [schedule, setSchedule] = useState([]);
  const MyEventComponent = ({ event, position }) => {
    console.log("wq" + event.color);
    switch (event.color) {
      case "#c8b9fa":
        return (
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
        );
      case "#9E70F6":
        return (
          <View
            style={{
              width: position.width,
              height: "100%",
              backgroundColor: "#9E70F6",
            }}
          ></View>
        );
      case "":
        return (
          <View
            style={{
              width: position.width,
              height: "100%",
              borderWidth: 2,
              borderStyle: "dashed",
              borderColor: "#9E70F6",
              backgroundColor: "#9e70f61a",
            }}
          ></View>
        );
    }
  };

  const onClickGrid = (event, startHour, date) => {
    let day = date.getDay();
    let length = schedule.length;
    let minute = date.getMinutes();
    for (let i = 0; i < schedule.length; i++) {
      if (schedule[i].startDate <= date && schedule[i].endDate >= date) {
        return;
      }
    }

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
      setNumDate(true);
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
        if (
          schedule[length - 1].startDate <= date &&
          schedule[length - 1].startDate.getDay() == date.getDay()
        ) {
          var endDate = createFixedWeekDate(
            day,
            minute >= 30 ? startHour + 1 : startHour,
            minute >= 30 ? 0 : 30
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
          setNumDate(false);
        }
      }
    }
  };

  const onEventPress = (event) => {
    let length = schedule.length;

    if (numDate) {
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
        setNumDate(false);
        resetScheduleIndex(temptSchedule);
        setSchedule(temptSchedule);
      }
    } else {
      var temptSchedule = [
        ...schedule.filter((e) => e.id !== event.id),
        {
          id: event.id,
          startDate: event.startDate,
          endDate: event.endDate,
          color: "#c8b9fa",
        },
      ];
      setSchedule(temptSchedule);
      Alert.alert("Delete an Avaliability", event.startDate.toString(), [
        {
          text: "Cancel",
          onPress: () => {
            var temptSchedule = [
              ...schedule.filter((e) => e.id !== event.id),
              {
                id: event.id,
                startDate: event.startDate,
                endDate: event.endDate,
                color: "#c8b9fa",
              },
            ];
            setSchedule(temptSchedule);
          },

          style: "cancel",
        },
        { text: "OK", onPress: () => deleteEvent(event) },
      ]);
    }
  };
  const resetScheduleIndex = (temptSchedule) => {
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
            When are you free to meet?
          </Text>
          <WeekView
            selectedDate={new Date()}
            headerStyle={{
              color: "#fff",
              borderColor: "#fff",
            }}
            formatTimeLabel={"h:mm A"}
            hourTextStyle={{
              color: "#7B7B7B",
              fontWeight: "bold",
              fontSize: 12,
            }}
            headerTextStyle={{
              color: "#7B7B7B",
              fontSize: 14,
            }}
            events={schedule}
            fixedHorizontally={false}
            showTitle={false}
            numberOfDays={4}
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
          <Pressable
            style={[styles.buttonContinue]}
            onPress={() => {
              setAvailabilityVisible(!availabilityVisible);
              setIsSendingAvaliability(true);
              setSchedule([]);
              setHeight(80);
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
    height: "90%",
    width: "100%",
  },
  modalView: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,

    paddingVertical: 25,
    paddingHorizontal: 55,
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
    fontSize: 20,
    color: "black",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
