import React, { useState } from "react";
import Modal from "react-native-modal";

import { StyleSheet, Text, Pressable, View, Alert } from "react-native";
import { NumberPad } from "./CustomizedNumKeyBoard";

export function NegotiationModal({
  modalVisible,
  setModalVisible,
  text,
  setText,
}) {
  return (
    <Modal
      backdropColor="black"
      backdropOpacity={0.2}
      isVisible={modalVisible}
      onBackdropPress={() => setModalVisible(false)}
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={[styles.textStyle, { marginBottom: 30 }]}>
            What price do you want to propose?
          </Text>
          <NumberPad
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            originalText={text}
            setOriginalText={setText}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    alignItems: "center",
    height: "80%",
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
