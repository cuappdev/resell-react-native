import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import CheckMark from "../assets/svg-components/checkMark";
import { fonts } from "../globalStyle/globalFont";
import { menuBarTop } from "../constants/Layout";
import PopupSheet from "../components/PopupSheet";
import PurpleButton from "../components/PurpleButton";

export default function ReportPostConfirmScreen({ navigation, route }) {
  const {
    sellerName,
    sellerId,
    postId,
    userId
  } = route.params;

  const [blockModalVisibility, setBlockModalVisibility] = useState(false)

  const blockSeller = async () => {
    try {
      console.log(sellerId)
      const response = await fetch(
        "/api/user/block",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            blocked: sellerId,
          }),
        }
      );
      const json = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.navHeader}>Report Post</Text>
      <View style={styles.confirmation}>
        <CheckMark />
        <Text style={styles.header}>Thank you for reporting this post</Text>
        <Text style={styles.description}>Your report is valued in keeping Resell a safe community. We will be carefully reviewing the post and taking any necessary action. </Text>
      </View>
      <View style={styles.buttons}>
        <Text style={styles.blockText}>Block Account?</Text>
        <TouchableOpacity
          onPress={() => {
            setBlockModalVisibility(true)
          }}>
          <View
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>
              Block {sellerName}
            </Text>
          </View>
        </TouchableOpacity>
        <PurpleButton
          onPress={() => {
            navigation.goBack()
            navigation.goBack()
            navigation.goBack()
            navigation.goBack()
          }}
          text={"Done"}
          enabled={true} />
        <PopupSheet
          isVisible={blockModalVisibility}
          setIsVisible={setBlockModalVisibility}
          actionName={"Block User"}
          submitAction={() => blockSeller}
          buttonText={"Block"}
          description={"Are you sure you’d like to block this user?"}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  navHeader: {
    top: Platform.OS === "ios" ? menuBarTop : 20,
    fontSize: 20,
    fontFamily: "Rubik-Medium",
  },
  confirmation: {
    top: Platform.OS === "ios" ? menuBarTop : 20,
    marginTop: 180,
    alignItems: "center",
    marginHorizontal: 55,
  },
  header: {
    top: Platform.OS === "ios" ? menuBarTop : 20,
    marginTop: -20,
    fontSize: 22,
    fontFamily: "Rubik-Medium",
    textAlign: "center"
  },
  description: {
    top: Platform.OS === "ios" ? menuBarTop : 20,
    marginTop: 16,
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    textAlign: "center",
    color: "#707070"
  },
  buttons: {
    position: "absolute",
    bottom: 45,
    gap: 12,
  },
  blockText: {
    fontSize: 20,
    fontFamily: "Rubik-Medium",
    textAlign: "center"
  },
  cancelButton: {
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#F20000",
    minHeight: 45,
    justifyContent: "center"
  },
  cancelButtonText: {
    fontSize: 18,
    fontFamily: "Rubik-Regular",
    textAlign: "center",
    color: "#F20000"
  }
})