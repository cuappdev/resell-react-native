import {
  StyleSheet,
  Text,
  FlatList,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";

import ChatTbas from "../components/ChatTabs";
import { auth, historyRef } from "../config/firebase";
import { fonts } from "../globalStyle/globalFont";
import { IBuyerPreview, ISellerPreview } from "../data/struct";
import { useIsFocused } from "@react-navigation/native";

export default function ChatScreen({ navigation }) {
  const [isPurchase, setIsPurchase] = useState(true);
  var temptPuchrase = 0; //for the number of unread on the top
  var temptOrder = 0; //for the number of unread on the top
  const [purchase, setPurchase] = useState<IBuyerPreview[]>([]);
  const [offer, setOffer] = useState<ISellerPreview[]>([]);
  const isFocused = useIsFocused();

  const getPurchase = async () => {
    setPurchase([]);
    const query = historyRef
      .doc(auth?.currentUser?.email) //my email and I have a bunches of chats with sellers in the purchase list
      .collection("sellers");

    try {
      query.onSnapshot((querySnapshot) => {
        var tempt: IBuyerPreview[] = [];
        querySnapshot.docs.forEach((doc) => {
          tempt.push({
            sellerName: doc.data().name,
            email: doc.id, //seller
            recentItem: doc.data().item, // you can buy multiple items from a seller
            image: doc.data().image, // image of the seller
            recentMessage: doc.data().recentMessage,
            recentSender:
              doc.data().recentSender == auth?.currentUser?.email ? 1 : 0, //1 means buyer, means seller
            viewed: doc.data().viewed,
            confirmedTime: doc.data().confirmedTime,
            confirmedViewed: doc.data().confirmedViewed,
          });
        });
        setPurchase(tempt);
      });
    } catch (e) {
      console.log("Error getting user: ", e);
    }
  };
  const getOffer = async () => {
    setOffer([]);

    const query = historyRef.doc(auth?.currentUser?.email).collection("buyers");

    try {
      query.onSnapshot((querySnapshot) => {
        var tempt: ISellerPreview[] = [];

        querySnapshot.docs.forEach((doc) => {
          tempt.push({
            sellerName: doc.data().name, //buyername
            recentItem: doc.data().item,
            email: doc.id, // buyeremail
            image: doc.data().image, // buyer image
            recentMessage: doc.data().recentMessage,
            recentSender:
              doc.data().recentSender == auth?.currentUser?.email ? 1 : 0,
            viewed: doc.data().viewed,
            proposedTime: doc.data().proposedTime,
            proposedViewed: doc.data().proposedViewed,
          });
        });
        setOffer(tempt);
      });
    } catch (e) {
      console.log("Error getting user: ", e);
    }
  };
  useEffect(() => {
    getPurchase();
    getOffer();
  }, [isFocused]);
  purchase.forEach((element) => {
    if (!element.viewed) {
      temptPuchrase = temptPuchrase + 1;
    }
  });

  offer.forEach((element) => {
    if (!element.viewed) {
      temptOrder = temptOrder + 1;
    }
  });
  const [purchaseUnread, setPurchaseUnread] = useState(0);
  useEffect(() => {
    setPurchaseUnread(temptPuchrase);
  }, [temptPuchrase]);

  const [offerUnread, setOfferUnread] = useState(temptOrder);
  useEffect(() => {
    setOfferUnread(temptOrder);
  }, [temptOrder]);

  const renderItem = ({ item }: { item: IBuyerPreview | ISellerPreview }) => {
    var products = " • " + item.recentItem.title;

    var message = item.recentSender == 1 ? "You: " : item.sellerName + ": ";

    message = message + item.recentMessage;

    return (
      <TouchableOpacity
        onPress={() => {
          //Changed viewed of data here.

          navigation.navigate(
            "ChatWindow",
            isPurchase
              ? {
                  name: item.sellerName, // the one are you are talking to
                  receiverImage: item.image, // the one you are talking to
                  email: item.email, // the one you are talking to
                  post: item.recentItem,
                  isBuyer: isPurchase,
                  confirmedTime: (item as IBuyerPreview).confirmedTime,
                  confirmedViewed: (item as IBuyerPreview).confirmedViewed,

                  screen: "chat",
                }
              : {
                  name: item.sellerName, // the one are you are talking to
                  receiverImage: item.image, // the one you are talking to
                  email: item.email, // the one you are talking to
                  post: item.recentItem,
                  isBuyer: isPurchase,
                  proposedTime: (item as ISellerPreview).proposedTime,
                  proposedViewed: (item as ISellerPreview).proposedViewed,

                  screen: "chat",
                }
          );
        }}
      >
        <View style={styles.outer}>
          {!item.viewed && <View style={styles.viewedDot} />}
          <Image
            style={[
              styles.image,
              (isPurchase && purchaseUnread != 0) ||
              (!isPurchase && offerUnread != 0)
                ? { marginStart: 24 }
                : { marginStart: 12 },
            ]}
            source={{ uri: item.image }}
            resizeMode={"cover"}
          />
          <View style={styles.inner}>
            <Text numberOfLines={1} style={styles.items}>
              <Text style={styles.sellerName}>{item.sellerName}</Text>
              {products}
            </Text>
            <Text
              numberOfLines={1}
              style={[fonts.Title4, { color: "#707070" }]}
            >
              {message}
            </Text>
          </View>
          <View style={{ marginHorizontal: 8 }}>
            <Feather name="chevron-right" size={24} color="#B3B3B3" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ backgroundColor: "#ffffff", height: "100%" }}>
      <ChatTbas
        isPurchase={isPurchase}
        setIsPurchase={setIsPurchase}
        purchaseUnread={purchaseUnread}
        offerUnread={offerUnread}
      />
      {purchase.length != 0 && isPurchase && (
        <FlatList
          data={purchase}
          renderItem={renderItem}
          keyboardShouldPersistTaps="always"
        />
      )}
      {offer.length != 0 && !isPurchase && (
        <FlatList
          data={offer}
          renderItem={renderItem}
          keyboardShouldPersistTaps="always"
        />
      )}
      {purchase.length == 0 && isPurchase && (
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
      )}
      {offer.length == 0 && !isPurchase && (
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
      )}
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
});
