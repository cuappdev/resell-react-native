import * as React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import { LogBox } from "react-native";
import { View } from "../components/Themed";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import { RootTabScreenProps } from "../types";
import { ButtonBanner } from "../components/ButtonBanner";
import {
  Actions,
  Bubble,
  GiftedChat,
  Message,
  MessageImage,
  MessageText,
} from "react-native-gifted-chat";
import { NegotiationModal } from "../components/NegotiationModal";
import { AntDesign } from "@expo/vector-icons";
import { AvaliabilityModal } from "../components/AvaliablitiyMatch";
import { AvaliabilityBubble } from "../components/AvaliabilityBubble";
// LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
// LogBox.ignoreAllLogs();
import * as ImagePicker from "expo-image-picker";
import { pressedOpacity } from "../constants/Values";
//import { IMessage } from "./CustomizedMessage";

export default function ChatWindow({ navigation }) {
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
  const [scheduleCallback, setScheduleCallback] = useState([]);
  const [isBubble, setIsBubble] = useState(false);
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

  const [messages, setMessages] = React.useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "Hello developer",

        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "",
        avaliability_id: 4,
        image: "",
        productName: "",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);
  const onSend = (newMessages = []) =>
    setMessages(GiftedChat.append(messages, newMessages));

  function renderMessage(props) {
    const {
      currentMessage: { text: currText },
    } = props;
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
    const { currentMessage } = props;
    const { text: currText } = currentMessage;

    if (currText == undefined || currText.length > 0) {
      return (
        <View style={{ marginVertical: 10 }}>
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
    } else {
      return (
        <View
          style={{ width: "80%", alignItems: "flex-end", marginVertical: 10 }}
        >
          <AvaliabilityBubble
            userName={"Jessie"}
            setIsBubble={setIsBubble}
            setAvailabilityVisible={setAvailabilityVisible}
          />
        </View>
      );
    }
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
          setIsBubble={setIsBubble}
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
              {
                flexDirection: "row",
              },
              isSendingAvalibility
                ? { alignItems: "flex-start" }
                : { alignItems: "center" },
              {
                height: Math.min(Math.max(50, height + 25), 140),
              },
            ]}
          >
            {!isSendingAvalibility && (
              <TextInput
                style={[
                  {
                    width: "85%",
                    paddingTop: 10,
                    paddingLeft: 10,
                    paddingBottom: 10,
                    fontSize: 18,
                    color: "#000000",
                  },
                ]}
                onChangeText={(text) => {
                  if (!isSendingAvalibility) {
                    setText(text);
                  }
                }}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    setIsSendingAvaliability(false);
                  }
                }}
                value={text}
                onContentSizeChange={(event) => {
                  setHeight(event.nativeEvent.contentSize.height);
                }}
                multiline={true}
              />
            )}
            {isSendingAvalibility && (
              <View
                style={{
                  height: 50,
                  marginStart: 12,
                  marginVertical: 10,
                  alignItems: "flex-start",
                  backgroundColor: "transparent",
                }}
              >
                <AvaliabilityBubble
                  userName={"jessie"}
                  setIsBubble={null}
                  setAvailabilityVisible={null}
                />
              </View>
            )}
            {(text.trim().length != 0 || isSendingAvalibility) && (
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
                  } else if (isSendingAvalibility) {
                    setIsSendingAvaliability(false);
                    props.onSend({ text: "" }, true);
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
          screen={"Chat"}
        />
        <AvaliabilityModal
          scheduleCallback={scheduleCallback}
          setScheduleCallback={setScheduleCallback}
          availabilityVisible={availabilityVisible}
          setAvailabilityVisible={setAvailabilityVisible}
          setIsSendingAvaliability={setIsSendingAvaliability}
          isBubble={isBubble}
          setIsBubble={setIsBubble}
          setHeight={setHeight}
          username={"Jessie"}
        />
      </SafeAreaView>
    );
  }
  const renderMessageText = (props) => {
    const { currentMessage } = props;
    const { text: currText } = currentMessage;

    if (currText != undefined && currText.length > 0) {
      return <MessageText {...props} />;
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        height: "100%",
        padding: 0,
        paddingBottom: 60 + Math.min(Math.max(50, height + 25), 140),
      }}
    >
      <View
        style={{
          width: "100%",
          marginTop: 40,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          activeOpacity={pressedOpacity}
          style={{
            marginRight: 20,
            position: "absolute",
            top: 10,
            zIndex: 1,
          }}
          onPress={() => navigation.goBack()}
        >
          <Feather
            name="chevron-left"
            size={28}
            color="#B2B2B2"
            style={{ marginStart: 18 }}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text style={styles.chatHeader}>Blue Pants</Text>
          <Text style={styles.chatSubheader}>shop by lia</Text>
        </View>
      </View>

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
        bottomOffset={10}
        renderMessage={renderMessage}
        scrollToBottom={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filter: {
    opacity: 3,
  },
  input: {
    width: "85%",
    height: 60,
    margin: 12,
    backgroundColor: "#F4F4F4",
    borderRadius: 15,
    marginTop: 0,
  },
  chatHeader: {
    fontFamily: "Rubik-Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 24,
    color: "#000000",
    textAlign: "center",
  },
  chatSubheader: {
    fontFamily: "Rubik-Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    color: "#787878",
    textAlign: "center",
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
