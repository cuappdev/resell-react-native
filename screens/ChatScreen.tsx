import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";
import { Unsubscribe, collection, doc, onSnapshot } from "firebase/firestore";
import ChatTabs from "../components/ChatTabs";
import { auth, historyRef } from "../config/firebase";
import { IBuyerPreview, ISellerPreview } from "../data/struct";
import { fonts } from "../globalStyle/globalFont";

export default function ChatScreen({ navigation }) {
  const [isPurchase, setIsPurchase] = useState(true);
  const [purchase, setPurchase] = useState<IBuyerPreview[]>([]);
  const [offer, setOffer] = useState<ISellerPreview[]>([]);
  const [purchaseUnread, setPurchaseUnread] = useState(0);
  const [offerUnread, setOfferUnread] = useState(0);
  const isFocused = useIsFocused();

  const getPurchase = (): Unsubscribe => {
    setPurchase([]);

    const sellersQuery = collection(
      doc(historyRef, auth.currentUser?.email),
      "sellers"
    );

    try {
      return onSnapshot(sellersQuery, (querySnapshot) => {
        const tempt: IBuyerPreview[] = [];
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
  const getOffer = (): Unsubscribe => {
    setOffer([]);

    const buyersQuery = collection(
      doc(historyRef, auth.currentUser.email),
      "buyers"
    );

    try {
      return onSnapshot(buyersQuery, (querySnapshot) => {
        const tempt: ISellerPreview[] = [];
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
    const unsubFromPurchase = getPurchase();
    const unsubFromOffers = getOffer();

    return () => {
      unsubFromPurchase();
      unsubFromOffers();
    };
  }, [isFocused]);

  const countNotViewed = (
    chatPreviews: IBuyerPreview[] | ISellerPreview[]
  ): number => {
    let notViewed = 0;
    chatPreviews.forEach((element) => {
      if (!element.viewed) {
        notViewed++;
      }
    });
    return notViewed;
  };
  useEffect(() => {
    setPurchaseUnread(countNotViewed(purchase));
  }, [purchase]);

  useEffect(() => {
    setOfferUnread(countNotViewed(offer));
  }, [offer]);

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
                  receiverImage: item.image,
                  email: item.email,
                  post: item.recentItem,
                  isBuyer: isPurchase,
                  confirmedTime: (item as IBuyerPreview).confirmedTime,
                  confirmedViewed: (item as IBuyerPreview).confirmedViewed,

                  screen: "chat",
                }
              : {
                  name: item.sellerName, // the one are you are talking to
                  receiverImage: item.image,
                  email: item.email,
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
      <ChatTabs
        isPurchase={isPurchase}
        setIsPurchase={setIsPurchase}
        purchaseUnread={purchaseUnread}
        offerUnread={offerUnread}
      />

      {isPurchase &&
        (purchase.length !== 0 ? (
          <FlatList
            data={purchase}
            renderItem={renderItem}
            keyboardShouldPersistTaps="always"
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
        (offer.length !== 0 ? (
          <FlatList
            data={offer}
            renderItem={renderItem}
            keyboardShouldPersistTaps="always"
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
});
