import * as React from "react";
import {
  StyleSheet,
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
import {
  Bubble,
  GiftedChat,
  IMessage,
  Message,
} from "react-native-gifted-chat";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

export default function ChatScreen({
  navigation,
}: RootTabScreenProps<"ChatTab">) {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const onKeyboardShow = (event) =>
    setKeyboardOffset(event.endCoordinates.height);
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef(null);
  const keyboardDidHideListener = useRef(null);
  const [text, setText] = useState("");
  const yourRef = useRef(null);

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
  const [messages, setMessages] = React.useState<IMessage[]>([
    {
      _id: 1,
      text: "Hello developer",
      createdAt: new Date(),
      user: {
        _id: 4,
        name: "GiftedChat",
        avatar: "https://placeimg.com/140/140/any",
      },
    },
    {
      _id: 2,
      text: "Hello developer",
      createdAt: new Date(),
      user: {
        _id: 5,
        name: "GiftedChat",
        avatar: "https://placeimg.com/140/140/any",
      },
    },
    {
      _id: 3,
      text: "Hello developerewew/nwqqwqmscmlkdcccccccccccccccmxxxxxxxxxxxxxxxcsdcs",
      createdAt: new Date(),
      user: {
        _id: 6,
        name: "GiftedChat",
        avatar: "https://placeimg.com/140/140/any",
      },
    },
  ]);
  const onSend = (newMessages: IMessage[] = []) =>
    setMessages(GiftedChat.append(messages, newMessages));
  function renderMessage(props) {
    return (
      <Message
        {...props}
        containerStyle={{
          left: { marginVertical: 10 },
        }}
      />
    );
  }
  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#ECECEC",
            borderRadius: 12,
            padding: 6,
          },
          right: {
            backgroundColor: "#ECECEC",
            marginVertical: 10,
            borderRadius: 12,
            borderTopRightRadius: 12,
            padding: 6,
          },
        }}
        textStyle={{
          left: {
            color: "#000000",
            fontSize: 18,
          },
          right: {
            color: "#000000",
            fontSize: 18,
          },
        }}
        timeTextStyle={{
          left: {
            color: "gray",
          },
          right: {
            color: "gray",
          },
        }}
      />
    );
  }
  function renderInputToolbar(props) {
    return (
      <SafeAreaView style={styles.filter}>
        <ButtonBanner count={count} setCount={setCount} data={FILTER} />
        <SafeAreaView style={{ flexDirection: "row" }}>
          <TextInput
            style={[styles.input, { marginBottom: keyboardOffset - 125 }]}
            onChangeText={(text) => setText(text)}
            value={text}
            //multiline={true}
          />
          <TouchableOpacity
            style={{ marginRight: 20, marginLeft: "auto", marginTop: 2.5 }}
            onPress={() => {
              if (text.length > 0 && text.trim().length > 0) {
                props.onSend({ text: text }, true);
                setText("");
                setTimeout(() => {
                  yourRef.current.scrollToBottom();
                }, 100);
              }
            }}
          >
            <FontAwesome5
              name="arrow-circle-up"
              size={30}
              color={text.trim().length == 0 ? "#878787" : "#2C2C2C"}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    );
  }

  return (
    <View
      style={{
        backgroundColor: "#F9F9F9",
        height: "100%",
        padding: 0,
        paddingBottom: 170,
      }}
    >
      <GiftedChat
        {...{ messages, onSend }}
        user={{
          _id: 1,
        }}
        listViewProps={{
          keyboardDismissMode: "on-drag",
        }}
        ref={yourRef}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        bottomOffset={75}
        renderMessage={renderMessage}
        scrollToBottom={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filter: {
    marginBottom: -30,
    opacity: 3,
  },
  input: {
    width: "80%",
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: "#F4F4F4",
    borderRadius: 100,
    marginTop: 0,
    fontSize: 18,
    color: "#000000",
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
