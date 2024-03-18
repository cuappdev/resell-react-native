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

import BackButton from "../assets/svg-components/back_button";
import { menuBarTop } from "../constants/Layout";
import PurpleButton from "../components/PurpleButton";

export default function ReportPostDetailsScreen({ navigation, route }) {
  const {
    option,
    sellerName,
    sellerId,
    postId,
    userId
  } = route.params;

  const [reportText, setReportText] = useState("")

  const handleChange = (event) => {
    setReportText(event);
  };

  const submitReport = async () => {
    try {
      //TODO: Insert backend call here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <BackButton color="black" />
      </TouchableOpacity>
      <Text style={styles.navHeader}>Report Post</Text>
      <Text style={styles.header}>{option}</Text>
      <Text style={styles.description}>Please provide more details about the account</Text>
      <TextInput
        multiline={true}
        style={styles.feedbackText}
        onChangeText={handleChange}
      />
      <View style={styles.submitButton}>
        <PurpleButton
          onPress={() => {
            if (reportText.length > 0) {
              submitReport();
              navigation.navigate("ReportPostConfirm", {
                sellerName: sellerName,
                sellerId: sellerId,
                postId: postId,
                userId: userId
              });
            } else {
              Alert.alert("Warning", "Feedback cannot be empty!");
            }
          }}
          text={"Submit"}
          enabled={reportText.length > 0} />
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
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? menuBarTop : 20,
    left: 10,
    zIndex: 15,
    width: 50,
    height: 50,
    alignItems: "center",
    color: "black"
  },
  navHeader: {
    top: Platform.OS === "ios" ? menuBarTop : 20,
    fontSize: 20,
    fontFamily: "Rubik-Medium",
  },
  header: {
    top: Platform.OS === "ios" ? menuBarTop : 20,
    marginTop: 30,
    fontSize: 18,
    fontFamily: "Rubik-Medium",
  },
  description: {
    top: Platform.OS === "ios" ? menuBarTop : 20,
    marginTop: 16,
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    color: "#707070"
  },
  feedbackText: {
    top: Platform.OS === "ios" ? menuBarTop : 20,
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    textAlignVertical: "top",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#707070",
    marginHorizontal: 24,
    marginTop: 20,
    padding: 10,
    height: 190,
    width: Dimensions.get("window").width - 48,
  },
  submitButton: {
    top: Platform.OS === "ios" ? menuBarTop + 138 : 20,
  },
})