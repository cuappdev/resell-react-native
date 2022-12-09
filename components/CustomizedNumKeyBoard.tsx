import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Button,
  TextInput,
  Keyboard,
} from "react-native";
import PurpleButton from "./PurpleButton";
export function NumberPad({
  modalVisible,
  setModalVisible,
  originalText,
  setOriginalText,
  screen,
  setHeight,
  productName,
}) {
  const [input, setInput] = useState(
    (screen === "NewPost" ||
      screen == "NewRequestMax" ||
      screen == "NewRequestMin") &&
      originalText.length > 0
      ? originalText.slice(1)
      : ""
  );
  useEffect(() => {
    if (
      screen === "NewPost" ||
      screen == "NewRequestMax" ||
      screen == "NewRequestMin"
    ) {
      setOriginalText(input);
    }
  }, [input]);
  const changeInput = (text) => {
    if (text == "<" && input != "") {
      setInput(input.slice(0, -1));
    } else if (
      text != "<" &&
      (!input.includes(".") || text != ".") &&
      (input != "" || text != ".") &&
      input.length < 7
    ) {
      setInput(input.concat(text));
    }
  };
  const onContinueClicked = (original: string) => {
    setModalVisible(!modalVisible);
    if (input != "") {
      const regex = new RegExp("^0+$");
      var tempt = "";
      if (regex.test(input)) {
        tempt = "0";
      } else if (input.endsWith(".")) {
        tempt = input.slice(0, -1);
      } else {
        tempt = input.replace(/^0+/, "");
      }
      if (screen == "ChatBuyer") {
        setOriginalText(
          original.concat(
            "Hi! I'm interested in buying your " +
              productName +
              ", but would you be open to selling it for $" +
              tempt +
              "?"
          )
        );
        setHeight(120);
      } else if (screen == "ChatSeller") {
        setOriginalText(
          original.concat(
            "The lowest I can accept for this item would be $" + tempt + "."
          )
        );
        setHeight(80);
      } else if (
        screen === "NewPost" ||
        screen == "NewRequestMax" ||
        screen == "NewRequestMin"
      ) {
        setOriginalText("$" + tempt);
      }
    }
  };
  return (
    <View style={styles.outer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "Rubik-Regular",
            fontSize: 45,
            color: "#707070",
          }}
        >
          $
        </Text>
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
      <View
        style={{
          alignItems: "center",
          position: "absolute",
          bottom: "3%",
          width: "100%",
        }}
      >
        <PurpleButton
          text={"Continue"}
          onPress={() => {
            onContinueClicked(originalText);
          }}
          enabled={true}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  outer: {
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 50,
  },
  inner: {
    flex: 1,
    width: "85%",

    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "30%",
    backgroundColor: "transparent",
    alignSelf: "center",
  },
  textStyle: {
    fontFamily: "Rubik-Regular",
    fontSize: 20,
    color: "black",
    textAlign: "center",
    fontWeight: "700",
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: 150,
    height: 70,
    marginHorizontal: 12,
    padding: 10,
    backgroundColor: "#F4F4F4",
    borderRadius: 20,
    fontSize: 36,
    color: "#000000",
  },
});
