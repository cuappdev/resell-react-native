import * as React from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  TextInput,
} from "react-native";
import { LogBox } from "react-native";
import { View } from "../components/Themed";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import { RootTabScreenProps } from "../types";
import { ButtonBanner } from "../components/ButtonBanner";
// LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
// LogBox.ignoreAllLogs();

export default function ChatScreen({
  navigation,
}: RootTabScreenProps<"ChatTab">) {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const onKeyboardShow = (event) =>
    setKeyboardOffset(event.endCoordinates.height);
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef(null);
  const keyboardDidHideListener = useRef(null);

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener(
      "keyboardWillShow",
      onKeyboardShow
    );
    keyboardDidHideListener.current = Keyboard.addListener(
      "keyboardWillHide",
      onKeyboardHide
    );

    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);

  const [count, setCount] = useState(0);

  return (
    <View
      style={{
        backgroundColor: "#F9F9F9",
        height: "100%",
        padding: 0,
        paddingBottom: 75,
      }}
    >
      <SafeAreaView style={styles.filter}>
        <ButtonBanner count={count} setCount={setCount} data={FILTER} />
        <SafeAreaView style={{ flexDirection: "row" }}>
          <TextInput
            style={[styles.input, { marginBottom: keyboardOffset - 75 }]}
          />
          <TouchableOpacity style={{ margin: 15 }} onPress={Keyboard.dismiss}>
            <FontAwesome5 name="arrow-circle-up" size={30} color="#878787" />
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  filter: {
    marginTop: "auto",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    margin: 12,
    padding: 10,
    opacity: 0.6,
    backgroundColor: "#dedede",
    borderRadius: 100,
  },
});
const FILTER = [
  {
    id: 0,
    title: "Negotiate",
  },
  {
    id: 1,
    title: "Send Avaliablity",
  },
  { id: 2, title: "Pay with Venmo" },
  { id: 3, title: "Ask For Refund" },
];
