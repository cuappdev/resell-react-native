import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import { ImageEditor } from "expo-image-editor";
import { Subscription } from "expo-modules-core";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  Clipboard,
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AvatarProps,
  Bubble,
  GiftedChat,
  IMessage,
  Message,
  MessageProps,
} from "react-native-gifted-chat";
import { ButtonBanner } from "../components/ButtonBanner";
import { AvailabilityBubble } from "../components/chat/AvailabilityBubble";
import { NegotiationModal } from "../components/chat/NegotiationModal";
import NoticeBanner from "../components/chat/NoticeBanner";

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import ImageViewer from "react-native-image-zoom-viewer";
import { useApiClient } from "../api/ApiClientProvider";
import BackButton from "../assets/svg-components/back_button";
import ProductCard from "../components/ProductCard";
import BottomSheetHandle from "../components/bottomSheet/BottomSheetHandle";
import { AvailabilityModal } from "../components/chat/AvailabilityMatch";
import ConfirmMeetingModal from "../components/chat/ConfirmMeetingModal";
import ConfirmedMeetingModal from "../components/chat/ConfirmedMeetingModal";
import MeetingDetailModal from "../components/chat/MeetingDetailModal";
import MeetingProposeModal from "../components/chat/MeetingProposeModal";
import SellerSyncModal from "../components/chat/SellerSyncModal";
import { auth, chatRef, historyRef, userRef } from "../config/firebase";
import { fonts } from "../globalStyle/globalFont";
import { makeToast } from "../utils/Toast";
import OptionsMenu from "../components/OptionsMenu";
import EllipsesIcon from "../assets/svg-components/ellipses";
import Modal2 from "react-native-modal";
import Layout, { menuBarTop } from "../constants/Layout";
import PopupSheet from "../components/PopupSheet";
import { sendNotification } from "../api/FirebaseNotificationManager";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// const triggerNotifications = async () => {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Check out these items! ",
//       body: "You got 5 items related to your request.",
//     },
//     trigger: { seconds: 2 },
//   });
// };

async function sendPushNotification(expoPushToken, title, body, data) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: title,
    body: body,
    data: data,
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      // TODO: Potential Future Alert to Send User to Settings Screen
      // alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    makeToast({
      message: "Must use physical device for Push Notifications",
      type: "ERROR",
    });
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
interface ChatWindowParams {
  email: string;
  name: string;
  receiverImage: string;
  post: any;
  isBuyer: boolean;
  screen: string;
  proposedTime: string;
  proposer: string;
  confirmedTime: string;
  proposedViewed: string;
  confirmedViewed: string;
}

