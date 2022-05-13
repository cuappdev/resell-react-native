import * as React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
} from "react-native";
import { View } from "../components/Themed";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useState, useEffect, useRef, useCallback } from "react";
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
import { auth, chatRef, db, historyRef } from "../config/firebase";
import ProductCard from "../components/ProductCard";
import { json } from "stream/consumers";

export default function ChatWindow({ navigation, route }) {
  const { email, name, receiverImage, post, isBuyer } = route.params;
  //console.log(post);
  const [text, setText] = useState("");
  const [height, setHeight] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(false);

  const yourRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [availabilityVisible, setAvailabilityVisible] = useState(false);
  const [isSendingAvailability, setIsSendingAvailability] = useState(false);
  const [inputSchedule, setInputSchedule] = useState([]);
  const [scheduleCallback, setScheduleCallback] = useState([]);
  const [isBubble, setIsBubble] = useState(false);
  const [count, setCount] = useState(0);
  const [uri, setUri] = useState("");

  const [mCount, setmCount] = useState(0);

  const [messages, setMessages] = React.useState([]);

  useEffect(() => {
    if (isSendingAvailability) setText("");
  }, [isSendingAvailability]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, text, availability, image, product, createdAt, user } =
      messages[0];
    var recentMessage = "";
    if (text.length > 0) {
      recentMessage = text;
    } else if (availability[0] != undefined) {
      recentMessage = "[Availability]";
    } else if (product.title != undefined) {
      recentMessage = "[Product: " + product.title + "]";
    } else if (image != "") {
      recentMessage = "[Image]";
    }

    historyRef
      .doc(isBuyer ? auth?.currentUser?.email : email)
      .collection("sellers")
      .doc(isBuyer ? email : auth?.currentUser?.email)
      .set({
        item: post,
        recentMessage: recentMessage,
        recentSender: auth?.currentUser?.email,
        name: isBuyer ? name : auth?.currentUser?.displayName,
        image: isBuyer ? receiverImage : auth?.currentUser?.photoURL,
        viewed: isBuyer,
      });
    historyRef
      .doc(isBuyer ? email : auth?.currentUser?.email)
      .collection("buyers")
      .doc(isBuyer ? auth?.currentUser?.email : email)
      .set({
        item: post,
        recentMessage: recentMessage,
        recentSender: auth?.currentUser?.email,
        name: isBuyer ? auth?.currentUser?.displayName : name,
        image: isBuyer ? auth?.currentUser?.photoURL : receiverImage,
        viewed: !isBuyer,
      });
    const messageRef = chatRef
      .doc(isBuyer ? auth?.currentUser?.email : email)
      .collection(isBuyer ? email : auth?.currentUser?.email);

    messageRef.add({
      _id,
      text,
      availability,
      image,
      product,
      createdAt,
      user,
    });
  }, []);
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
  const [availabilityUsername, setAvailabilityUserName] = useState("");

  function renderBubble(props) {
    const { currentMessage } = props;
    const { text: currText } = currentMessage;
    const { availability: currAvailability } = currentMessage;
    const { user: currUser } = currentMessage;
    const { image: currImage } = currentMessage;

    const { product: currPost } = currentMessage;
    if (currText.length > 0) {
      return (
        <View style={{ marginVertical: 5 }}>
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
    } else if (currAvailability[0] != undefined) {
      return (
        <View style={{ width: "70%", marginVertical: 5 }}>
          <AvailabilityBubble
            userName={
              currUser._id == auth?.currentUser?.email
                ? auth?.currentUser?.displayName
                : name
            }
            setAvailabilityUserName={setAvailabilityUserName}
            setIsBubble={setIsBubble}
            setAvailabilityVisible={setAvailabilityVisible}
            setInputSchedule={setInputSchedule}
            schedule={currAvailability}
          />
        </View>
      );
    } else if (currPost.title != undefined) {
      return (
        <View style={{ width: "50%", marginVertical: 5 }}>
          <ProductCard
            title={currPost.title}
            price={currPost.price}
            image={currPost.images ? post.images[0] : null}
          />
        </View>
      );
    } else if (currImage != "") {
      return (
        <View
          style={[
            { width: "50%", marginHorizontal: 10, marginVertical: 5 },
            currUser._id != auth?.currentUser?.email
              ? { alignItems: "flex-end" }
              : { alignItems: "flex-start" },
          ]}
        >
          <Image
            source={{ uri: currImage }}
            style={{
              width: "100%",
              minHeight: 200,
              resizeMode: "cover",
              marginHorizontal: 10,
              borderRadius: 5,
            }}
          />
        </View>
      );
    }
  }

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // quality: 0.5,
      // allowsEditing: true,
      // aspect: [3, 4],
    });
    if (!result.cancelled) {
      // console.log(result);
      setUri(result["uri"]);
      setModalVisibility(true);
    }
  };
  const saveandcompress = async (uri, props) => {
    const manipResult = await manipulateAsync(uri, [], {
      compress: 0.5,
      format: SaveFormat.JPEG,
      base64: true,
    });
    setUri("");
    postImage("data:image/jpeg;base64," + manipResult["base64"], props);
  };
  const postProduct = (props) => {
    props.onSend({
      _id: new Date().valueOf(),
      text: "",
      availability: {},
      image: "",
      product: post,
      createdAt: new Date(),
      user: {
        _id: email,
        name: name,
        avatar: receiverImage,
      },
    });
  };

  const postImage = (image, props) => {
    const Json = JSON.stringify({
      imageBase64: image,
    });
    //console.log(Jzzzson);
    fetch("https://resell-dev.cornellappdev.com/api/image/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: Json,
    })
      .then(function (response) {
        // alert(JSON.stringify(response));
        if (!response.ok) {
          let error = new Error(response.statusText);
          throw error;
        } else {
          return response.json();
        }
      })
      .then(async function (data) {
        if (mCount == 0) {
          setmCount(1);
          postProduct(props);
        }

        props.onSend({
          _id: new Date().valueOf(),
          text: "",
          availability: {},
          image: data.image,
          product: {},
          createdAt: new Date(),
          user: {
            _id: email,
            name: name,
            avatar: receiverImage,
          },
        });
      })
      .catch((error) => {
        //alert(error.message);
      });
  };
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    const unsubscribe = chatRef
      .doc(isBuyer ? auth?.currentUser?.email : email)
      .collection(isBuyer ? email : auth?.currentUser.email)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            text: doc.data().text,
            availability: doc.data().availability,
            product: doc.data().product,
            image: doc.data().image,
            createdAt: doc.data().createdAt.toDate(),
            user: doc.data().user,
          }))
        );
      });
    return () => unsubscribe();
  }, []);

  function renderInputToolbar(props) {
    return (
      <SafeAreaView style={styles.filter}>
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
              saveandcompress(result.uri, props);
            }}
            mode="full"
          />
        )}
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
                    setScheduleCallback([]);
                  }
                }}
                value={text}
                clearTextOnFocus={true}
                onContentSizeChange={(event) => {
                  setHeight(event.nativeEvent.contentSize.height);
                }}
                multiline={true}
              />
            )}
            {isSendingAvailability && (
              <View
                style={{
                  height: "100%",
                  marginStart: 12,
                  marginVertical: 10,
                  alignItems: "flex-start",
                  backgroundColor: "transparent",
                  flexDirection: "column",
                }}
              >
                <AvailabilityBubble
                  userName={auth?.currentUser?.displayName}
                  setIsBubble={null}
                  setAvailabilityVisible={null}
                  setInputSchedule={null}
                  schedule={null}
                  setAvailabilityUserName={null}
                />
                <TextInput
                  style={{
                    width: "85%",
                    paddingHorizontal: 10,
                    fontSize: 18,
                    color: "#000000",
                    height: 50,
                  }}
                  value={""}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === "Backspace")
                      setIsSendingAvailability(false);
                  }}
                  onChangeText={(text) => {
                    setPlaceholder("");
                  }}
                />
              </View>
            )}

            <View />
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
                  if (mCount == 0) {
                    setmCount(1);
                    postProduct(props);
                  }

                  if (text.length > 0 && text.trim().length > 0) {
                    props.onSend(
                      {
                        _id: new Date().valueOf(),
                        text: text,
                        availability: {},
                        image: "",
                        product: {},
                        createdAt: new Date(),
                        user: {
                          _id: email,
                          name: name,
                          avatar: receiverImage,
                        },
                      },

                      true
                    );
                    setText("");
                    setTimeout(() => {
                      yourRef.current.scrollToBottom();
                    }, 100);
                  } else if (isSendingAvailability) {
                    setIsSendingAvailability(false);
                    if (scheduleCallback) {
                      props.onSend(
                        {
                          _id: new Date().valueOf(),
                          text: text,
                          availability: scheduleCallback,
                          image: "",
                          product: {},
                          createdAt: new Date(),
                          user: {
                            _id: email,
                            name: name,
                            avatar: receiverImage,
                          },
                        },
                        true
                      );
                      setScheduleCallback([]);
                    }
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
          bubbleInput={inputSchedule}
          setScheduleCallback={setScheduleCallback}
          availabilityVisible={availabilityVisible}
          setAvailabilityVisible={setAvailabilityVisible}
          setIsSendingAvailability={setIsSendingAvailability}
          isBubble={isBubble}
          setIsBubble={setIsBubble}
          setHeight={setHeight}
          username={availabilityUsername}
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
          marginTop: Platform.OS === "ios" ? 35 : 0,
          marginBottom: 10,
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
          <Text style={styles.chatHeader}>{post.title}</Text>
          <Text style={styles.chatSubheader}>{name}</Text>
        </View>
      </View>

      <GiftedChat
        {...{ messages, onSend }}
        user={{
          _id: auth?.currentUser?.email,
          name: auth?.currentUser?.displayName,
          avatar: auth?.currentUser?.photoURL,
        }}
        showAvatarForEveryMessage={true}
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
      <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={80} />
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
  // { id: 3, title: "Ask For Refund" },
];
