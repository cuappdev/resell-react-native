import React from "react";
import Modal from "react-native-modal";

import { StyleSheet, Text, View } from "react-native";
import { NumberPad } from "./CustomizedNumKeyBoard";
import { NegotiationProductBubble } from "./NegotationProductModal";

export function NegotiationModal({
  modalVisible,
  setModalVisible,
  text,
  setText,
  itemName,
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
        <View
          style={{
            width: "100%",
            marginBottom: 20,
            elevation: 5,
            alignItems: "center",
          }}
        >
          <NegotiationProductBubble
            product={"Blue Pants"}
            price={"14.00"}
            image={require("../assets/images/Pants.png")}
          />
        </View>
        <View style={styles.modalView}>
          <Text style={[styles.textStyle, { marginBottom: 24 }]}>
            What price do you want to propose?
          </Text>
          <NumberPad
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            originalText={text}
            setOriginalText={setText}
            itemName={itemName}
          />
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
    height: "85%",
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
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
