import React, { useState } from "react";

import {
  Alert,
  StyleSheet,
  Text,
  Pressable,
  View,
  Button,
  TextInput,
  Keyboard,
} from "react-native";
export function NumberPad({
  modalVisible,
  setModalVisible,
  originalText,
  setOriginalText,
}) {
  const [input, setInput] = useState("");
  const changeInput = (text) => {
    if (text == "<" && input != "") {
      setInput(input.slice(0, -1));
    } else if (
      text != "<" &&
      (!input.includes(".") || text != ".") &&
      (input != "" || text != ".")
    ) {
      setInput(input.concat(text));
    }
  };
  const onContinueClicked = (original: string) => {
    setModalVisible(!modalVisible);
    if (input != "") {
      setOriginalText(
        original.concat(
          "Hi! I'm interested in buying your Blue Pants, but would you be open to selling it for $" +
            input +
            "?"
        )
      );
    }
  };
  return (
    <View style={styles.outer}>
      <View
        style={{ flexDirection: "row", marginBottom: 36, alignItems: "center" }}
      >
        <Text style={{ fontFamily: "Roboto-Medium", fontSize: 40 }}>$</Text>
        <TextInput
          onFocus={() => Keyboard.dismiss()}
          autoFocus={true}
          value={input}
          style={styles.input}
          editable={false}
          showSoftInputOnFocus={false}
        />
      </View>
      <View style={styles.inner}>
        <Pressable style={styles.button} onPress={() => changeInput("1")}>
          <Text style={styles.textStyle}>1 </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => changeInput("2")}>
          <Text style={styles.textStyle}>2 </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => changeInput("3")}>
          <Text style={styles.textStyle}>3 </Text>
        </Pressable>
      </View>
      <View style={styles.inner}>
        <Pressable style={styles.button} onPress={() => changeInput("4")}>
          <Text style={styles.textStyle}>4 </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => changeInput("5")}>
          <Text style={styles.textStyle}>5 </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => changeInput("6")}>
          <Text style={styles.textStyle}>6 </Text>
        </Pressable>
      </View>
      <View style={styles.inner}>
        <Pressable style={styles.button} onPress={() => changeInput("7")}>
          <Text style={styles.textStyle}>7 </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => changeInput("8")}>
          <Text style={styles.textStyle}>8 </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => changeInput("9")}>
          <Text style={styles.textStyle}>9 </Text>
        </Pressable>
      </View>
      <View style={styles.inner}>
        <Pressable style={styles.button} onPress={() => changeInput(".")}>
          <Text style={styles.textStyle}>. </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => changeInput("0")}>
          <Text style={styles.textStyle}>0 </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => changeInput("<")}>
          <Text style={styles.textStyle}>&#60;</Text>
        </Pressable>
      </View>
      <Pressable
        style={[styles.buttonContinue]}
        onPress={() => onContinueClicked(originalText)}
      >
        <Text style={styles.textStyleContinue}>Continue</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  outer: {
    width: "100%",

    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  inner: {
    flex: 1,
    width: "100%",

    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    backgroundColor: "transparent",
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
    fontSize: 24,
    color: "black",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  textStyleContinue: {
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
  input: {
    width: 180,
    height: 80,
    margin: 12,
    padding: 10,
    backgroundColor: "#F4F4F4",
    borderRadius: 20,
    marginTop: 0,
    fontSize: 18,
    color: "#000000",
  },
});