export default function ChatWindow({ navigation, route }) {
  const {
    email,
    name,
    receiverImage,
    post,
    isBuyer,
    screen,
    proposedTime,
    proposer,
    confirmedTime,
    proposedViewed,
    confirmedViewed,
  }: ChatWindowParams = route.params;
  const [accessToken, setAccessToken] = useState("");
  const [text, setText] = useState("");
  const [height, setHeight] = useState(40);
  const [modalVisibility, setModalVisibility] = useState(false);

  const buyerEmail = isBuyer ? auth.currentUser.email : email;
  const sellerEmail = isBuyer ? email : auth.currentUser.email;

  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [blockModalVisibility, setBlockModalVisibility] = useState(false);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [imageURL, setImageURL] = useState<string>("");

  const [isSendingAvailability, setIsSendingAvailability] = useState(false);
  const [inputSchedule, setInputSchedule] = useState([]);
  const [scheduleCallback, setScheduleCallback] = useState([]);
  const [isBubble, setIsBubble] = useState(false);
  const [count, setCount] = useState(0);
  const [uri, setUri] = useState("");

  const [mCount, setmCount] = useState(screen === "product" ? 0 : 1);
  const [messages, setMessages] = React.useState<any[]>([]);

  const [selectedTime, setSelectedTime] = useState("");
  const [showConfirmNotice, setShowConfirmNotice] = useState(
    confirmedTime ? true : false
  );
  const [showProposeNotice, setShowProposeNotice] = useState(
    proposedTime && !confirmedTime ? true : false
  );
  const [meetingDetailVisible, setMeetingDetailVisible] = React.useState(false);
  const [meetingProposeVisible, setMeetingProposeVisible] =
    React.useState(false);
  const [confirmedMeetingVisible, setConfirmedMeetingVisible] =
    React.useState(false);
  const [SellerConfirmVisible, setSellerConfirmVisible] = React.useState(false);
  const [SellerSyncVisible, setSellerSyncVisible] = React.useState(false);
  interface notification {
    request;
  }

  // Bottom sheet setup
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // variables
  const snapPoints = useMemo(() => ["85%"], []);
  // callbacks
  const setAvailabilityVisible = useCallback((visible: boolean) => {
    console.log(`visible = ${visible}`);
    if (visible) {
      console.log(`presenting bottom sheet`);
      bottomSheetModalRef.current?.present();
    } else {
      console.log(`closing sheet`);
      bottomSheetModalRef.current?.close();
    }
  }, []);

  AsyncStorage.getItem("accessToken", (errs, result) => {
    if (!errs) {
      if (result !== null && result != undefined) {
        setAccessToken(result);
      }
    }
  });

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const apiClient = useApiClient();

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (isSendingAvailability && text.length > 0) {
      setPlaceholder(text);
      setText("");
    }
  }, [text, isSendingAvailability]);

  const onSend = useCallback(async (messages: any[] = []) => {
    //#region update histories
    var notifText = ""
    const { _id, text, availability, image, product, createdAt, user } =
      messages[0];
    var recentMessage = "";
    if (text.length > 0) {
      recentMessage = text;
      notifText = text
    } else if (availability[0] != undefined) {
      recentMessage = "[Availability]";
      notifText = "Sent their Avalability"
    } else if (product.title != undefined) {
      recentMessage = "[Product: " + product.title + "]";
    } else if (image != "") {
      recentMessage = "[Image]";
      notifText = "Sent an Image"
    }
    // In the buyer's history, track a new seller
    const buyerHistoryRef = doc(
      collection(doc(historyRef, buyerEmail), "sellers"),
      sellerEmail
    );
    // In the seller's history, track a new buyer
    const sellerHistoryRef = doc(
      collection(doc(historyRef, sellerEmail), "buyers"),
      buyerEmail
    );
    // the names for buyer and seller
    const buyersName = isBuyer ? auth.currentUser.displayName : name;
    const sellersName = isBuyer ? name : auth.currentUser.displayName;
    // images for buyer and seller
    const buyersImage = isBuyer ? auth.currentUser.photoURL : receiverImage;
    const sellersImage = isBuyer ? receiverImage : auth.currentUser.photoURL;

    const commonData = {
      item: post,
      recentMessage: recentMessage,
      recentMessageTime: new Date().toISOString(),
      recentSender: auth.currentUser.email,
      confirmedTime:
        confirmedTime == "" || confirmedTime == undefined ? "" : confirmedTime,
      confirmedViewed: confirmedViewed || false,
    };
    const buyerData = {
      ...commonData,
      name: sellersName,
      image: sellersImage,
      viewed: isBuyer,
    };
    const sellerData = {
      ...commonData,
      name: buyersName,
      image: buyersImage,
      viewed: !isBuyer,
    };

    setDoc(buyerHistoryRef, buyerData);
    setDoc(sellerHistoryRef, sellerData);
    //#endregion

    // Send new message to the db
    const messageRef = collection(doc(chatRef, buyerEmail), sellerEmail);
    addDoc(messageRef, {
      _id,
      text,
      availability,
      image,
      product,
      createdAt,
      user,
    });

    console.log(user)
    const docRef = doc(userRef, email)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      sendNotification(docSnap.data().fcmToken,
        user.name,
        notifText,
        "chat",
        {
          name,
          receiverImage,
          email,
          post,
          isBuyer,
          confirmedTime,
          confirmedViewed,
          proposedTime,
          proposedViewed,
          proposer,
        }
      )
    } else {
      console.log("No such document!");
    }

  }, []);
  function renderMessage(props: MessageProps<IMessage>) {
    if (props.currentMessage.image) {
      return (
        <>
          <Pressable
            onPress={() => {
              setImageURL(props.currentMessage.image);
            }}
          >
            <Message
              {...props}
              containerStyle={{
                left: { marginVertical: 10 },
              }}
            />
          </Pressable>
        </>
      );
    }
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

  const onReport = () => {
    setMenuVisible(false);
    navigation.navigate("ReportPost", {
      sellerName: name,
      sellerId: post.user.id,
      postId: post.id,
      userId: "userId",
    });
  };

  const onBlock = () => {
    setBlockModalVisibility(true)
  }

  const blockUser = async () => {
    const blocked = JSON.stringify({
      blocked: post.user.id,
    });
    try {
      const response = await apiClient.post("/user/block/", {
        blocked: "8f07199c-f61a-4a37-b590-3d5fbabd2886"
      });
      if (response.user) {
        console.log(`blocked user: ${JSON.stringify(response.user)}`);
        makeToast({ message: `Blocked ${name}` });
        setBlockModalVisibility(false)
        setMenuVisible(false)
        navigation.goBack()
      } else {
        makeToast({ message: "Error blocking user", type: "ERROR" });
      }
    } catch (e: unknown) { }
  }

  const menuItems = [
    { label: 'Report', iconName: 'flag', onPress: onReport },
    { label: 'Block', iconName: 'slash', onPress: onBlock },
  ];

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
                paddingVertical: 5,
                maxWidth: "80%",
                marginLeft: 5,
              },
              right: {
                backgroundColor: "#9E70F6",
                borderRadius: 12,
                borderTopRightRadius: 12,
                paddingVertical: 5,
                maxWidth: "80%",
                marginRight: 5,
              },
            }}
            textStyle={{
              left: [
                {
                  color: "#000000",
                },
                fonts.body2,
              ],
              right: [
                {
                  color: "#ffffff",
                  margin: 0,
                },
                fonts.body2,
              ],
            }}
            timeTextStyle={{
              left: {
                color: "gray",
              },
              right: {
                color: "white",
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
            price={currPost.altered_price}
            image={currPost.images ? post.images[0] : null}
            onPress={async () => {
              const res = await apiClient.get(
                `/post/isSaved/postId/${currPost.id}`
              );
              if (res.isSaved !== undefined) {
                navigation.navigate("ProductHome", {
                  post: currPost,
                  screen: screen,
                  savedInitial: res.isSaved,
                });
              } else {
                makeToast({
                  message: "Failed to open item details",
                  type: "ERROR",
                });
              }
            }}
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
              borderRadius: 8,
            }}
          />
        </View>
      );
    }
  }

  function renderAvatar(props: AvatarProps<IMessage>): ReactNode {
    return (
      <Image
        source={{ uri: String(props.currentMessage.user.avatar) }}
        style={{ width: 32, height: 32, borderRadius: 16 }}
      />
    );
  }

  // the type provided by the gifted chat library for context is `any` sadly
  const onLongPress = (context: any, message: IMessage): void => {
    const options: string[] = ["Copy Text", "Report Message", "Cancel"];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex: number) => {
        switch (buttonIndex) {
          case 0:
            Clipboard.setString(message.text); // TODO replace with community clipboard
            break;
          case 1:
            console.log(`report sent`);
            navigation.navigate("ReportPost", {
              sellerName: name,
              sellerId: "sellerId", // TODO: Add when Implementing Reporting Backend
              postId: post.id,
              userId: auth.currentUser.uid
            });
            break;
        }
      }
    );
  };
  const onPress = (_, message: IMessage): void => {
    console.log(`pressed`);
    if (message.image) {
      console.log(`message image: ${message.image}`);
      setImageURL(message.image);
    }
  };
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const permission = await checkPhotoPermission();
    if (!permission) {
      Alert.alert(
        "Permission Required",
        "Please enable gallery permissions to use this feature.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Settings",
            onPress: openAppSettings,
          },
        ]
      );
      return;
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!result.canceled) {
        setUri(result["uri"]);
        setModalVisibility(true);
      }
    }
  };

  const checkPhotoPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      return status === "granted";
    }
    return false;
  };

  const openAppSettings = () => {
    Linking.openSettings();
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

  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetInputToolbar();
    }
  }, [height, showConfirmNotice, showProposeNotice]);
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    // Get a reference to the current chat
    const currentChat = query(
      collection(doc(chatRef, buyerEmail), sellerEmail),
      orderBy("createdAt", "desc")
    );
    /*
    When we call on snapshot we pass in a callback function that updates the 
    state of the chat whenever it changes according to Firebase. The call to
    onSnapshot returns a reference to a function that, when called, unsubscribes 
    the user from this chat. We call this on the dispose of the useEffect hook.
    */
    const unsubscribeFromChat = onSnapshot(currentChat, (snapshot) => {
      // Set the messages to the most recent ones
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
      // Update the chat as viewed
      updateDoc(
        doc(
          collection(
            doc(historyRef, auth.currentUser.email),
            isBuyer ? "sellers" : "buyers"
          ),
          email
        ),
        { viewed: true }
      );
    });
    return unsubscribeFromChat;
  }, []);

  // Update image viewer modal as URL changes:
  useEffect(() => {
    setImageViewerVisible(Boolean(imageURL));
  }, [imageURL]);

  function renderInputToolbar(props) {
    return (
      <SafeAreaView>
        {uri && (
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
        {showConfirmNotice && (
          <NoticeBanner
            name={name}
            onPress={() => {
              setConfirmedMeetingVisible(true);
            }}
            isProposed={false}
          />
        )}
        {showProposeNotice && (
          <NoticeBanner
            name={proposer === auth.currentUser.email ? "You" : name}
            onPress={() => {
              setSellerConfirmVisible(true);
            }}
            isProposed={true}
          />
        )}
        <ButtonBanner
          count={count}
          setCount={setCount}
          data={FILTER}
          isBuyer={isBuyer}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setAvailabilityVisible={setAvailabilityVisible}
          setIsBubble={setIsBubble}
          alwaysColor={true}
          otherEmail={email}
        />
        <View style={styles.mainSendContainer}>
          {/* Image input */}
          <TouchableOpacity
            style={{
              marginLeft: 15,
              marginBottom: 12,
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
                : { alignItems: "flex-end" },
              { height: Math.min(Math.max(40, height), 140) },
            ]}
          >
            {!isSendingAvailability && (
              <TextInput
                style={[
                  {
                    width: "90%",
                    height: "100%",
                    paddingTop: 10,
                    paddingLeft: 15,
                    minHeight: 20,
                    color: "#000000",
                    textAlignVertical: "top",
                    maxHeight: 60,
                  },
                  fonts.body2,
                ]}
                numberOfLines={3}
                onChangeText={(t) => {
                  if (!isSendingAvailability) {
                    setText(t);
                  }
                }}
                value={text}
                onContentSizeChange={(event) => {
                  setHeight(event.nativeEvent.contentSize.height);
                }}
                multiline={true}
                placeholder="Message"
              />
            )}
            {isSendingAvailability && (
              <View
                style={{
                  width: "90%",
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
                  style={[
                    {
                      paddingHorizontal: 10,
                      color: "#000000",
                      marginTop: 10,
                      width: "95%",
                      height: Math.min(height - 80, 60),
                    },
                    fonts.body2,
                  ]}
                  autoCorrect={false}
                  multiline={true}
                  onKeyPress={({ nativeEvent }) => {
                    if (
                      nativeEvent.key === "Backspace" &&
                      placeholder.length == 0
                    ) {
                      setIsSendingAvailability(false);
                      setScheduleCallback([]);
                    }
                  }}
                  onContentSizeChange={(event) => {
                    setHeight(event.nativeEvent.contentSize.height + 80);
                  }}
                  value={placeholder}
                  onChangeText={(t) => {
                    setPlaceholder(t);
                  }}
                />
              </View>
            )}
            <View />

            {/* Send button */}
            {(text.trim().length !== 0 || isSendingAvailability) && (
              <TouchableOpacity
                style={{
                  marginRight: 10,
                  marginLeft: "auto",
                  marginTop: "auto",
                  marginBottom: 10,
                  zIndex: 10,
                }}
                onPress={() => {
                  setHeight(40);
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
                      if (ref.current != null) {
                        ref.current.scrollToBottom();
                      }
                    }, 100);
                  } else if (isSendingAvailability) {
                    setText(placeholder);
                    setPlaceholder("");
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
      </SafeAreaView>
    );
  }

  function renderAvailabilityBackdrop(props: BottomSheetBackdropProps) {
    return <BottomSheetBackdrop {...props} appearsOnIndex={1} />;
  }

  const ref = useRef<any>();
  return (
    <BottomSheetModalProvider>
      <SafeAreaView
        style={{
          backgroundColor: "#FFFFFF",
          padding: 0,
          flex: 1,
          justifyContent: "flex-start",
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            height: Platform.OS === "ios" ? 90 : 70,
            borderBottomWidth: 1,
            borderColor: "#D6D6D6",
            // elevation: 8,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <BackButton color="black" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Text
              style={[fonts.Title1, { marginBottom: 4, textAlign: "center" }]}
            >
              {post.title}
            </Text>
            <Text
              style={[fonts.Title3, { color: "#787878", textAlign: "center" }]}
            >
              {name}
            </Text>
          </View>
        </View>

        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: auth.currentUser.email,
            name: auth.currentUser.displayName,
            avatar: auth.currentUser.photoURL,
          }}
          listViewProps={{
            keyboardDismissMode: "on-drag",
          }}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          renderMessage={renderMessage}
          minInputToolbarHeight={
            125 + (showProposeNotice || showConfirmNotice ? 60 : 0)
          }
          renderAvatar={renderAvatar}
          scrollToBottom
          showAvatarForEveryMessage
          renderAvatarOnTop
          onLongPress={onLongPress}
          bottomOffset={40}
          scrollToBottomComponent={() => (
            <View
              style={{
                width: 50,
                height: 50,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="chevron-down" size={20} />
            </View>
          )}
        />
        {/* Modals below */}
        <>
          <NegotiationModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            text={text}
            setText={setText}
            setHeight={setHeight}
            screen={isBuyer ? "ChatBuyer" : "ChatSeller"}
            post={post}
          />

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            style={styles.weekViewBottomSheet}
            handleComponent={BottomSheetHandle}
            onDismiss={() => {
              if (selectedTime) {
                setMeetingProposeVisible(true);
              }
            }}
          >
            <AvailabilityModal
              bubbleInput={inputSchedule}
              setAvailabilityVisible={setAvailabilityVisible}
              setScheduleCallback={setScheduleCallback}
              setIsSendingAvailability={setIsSendingAvailability}
              isBubble={isBubble}
              setIsBubble={setIsBubble}
              setHeight={setHeight}
              username={availabilityUsername}
              isBuyer={isBuyer}
              setSelectedTime={setSelectedTime}
              setBuyerProposeVisible={setMeetingProposeVisible}
              selectdate={selectedTime}
            />
          </BottomSheetModal>

          <ConfirmMeetingModal
            visible={SellerConfirmVisible}
            setVisible={setSellerConfirmVisible}
            text={name + " has proposed the following meeting:"}
            startDate={proposedTime}
            setSyncMeetingVisible={setSellerSyncVisible}
            email={email}
            setShowNotice={setShowProposeNotice}
            proposer={proposer}
          />
          <SellerSyncModal
            visible={SellerSyncVisible}
            setVisible={setSellerSyncVisible}
            eventTitle={"Meet " + name + " for Resell"}
            startDate={proposedTime}
          />
          <MeetingProposeModal
            visible={meetingProposeVisible}
            setVisible={setMeetingProposeVisible}
            setAvailabilityVisible={setAvailabilityVisible}
            startDate={selectedTime}
            sellerEmail={sellerEmail}
            buyerEmail={buyerEmail}
            post={post}
            setStartDate={setSelectedTime}
          />
          <ConfirmedMeetingModal
            visible={confirmedMeetingVisible}
            setVisible={setConfirmedMeetingVisible}
            eventTitle={"Meet " + name + " for Resell"}
            text={name + " has confirmed the following meeting:"}
            startDate={confirmedTime}
            email={email}
            setShowNotice={setShowConfirmNotice}
          />
          <MeetingDetailModal
            visible={meetingDetailVisible}
            setVisible={setMeetingDetailVisible}
            startDate={isBuyer ? confirmedTime : proposedTime}
            otherEmail={email}
            name={name}
            post={post}
            proposer={proposer}
            isBuyer={isBuyer}
          />
          <Modal visible={imageViewerVisible}>
            <ImageViewer
              imageUrls={[
                {
                  url: imageURL,
                },
              ]}
              renderIndicator={() => <></>}
              enableSwipeDown
              onCancel={() => {
                setImageViewerVisible(false);
                setImageURL("");
              }}
            />
          </Modal>
        </>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "85%",
    margin: 12,
    backgroundColor: "#F4F4F4",
    borderRadius: 15,
    marginTop: 0,
    maxHeight: 60,
    padding: 20,
  },
  mainSendContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 35 : 0,
    left: 10,
    zIndex: 1,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  scheduleButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 35 : 0,
    right: 10,
    zIndex: 1,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  slideUp: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 320,
    backgroundColor: "#ffffff",
    width: "100%",
    marginHorizontal: 0,
    alignItems: "center",
    padding: 30,
    paddingLeft: 50,
    paddingRight: 50,
  },
  weekViewBottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText2: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "Rubik-Medium",
  },
  optionsContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? menuBarTop - 10 : 20,
    right: 12,
    zIndex: 15,
    width: 50,
    height: 50,
    alignItems: "center",
  },
  optionsButton: {
    zIndex: 15,
    width: 30,
    height: 25,
    paddingVertical: 10,
  },
  optionsMenu: {
    position: "absolute",
    top: Platform.OS === "ios" ? menuBarTop + 55 : 70,
    right: 0,
    width: 254,
    backgroundColor: "#EDEDEDEE",
    zIndex: 100,
    borderRadius: 12,
  },
  button: {
    width: 230,
    flexDirection: "column",
    alignItems: "center",
    padding: "3%",
    borderRadius: 25,
    backgroundColor: "#d52300",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "Rubik-Medium",
  },
  button1: {
    width: 230,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: "3%",
    borderRadius: 25,
  },
  modal: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 200,
    backgroundColor: "#ffffff",
    width: "100%",
    marginHorizontal: 0,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
    zIndex: 200,
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
];
