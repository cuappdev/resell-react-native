import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useApiClient } from "../api/ApiClientProvider";
import BookmarkIcon from "../assets/svg-components/bookmarkIcon";
import BookmarkIconSaved from "../assets/svg-components/bookmarkIconSaved";
import ModalBar from "../assets/svg-components/modal_bar";
import { auth } from "../config/firebase";
import { makeToast } from "../utils/Toast";

export function DetailPullUpHeader({
  item,
  sellerName,
  sellerProfile,
  isSaved,
  save,
  unsave,
}) {
  return (
    <View style={[styles.container_header, styles.roundCorner]}>
      <TouchableOpacity
        onPress={() => {
          isSaved ? unsave() : save();
        }}
        style={styles.bookmarkButton}
      >
        {isSaved ? <BookmarkIconSaved /> : <BookmarkIcon />}
      </TouchableOpacity>
      <View style={styles.modalBar}>
        <ModalBar />
      </View>
      <View style={styles.expandRow}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{"$" + item.price}</Text>
      </View>
      <View style={styles.paddedRow}>
        <Image source={{ uri: sellerProfile }} style={styles.profileImage} />
        <Text style={styles.profile}>{sellerName}</Text>
      </View>
    </View>
  );
}

export function DetailPullUpBody({
  postId,
  sellerItem,
  sellerName,
  similarItems,
  navigation,
  screen,
}) {
  const [userId, setUserId] = useState("");
  const api = useApiClient();
  AsyncStorage.getItem("userId", (errs, result) => {
    if (!errs) {
      if (result !== null && result !== undefined) {
        setUserId(result);
      }
    }
  });

  similarItems.filter((item, index, arr) => {
    if (item.id === postId) {
      arr.splice(index, 1);
      return true;
    }
    console.log(item.id);
    console.log(postId);
    return false;
  });

  console.log(similarItems);
  return (
    <ScrollView
      style={[
        styles.pullUpScrollView,
        screen == "Profile" || sellerName == auth?.currentUser?.displayName
          ? { marginBottom: 0 }
          : { marginBottom: 150 },
      ]}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Text style={styles.details}>{sellerItem.description}</Text>
      <Text style={styles.itemsHeader}>Similar Items</Text>
      <FlatList
        data={similarItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={async () => {
                try {
                  const response = await api.get(
                    `/post/isSaved/postId/${item.id}`
                  );

                  if (response.isSaved !== undefined) {
                    navigation.navigate("ProductHome", {
                      post: item,
                      screen: screen,
                      savedInitial: response.isSaved,
                    });
                  }
                } catch (error) {
                  makeToast({
                    message:
                      "Failed to view product details, check internet connection",
                    type: "ERROR",
                  });
                }
              }}
              style={{ pointerEvents: "box-none" }}
            >
              <Image
                source={{ uri: item.images[0] }}
                style={styles.similarItem}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalBar: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    top: 12,
    backgroundColor: "transparent",
  },
  pullUpScrollView: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  container_header: {
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "#ffffff",
  },
  container_body: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
  },
  roundCorner: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  expandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  paddedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    paddingLeft: 20,
    fontFamily: "Rubik-Medium",
    maxWidth: "70%",
  },
  price: {
    fontSize: 22,
    fontFamily: "Rubik-Medium",
    paddingRight: 20,
    maxWidth: "25%",
  },
  profile: {
    fontSize: 16,
    paddingLeft: 25,
    fontFamily: "Rubik-Regular",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    left: 20,
  },
  details: {
    fontSize: 15,
    paddingHorizontal: 20,
    fontFamily: "Rubik-Regular",
  },
  itemsHeader: {
    fontSize: 18,
    marginBottom: 20,
    paddingLeft: 20,
    paddingTop: 20,
    fontFamily: "Rubik-Medium",
  },
  similarItem: {
    width: 85,
    height: 85,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    paddingLeft: 20,
  },
  bookmarkButton: {
    position: "absolute",
    top: -96,
    right: 30,
    zIndex: 100,
  },
});
