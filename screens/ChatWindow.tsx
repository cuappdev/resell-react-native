import * as React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { View } from "../components/Themed";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import { ButtonBanner } from "../components/ButtonBanner";
import {
  Bubble,
  GiftedChat,
  Message,
  MessageText,
} from "react-native-gifted-chat";
import { NegotiationModal } from "../components/NegotiationModal";
import { AntDesign } from "@expo/vector-icons";
import { AvailabilityModal } from "../components/AvailabilityMatch";
import { AvailabilityBubble } from "../components/AvailabilityBubble";
// LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
// LogBox.ignoreAllLogs();
import { ImageEditor } from "expo-image-editor";

import * as ImagePicker from "expo-image-picker";
import { pressedOpacity } from "../constants/Values";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
// import {
//   collection,
//   addDoc,
//   orderBy,
//   query,
//   onSnapshot,
// } from "firebase/firestore";

// import { auth, database } from "../config/firebase";
// import { firestore } from "../config/firebase";

// const userCollection = firestore.collection("users");

export default function ChatWindow({ navigation, route }) {
  const { item, seller, post } = route.params;
  //console.log(post);
  const [text, setText] = useState("");
  const [height, setHeight] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(false);

  const yourRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [availabilityVisible, setAvailabilityVisible] = useState(false);
  const [isSendingAvailability, setIsSendingAvailability] = useState(false);
  const [scheduleCallback, setScheduleCallback] = useState([]);
  const [isBubble, setIsBubble] = useState(false);
  const [count, setCount] = useState(0);
  const [uri, setUri] = useState("");

  const [messages, setMessages] = React.useState([]);
  useEffect(() => {
    setMessages([
      // {
      //   _id: 1,
      //   text: "Hello developer",
      //   createdAt: new Date(),
      //   user: {
      //     _id: 2,
      //     name: "React Native",
      //     avatar: "https://placeimg.com/140/140/any",
      //   },
      // },
      // {
      //   _id: 2,
      //   text: "Hello developer",
      //   createdAt: new Date(),
      //   user: {
      //     _id: 1,
      //     name: "React Native",
      //     avatar: "https://placeimg.com/140/140/any",
      //   },
      // },
      // {
      //   _id: 2,
      //   text: "",
      //   avaliability_id: 4,
      //   image: "",
      //   productName: "",
      //   createdAt: new Date(),
      //   user: {
      //     _id: 1,
      //     name: "React Native",
      //     avatar: "https://placeimg.com/140/140/any",
      //   },
      // },
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
          <AvailabilityBubble
            userName={"Jessie"}
            setIsBubble={setIsBubble}
            setAvailabilityVisible={setAvailabilityVisible}
          />
        </View>
      );
    }
  }

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) {
      // console.log(result);
      setUri(result["uri"]);
      setModalVisibility(true);
    }
  };
  const saveandcompress = async (uri) => {
    const manipResult = await manipulateAsync(uri, [], {
      compress: 0.5,
      format: SaveFormat.JPEG,
      base64: true,
    });
    setUri("");
    if (image.length < 7) {
      setImage([
        ...image.slice(0, -1),
        "data:image/jpeg;base64," + manipResult["base64"],
        "",
      ]);
    } else {
      setImage([
        ...image.slice(0, -1),
        "data:image/jpeg;base64," + manipResult["base64"],
      ]);
    }
  };

  // useEffect(() => {
  //   const collectionRef = collection(database, "chats");
  //   const q = query(collectionRef, orderBy("createdAt", "desc"));

  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     setMessages(
  //       querySnapshot.docs.map((doc) => ({
  //         _id: doc.data()._id,
  //         createdAt: doc.data().createdAt.toDate(),
  //         text: doc.data().text,
  //         user: doc.data().user,
  //       }))
  //     );
  //   });

  //   return () => unsubscribe();
  // }, []);

  // const onSend = useCallback((messages = []) => {
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, messages)
  //   );
  //   const { _id, createdAt, text, user } = messages[0];
  //   addDoc(collection(database, "chats"), {
  //     _id,
  //     createdAt,
  //     text,
  //     user,
  //   });
  // }, []);
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
            onPress={() => pickImage()}
          >
            <AntDesign name="picture" size={25} color="#707070" />
          </TouchableOpacity>

          <SafeAreaView
            style={[
              styles.input,
              {
                flexDirection: "row",
              },
              isSendingAvailability
                ? { alignItems: "flex-start" }
                : { alignItems: "center" },
              {
                height: Math.min(Math.max(50, height + 25), 140),
              },
            ]}
          >
            {!isSendingAvailability && (
              <TextInput
                style={[
                  {
                    width: "85%",
                    paddingHorizontal: 10,
                    fontSize: 18,
                    color: "#000000",
                  },
                ]}
                onChangeText={(text) => {
                  if (!isSendingAvailability) {
                    setText(text);
                  }
                }}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    setIsSendingAvailability(false);
                  }
                }}
                value={text}
                onContentSizeChange={(event) => {
                  setHeight(event.nativeEvent.contentSize.height);
                }}
                multiline={true}
              />
            )}
            {isSendingAvailability && (
              <View
                style={{
                  height: 50,
                  marginStart: 12,
                  marginVertical: 10,
                  alignItems: "flex-start",
                  backgroundColor: "transparent",
                }}
              >
                <AvailabilityBubble
                  userName={"jessie"}
                  setIsBubble={null}
                  setAvailabilityVisible={null}
                />
              </View>
            )}
            {(text.trim().length != 0 || isSendingAvailability) && (
              <TouchableOpacity
                style={{
                  marginRight: 10,
                  marginLeft: "auto",
                  marginTop: "auto",
                  marginBottom: 10,
                  zIndex: 10,
                }}
                onPress={() => {
                  setHeight(38);

                  if (text.length > 0 && text.trim().length > 0) {
                    props.onSend({ text: text }, true);
                    setText("");
                    setTimeout(() => {
                      yourRef.current.scrollToBottom();
                    }, 100);
                  } else if (isSendingAvailability) {
                    setIsSendingAvailability(false);
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
          post={post}
        />
        <AvailabilityModal
          scheduleCallback={scheduleCallback}
          setScheduleCallback={setScheduleCallback}
          availabilityVisible={availabilityVisible}
          setAvailabilityVisible={setAvailabilityVisible}
          setIsSendingAvailability={setIsSendingAvailability}
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
          <Text style={styles.chatHeader}>{item}</Text>
          <Text style={styles.chatSubheader}>{seller}</Text>
        </View>
      </View>
      {uri != "" && (
        <ImageEditor
          visible={modalVisibility}
          onCloseEditor={() => {
            setModalVisibility(false);
            setUri("");
          }}
          imageUri={uri}
          minimumCropDimensions={{
            width: 100,
            height: 100,
          }}
          onEditingComplete={(result) => {
            saveandcompress(result.uri);
          }}
          mode="full"
        />
      )}
      <View />

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
        minInputToolbarHeight={100 + Math.min(Math.max(50, height + 25), 140)}
        renderMessage={renderMessage}
        scrollToBottom={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filter: {
    opacity: 3,
    justifyContent: "flex-start",
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
