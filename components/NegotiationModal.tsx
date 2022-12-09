import React from "react";
import Modal from "react-native-modal";

import { Dimensions, StyleSheet, Text, View } from "react-native";
import { NumberPad } from "./CustomizedNumKeyBoard";
import { NegotiationProductBubble } from "./NegotationProductModal";
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
  setHeight,
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

        if (
          (screen === "NewPost" ||
            screen == "NewRequestMax" ||
            screen == "NewRequestMin") &&
          text.length > 0 &&
          text.slice(0, 1) != "$"
        ) {
          setText("$".concat(text));
        }
      }}
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View
        style={[
          styles.centeredView,
          screen === "NewPost" ||
          screen == "NewRequestMax" ||
          screen == "NewRequestMin"
            ? { height: modalHeight }
            : { height: "85%" },

          screen == "NewRequestMax" && {
            alignItems: "flex-end",
          },
        ]}
      >
        {(screen === "ChatBuyer" || screen === "ChatSeller") && (
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
        {screen == "NewRequestMax" && (
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              width: "35%",
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
            <Text
              style={{
                fontFamily: "Rubik-Regular",
                fontSize: 14,
                position: "absolute",
                right: 16,
                bottom: 7,
              }}
            >
              max
            </Text>
          </View>
        )}
        {screen == "NewRequestMin" && (
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              width: screen === "NewPost" ? 120 : "35%",
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
            <Text
              style={{
                fontFamily: "Rubik-Regular",
                fontSize: 14,
                position: "absolute",
                right: 16,
                bottom: 7,
              }}
            >
              min
            </Text>
          </View>
        )}
        {(screen === "NewPost" ||
          screen == "NewRequestMax" ||
          screen == "NewRequestMin") && (
          <View style={styles.modalView}>
            {screen === "NewPost" && (
              <Text style={[styles.textStyle, { marginBottom: 24 }]}>
                What price do you want to sell your product?
              </Text>
            )}
            {screen === "NewRequestMin" && (
              <Text style={[styles.textStyle, { marginBottom: 24 }]}>
                What's the minimum of your prefered price range?
              </Text>
            )}
            {screen === "NewRequestMax" && (
              <Text style={[styles.textStyle, { marginBottom: 24 }]}>
                What's the maximum of your prefered price range?{" "}
              </Text>
            )}
            <NumberPad
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              originalText={text}
              setOriginalText={setText}
              screen={screen}
              productName={undefined}
              setHeight={setHeight}
            />
          </View>
        )}

        {(screen === "ChatBuyer" || screen === "ChatSeller") && (
          <View style={styles.modalView}>
            <Text style={[styles.textStyle, { marginBottom: 24 }]}>
              What price do you want to negotiate for?
            </Text>
            <NumberPad
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              originalText={text}
              setOriginalText={setText}
              screen={screen}
              productName={post.title}
              setHeight={setHeight}
            />
          </View>
        )}
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
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 0,
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
    fontFamily: "Rubik-Regular",
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
