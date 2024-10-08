import TimeAgo from "@andordavoti/react-native-timeago";
import { Feather } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import { RefreshControl } from "react-native-gesture-handler";
import { useApiClient } from "../api/ApiClientProvider";
import ChatTabs from "../components/chat/ChatTabs";
import LoadingChat from "../components/chat/LoadingChat";
import { auth, historyRef } from "../config/firebase";
import Colors from "../constants/Colors";
import { ChatPreview } from "../data/struct";
import { fonts } from "../globalStyle/globalFont";
import { makeToast } from "../utils/Toast";
import { getUserId } from "../utils/asychStorageFunctions";

export default function ChatScreen({ navigation }) {
  const [isPurchase, setIsPurchase] = useState(true);
  const [purchase, setPurchase] = useState<ChatPreview[] | null>(null);
  const [offer, setOffer] = useState<ChatPreview[] | null>(null);
  const [purchaseUnread, setPurchaseUnread] = useState(0);
  const [offerUnread, setOfferUnread] = useState(0);
  const isFocused = useIsFocused();
  const [isLoadingPurchase, setIsLoadingPurchase] = useState(true);
  const [isLoadingOffers, setIsLoadingOffers] = useState(true);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [userId, setUserId] = useState("");

  const apiClient = useApiClient();
  const compareItemsByDate = (item1: ChatPreview, item2: ChatPreview) =>
    new Date(item1.recentMessageTime) < new Date(item2.recentMessageTime)
      ? 11
      : -1;

  const getBlockedUsers = async () => {
    try {
      const response = await apiClient.get(`/user/blocked/id/${userId}`);
      if (response.users) {
        setBlockedUsers(response.users);
      } else {
        makeToast({ message: "Error blocking user", type: "ERROR" });
      }
    } catch (e: unknown) {}
  };

  const getPurchase = (): (() => void) => {
    if (purchase === null) {
      setIsLoadingPurchase(true);
    }

    try {
      const sellersQuery = historyRef
        .doc(auth.currentUser?.email)
        .collection("sellers");

      return sellersQuery.onSnapshot(async (querySnapshot) => {
        const tempt: ChatPreview[] = [];
        for (const document of querySnapshot.docs) {
          // get the items for the chat
          try {
            const sellerHistoryRef = firestore()
              .collection(`history/${document.id}/buyers`)
              .doc(auth.currentUser.email);

            const items = (
              await sellerHistoryRef.collection("items").get()
            ).docs.map((doc) => doc.data());

            tempt.push({
              sellerName: document.data().name,
              email: document.id,
              recentItem: document.data().item, // you can buy multiple items from a seller
              image: document.data().image, // image of the seller
              recentMessage: document.data().recentMessage,
              recentSender:
                document.data().recentSender == auth?.currentUser?.email
                  ? 1
                  : 0, //1 means buyer, means seller
              viewed: document.data().viewed,
              confirmedTime: document.data().confirmedTime,
              confirmedViewed: document.data().confirmedViewed,
              proposedTime: document.data().proposedTime,
              proposedViewed: document.data().proposedViewed,
              recentMessageTime: document.data().recentMessageTime,
              proposer: document.data().proposer,
              items: items,
            });
          } catch (error) {
            makeToast({
              message: "Error loading chat previews",
              type: "ERROR",
            });
          }
        }
        tempt.sort(compareItemsByDate);
        setPurchase(
          tempt.filter(
            (post) => !blockedUsers.some((user) => user.email === post.email)
          )
        );
        setIsLoadingPurchase(false);
      });
    } catch (e) {
      console.log("Error getting user: ", e);
    }
  };
  const getOffer = (): (() => void) => {
    if (offer === null) {
      setIsLoadingOffers(true);
    }

    try {
      const buyersQuery = historyRef
        .doc(auth.currentUser?.email)
        .collection("buyers");

      return buyersQuery.onSnapshot(async (querySnapshot) => {
        const tempt: ChatPreview[] = [];
        for (const document of querySnapshot.docs) {
          try {
            // get the items for the chat
            const buyerHistoryRef = firestore()
              .collection(`history/${document.id}/sellers`)
              .doc(auth.currentUser.email);
            const items = (
              await buyerHistoryRef.collection("items").get()
            ).docs.map((d) => d.data());
            tempt.push({
              sellerName: document.data().name, //buyername
              recentItem: document.data().item,
              email: document.id, // buyeremail
              image: document.data().image, // buyer image
              recentMessage: document.data().recentMessage,
              recentSender:
                document.data().recentSender == auth?.currentUser?.email
                  ? 1
                  : 0,
              viewed: document.data().viewed,
              proposedTime: document.data().proposedTime,
              proposedViewed: document.data().proposedViewed,
              confirmedTime: document.data().confirmedTime,
              confirmedViewed: document.data().confirmedViewed,
              recentMessageTime: document.data().recentMessageTime,
              proposer: document.data().proposer,
              items: items,
            });
          } catch (error) {
            console.log(error);
          }
        }
        tempt.sort(compareItemsByDate);
        setOffer(
          tempt.filter(
            (post) => !blockedUsers.some((user) => user.email === post.email)
          )
        );
        setIsLoadingOffers(false);
      });
    } catch (e) {
      console.log("Error getting user: ", e);
    }
  };

  const fetchChatData = () => {
    getPurchase();
    getOffer();
    getBlockedUsers();
  };

  const countNotViewed = (chatPreviews: ChatPreview[]): number => {
    let notViewed = 0;
    chatPreviews.forEach((element) => {
      if (!element.viewed) {
        notViewed++;
      }
    });
    return notViewed;
  };

  // Fetch user ID first
  useEffect(() => {
    getUserId(setUserId);
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchChatData();
    }
  }, [isFocused]);

  useEffect(() => {
    setPurchaseUnread(countNotViewed(purchase ?? []));
  }, [purchase]);

  useEffect(() => {
    setOfferUnread(countNotViewed(offer ?? []));
  }, [offer]);

  const renderItem = ({ item: chatPreview }: { item: ChatPreview }) => {
    var products = " • " + chatPreview.recentItem.title;
    return (
      <TouchableOpacity
        onPress={() => {
          //Changed viewed of data here.
          navigation.navigate("ChatWindow", {
            name: chatPreview.sellerName, // the one are you are talking to
            receiverImage: chatPreview.image,
            email: chatPreview.email,
            post: chatPreview.recentItem,
            isBuyer: isPurchase,
            confirmedTime: chatPreview.confirmedTime,
            confirmedViewed: chatPreview.confirmedViewed,
            proposedTime: chatPreview.proposedTime,
            proposedViewed: chatPreview.proposedViewed,
            proposer: chatPreview.proposer,
          });
        }}
      >
        <View style={styles.outer}>
          {!chatPreview.viewed && <View style={styles.viewedDot} />}
          <FastImage
            style={[
              styles.image,
              (isPurchase && purchaseUnread != 0) ||
              (!isPurchase && offerUnread != 0)
                ? { marginStart: 24 }
                : { marginStart: 12 },
            ]}
            source={{ uri: chatPreview.image }}
            resizeMode={"cover"}
          />
          <View style={[styles.inner]}>
            <View style={[styles.chatHeaderContainer]}>
              <View style={[{ flexShrink: 1 }]}>
                <Text numberOfLines={1} style={styles.sellerName}>
                  {chatPreview.sellerName}
                </Text>
              </View>

              <View style={{ width: 12 }} />
              <View style={styles.itemContainer}>
                <Text
                  numberOfLines={1}
                  style={[fonts.Title4, { color: Colors.secondaryGray }]}
                >{`${
                  chatPreview.items.length > 0
                    ? chatPreview.items[0].title
                    : "loading..."
                }`}</Text>
              </View>
              {chatPreview.items.length > 1 && (
                <>
                  <View style={{ width: 4 }} />
                  <View style={{ flexShrink: 1 }}>
                    <Text
                      numberOfLines={1}
                      style={[fonts.subtitle, { color: Colors.secondaryGray }]}
                    >{`+ ${chatPreview.items.length - 1} more`}</Text>
                  </View>
                </>
              )}
            </View>
            {/* Recent message region */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                numberOfLines={1}
                style={[fonts.Title4, { color: "#707070", maxWidth: 114 }]}
              >
                {chatPreview.recentMessage}
              </Text>
              <View
                style={{
                  borderRadius: 10,
                  width: 2,
                  height: 2,
                  backgroundColor: Colors.secondaryGray,
                  marginHorizontal: 6,
                }}
              />
              <Text style={[fonts.Title4, { color: Colors.secondaryGray }]}>
                <TimeAgo dateTo={new Date(chatPreview.recentMessageTime)} />
              </Text>
            </View>
          </View>
          <View style={{ marginHorizontal: 8 }}>
            <Feather name="chevron-right" size={24} color="#B3B3B3" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ backgroundColor: "#ffffff", height: "100%", paddingTop: 8 }}>
      <ChatTabs
        isPurchase={isPurchase}
        setIsPurchase={setIsPurchase}
        purchaseUnread={purchaseUnread}
        offerUnread={offerUnread}
      />
      {(isLoadingPurchase || isLoadingOffers) && (
        <View style={{ flexDirection: "column", gap: 24, paddingTop: 24 }}>
          <LoadingChat />
          <LoadingChat />
        </View>
      )}
      {isPurchase &&
        !isLoadingPurchase &&
        (purchase && purchase.length !== 0 ? (
          <FlatList
            data={purchase}
            renderItem={renderItem}
            keyboardShouldPersistTaps="always"
            refreshControl={
              <RefreshControl
                tintColor={"#DE6CD3"}
                colors={["#DE6CD3"]}
                refreshing={false}
                onRefresh={fetchChatData}
              />
            }
          />
        ) : (
          <View style={styles.noResultView}>
            <Text style={[fonts.pageHeading2, { marginBottom: 8 }]}>
              No messages with sellers yet
            </Text>
            <Text
              style={[
                fonts.body1,
                { color: "#707070", width: "80%", textAlign: "center" },
              ]}
            >
              When you contact a seller, you’ll see your messages here
            </Text>
          </View>
        ))}

      {!isPurchase &&
        !isLoadingOffers &&
        (offer.length !== 0 ? (
          <FlatList
            data={offer}
            renderItem={renderItem}
            keyboardShouldPersistTaps="always"
            refreshControl={
              <RefreshControl
                tintColor={"#DE6CD3"}
                colors={["#DE6CD3"]}
                refreshing={false}
                onRefresh={fetchChatData}
              />
            }
          />
        ) : (
          <View style={styles.noResultView}>
            <Text style={[fonts.pageHeading2, { marginBottom: 8 }]}>
              No messages with buyers yet
            </Text>
            <Text
              style={[
                fonts.body1,
                { color: "#707070", width: "80%", textAlign: "center" },
              ]}
            >
              When a buyer contacts you, you’ll see their messages here
            </Text>
          </View>
        ))}
    </View>
  );
}
const styles = StyleSheet.create({
  outer: {
    marginStart: 12,
    marginTop: 12,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inner: {
    width: "65%",
    marginStart: 12,
    flexDirection: "column",
    justifyContent: "space-around",
  },

  viewedDot: {
    position: "absolute",
    left: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#9E70F6",
  },
  sellerName: {
    fontFamily: "Rubik-Bold",
    fontSize: 16,
    color: "#000000",
  },
  items: {
    fontFamily: "Rubik-Medium",
    fontSize: 16,
    color: "#707070",
    marginBottom: 8,
  },
  image: { width: 45, height: 45, borderRadius: 75 },
  noResultView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderColor: Colors.stroke,
    borderWidth: 1,
    borderRadius: 75,
    flexShrink: 1,
  },
  chatHeaderContainer: {
    alignItems: "center",
    flexDirection: "row",
    maxWidth: "100%",
    overflow: "hidden",
  },
});
