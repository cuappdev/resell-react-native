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
  Actions,
  Bubble,
  GiftedChat,
  IMessage,
  Message,
  MessageText,
} from "react-native-gifted-chat";
import { NegotiationModal } from "../components/NegotiationModal";
import { AntDesign } from "@expo/vector-icons";

import { AvaliabilityModal } from "../components/AvaliablitiyMatch";
import { AvaliabilityBubble } from "../components/AvaliabilityBubble";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();
import * as ImagePicker from "expo-image-picker";

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
  const [height, setHeight] = useState(0);

  const yourRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [availabilityVisible, setAvailabilityVisible] = useState(false);
  const [isSendingAvalibility, setIsSendingAvaliability] = useState(false);

  const [count, setCount] = useState(0);

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

  const [messages, setMessages] = React.useState<IMessage[]>([
    {
      _id: 1,
      text: "Let me know if you have more questions on our product",
      createdAt: new Date(),
      user: {
        _id: 4,
        name: "GiftedChat",
        avatar: "https://picsum.photos/id/1003/200/300",
      },
    },
    {
      _id: 2,
      text: "How was your day",
      createdAt: new Date(),
      user: {
        _id: 5,
        name: "GiftedChat",
        avatar: "https://picsum.photos/id/1003/200/300",
      },
    },
    {
      _id: 3,
      text: "Hello",
      createdAt: new Date(),
      user: {
        _id: 6,
        name: "GiftedChat",
        avatar: "https://picsum.photos/id/1003/200/300",
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
      <View>
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
      </View>
    );
  }

  const [image, setImage] = useState(null);

  const pickImage = async (props) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      props.onSend({ image: result.uri }, true);
    }
  };
  function renderInputToolbar(props) {
    return (
      <SafeAreaView style={styles.filter}>
        <ButtonBanner
          count={count}
          setCount={setCount}
          data={FILTER}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          availabilityVisible={availabilityVisible}
          setAvailabilityVisible={setAvailabilityVisible}
          alwaysColor={true}
        />

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              marginLeft: 15,
              marginTop: "auto",
              marginBottom: 20,
            }}
            onPress={() => pickImage(props)}
          >
            <AntDesign name="picture" size={25} color="#707070" />
          </TouchableOpacity>

          <SafeAreaView
            style={[
              styles.input,
              { flexDirection: "row" },
              {
                height: Math.min(Math.max(50, height + 25), 140),
              },
            ]}
          >
            <TextInput
              style={[
                {
                  width: "85%",
                  paddingTop: 15,
                  paddingLeft: 10,
                  fontSize: 18,
                  color: "#000000",
                  paddingBottom: 15,
                },
              ]}
              onChangeText={(text) => setText(text)}
              value={text}
              onContentSizeChange={(event) => {
                setHeight(event.nativeEvent.contentSize.height);
              }}
              multiline={true}
            />
            {text.trim().length != 0 && (
              <TouchableOpacity
                style={{
                  marginRight: 10,
                  marginLeft: "auto",
                  marginTop: "auto",
                  marginBottom: 10,
                }}
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
                  size={25}
                  color="#9E70F6"
                />
              </TouchableOpacity>
            )}
          </SafeAreaView>
        </View>
        <NegotiationModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          text={text}
          setText={setText}
        />
        <AvaliabilityModal
          availabilityVisible={availabilityVisible}
          setAvailabilityVisible={setAvailabilityVisible}
          setIsSendingAvaliability={setIsSendingAvaliability}
        />
      </SafeAreaView>
    );
  }
  const renderMessageText = (props) => {
    // const { currentMessage } = props;
    // const { text: currText } = currentMessage;
    // if (currText.text == "") {
    //   setIsSendingAvaliability(false);

    //   return <AvaliabilityBubble userName={"jessie"} schedule={[]} />;
    // } else if (currText.text != "")
    return <MessageText {...props} />;
  };

  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        height: "100%",
        padding: 0,
        paddingBottom: 135 + Math.min(Math.max(50, height + 25), 140),
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
        renderMessageText={renderMessageText}
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
    marginBottom: -60,
    opacity: 3,
  },
  input: {
    width: "85%",
    height: 60,
    margin: 12,
    backgroundColor: "#F4F4F4",
    borderRadius: 20,
    marginTop: 0,
  },
});
const FILTER = [
  {
    id: 0,
    title: "Negotiate",
  },
  {
    id: 1,
    title: "Send Availablity",
  },
  { id: 2, title: "Pay with Venmo" },
  { id: 3, title: "Ask For Refund" },
];
