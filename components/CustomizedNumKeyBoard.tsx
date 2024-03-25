import React, { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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
  const [input, setInput] = useState<string>(
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
    if (text === "<" && input !== "") {
      setInput((input: string) => input.slice(0, -1));
    } else if (
      text !== "<" &&
      (!input.includes(".") || text !== ".") &&
      (input !== "" || text !== ".") &&
      input.length < 7 // Max 7 characters including decimal point
    ) {
      // Check if adding the next number would exceed $1000.00
      const newInput = input + text;
      const newPrice = parseFloat(newInput);
      if (!isNaN(newPrice) && newPrice <= 1000) {
        setInput(newInput);
      }
    }
  };

  const onContinueClicked = () => {
    setModalVisible(!modalVisible);
    if (input !== "") {
      let tempt = parseFloat(input).toFixed(2); // Limit to two decimal places
      if (screen === "ChatBuyer") {
        setOriginalText(
          originalText.concat(
            "Hi! I'm interested in buying your " +
              productName +
              ", but would you be open to selling it for $" +
              tempt +
              "?"
          )
        );
        setHeight(120);
      } else if (screen === "ChatSeller") {
        setOriginalText(
          originalText.concat(
            "The lowest I can accept for this item would be $" + tempt + "."
          )
        );
        setHeight(80);
      } else if (
        screen === "NewPost" ||
        screen === "NewRequestMax" ||
        screen === "NewRequestMin"
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeInput("1")}
        >
          <Text style={styles.textStyle}>1 </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeInput("2")}
        >
          <Text style={styles.textStyle}>2 </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeInput("3")}
        >
          <Text style={styles.textStyle}>3 </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inner}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeInput("4")}
        >
          <Text style={styles.textStyle}>4 </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeInput("5")}
        >
          <Text style={styles.textStyle}>5 </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeInput("6")}
        >
          <Text style={styles.textStyle}>6 </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inner}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeInput("7")}
        >
          <Text style={styles.textStyle}>7 </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeInput("8")}
        >
          <Text style={styles.textStyle}>8 </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeInput("9")}
        >
          <Text style={styles.textStyle}>9 </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inner}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeInput(".")}
        >
          <Text style={styles.textStyle}>. </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeInput("0")}
        >
          <Text style={styles.textStyle}>0 </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeInput("<")}
        >
          <Text style={styles.textStyle}>&#60;</Text>
        </TouchableOpacity>
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
          onPress={onContinueClicked}
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
    height: "100%",
    justifyContent: "center",
    flex: 1,
  },
  textStyle: {
    fontFamily: "Rubik-Regular",
    fontSize: 20,
    color: "black",
    textAlign: "center",
    fontWeight: "700",
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
