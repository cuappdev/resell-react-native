import React from "react";
import Modal from "react-native-modal";

import { Dimensions, StyleSheet, Text, View } from "react-native";
import { NumberPad } from "./CustomizedNumKeyBoard";
import { NegotiationProductBubble } from "./NegotationProductModal";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
const windowHeight = Dimensions.get("window").height;
import { Platform, NativeModules } from "react-native";
const { StatusBarManager } = NativeModules;
const modalHeight =
  Platform.OS === "ios" ? windowHeight - 212 - 35 : windowHeight - 212;
export function NegotiationModal({
  modalVisible,
  setModalVisible,
  text,
  setText,
  screen,
  post,
}) {
  return (
    <Modal
      backdropColor="black"
      backdropOpacity={0.2}
      isVisible={modalVisible}
      onBackdropPress={() => {
        setModalVisible(false);
        if (text.length > 0 && text.slice(0, 1) != "$") {
          setText("$".concat(text));
        }
      }}
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View
        style={[
          styles.centeredView,
          screen === "NewPost" ? { height: modalHeight } : { height: "85%" },
        ]}
      >
        {screen === "Chat" && (
          <View
            style={{
              width: "100%",
              elevation: 5,
              alignItems: "center",
            }}
          >
            <NegotiationProductBubble
              product={post.title}
              price={post.price}
              image={post.images[0]}
            />
          </View>
        )}
        {screen === "NewPost" && (
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              width: 120,
              height: 40,
              backgroundColor: "#F4F4F4",
              borderRadius: 10,
              marginHorizontal: 24,
            }}
          >
            <Text
              style={{
                fontFamily: "Rubik-Regular",
                fontSize: 18,
                color: "#707070",
              }}
            >
              {"$" + text}
            </Text>
          </View>
        )}
        <View style={styles.modalView}>
          <Text style={[styles.textStyle, { marginBottom: 24 }]}>
            What price do you want to propose?
          </Text>
          <NumberPad
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            originalText={text}
            setOriginalText={setText}
            screen={screen}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flexDirection: "column",
    width: "100%",
  },
  modalView: {
    flex: 1,
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
    marginTop: 20,
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
