import {
  StyleSheet,
  Text,
  FlatList,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { LogBox } from "react-native";
import { Feather } from "@expo/vector-icons";
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
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

// LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
// LogBox.ignoreAllLogs();
import ChatTbas from "../components/ChatTabs";

export default function ChatScreen({ navigation }) {
  const [isPurchase, setIsPurchase] = useState(true);
  var temptPuchrase = 0;
  var temptOrder = 0;
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  data.forEach((element) => {
    if (!element.viewed) {
      temptPuchrase = temptPuchrase + 1;
    }
  });
  data2.forEach((element) => {
    if (!element.viewed) {
      temptOrder = temptOrder + 1;
    }
  });
  const [purchaseUnread, setPurchaseUnread] = useState(temptPuchrase);
  const [offerUnread, setOfferUnread] = useState(temptOrder);

  const renderItem = ({ item }) => {
    var products = "";
    item.items.forEach((element) => {
      products = products.concat(" • ", element);
    });
    var message = item.recentSender == 1 ? "You:" : item.sellerName + ":";
    message = message + item.recentMessage;

    return (
      <TouchableOpacity
        onPress={() => {
          //Changed viewed of data here.
          navigation.navigate("ChatWindow", {
            item: item.title,
            seller: item.sellerName,
          });
        }}
      >
        <View style={styles.outer}>
          {!item.viewed && <View style={styles.viewedDot} />}
          <Image
            style={styles.image}
            source={item.image}
            resizeMode={"cover"}
          />
          <View style={styles.inner}>
            <Text numberOfLines={1} style={styles.items}>
              <Text style={styles.sellerName}>{item.sellerName}</Text>
              {products}
            </Text>
            <Text style={styles.recentMessage}>{message}</Text>
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
      {data.length != 0 && isPurchase && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyboardShouldPersistTaps="always"
        />
      )}
      {data2.length != 0 && !isPurchase && (
        <FlatList
          data={data2}
          renderItem={renderItem}
          keyboardShouldPersistTaps="always"
        />
      )}
      {data.length == 0 && isPurchase && (
        <View style={styles.noResultView}>
          <Text style={styles.noResultHeader}>
            No messages with sellers yet
          </Text>
          <Text style={styles.noResultSubHeader}>
            When you contact a seller, you’ll see your messages here
          </Text>
        </View>
      )}
      {data2.length == 0 && !isPurchase && (
        <View style={styles.noResultView}>
          <Text style={styles.noResultHeader}>No messages with buyers yet</Text>
          <Text style={styles.noResultSubHeader}>
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
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: "70%",
    marginStart: 12,

    flexDirection: "column",
    justifyContent: "space-around",
  },
  recentMessage: {
    color: "#707070",
    fontSize: 14,
    fontFamily: "Rubik-Regular",
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
    fontFamily: "Rubik-Bold",
    fontSize: 16,
    color: "#707070",
    marginBottom: 8,
  },
  image: { width: 45, height: 45, borderRadius: 75, marginStart: 24 },
  noResultView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultHeader: { fontFamily: "Rubik-Medium", fontSize: 18, marginBottom: 8 },
  noResultSubHeader: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#707070",
    width: "80%",
  },
});
