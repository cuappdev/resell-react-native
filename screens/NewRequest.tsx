import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
const { width: screenWidth } = Dimensions.get("window");

import { NegotiationModal } from "../components/NegotiationModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PurpleButton from "../components/PurpleButton";
import Layout from "../constants/Layout";
import { fonts } from "../globalStyle/globalFont";
import { makeToast } from "../utils/Toast";

export function NewRequestScreen({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const [description, setDescription] = useState("");
  const [minModalVisible, setMinModalVisible] = useState(false);
  const [maxModalVisible, setMaxModalVisible] = useState(false);

  const [userId, setUserId] = useState("");

  AsyncStorage.getItem("userId", (errs, result) => {
    if (!errs) {
      if (result !== null && result !== undefined) {
        setUserId(result);
      }
    }
  });
  console.log(userId);
  const postRequest = () => {
    const Json = JSON.stringify({
      title: title,
      description: description,
      userId: userId,
    });
    console.log(Json);
    fetch("https://resell-dev.cornellappdev.com/api/request/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: Json,
    })
      .then(function (response) {
        if (!response.ok) {
          let error = new Error(response.statusText);
          throw error;
        } else {
          makeToast("New request posted");

          return response.json();
        }
      })
      .then(async function (data) {
        navigation.navigate("Root");
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={{
          backgroundColor: "#ffffff",
          height: "100%",
          flexDirection: "column",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View>
          <Text
            style={[
              fonts.Title1,
              { marginStart: 32, marginBottom: 8, height: 26 },
            ]}
          >
            Title
          </Text>
          <TextInput
            style={[
              fonts.body2,
              {
                paddingTop: 10,
                paddingBottom: 10,
                paddingHorizontal: 15,
                backgroundColor: "#F4F4F4",
                borderRadius: 10,
                height: 40,
                marginHorizontal: 24,
                marginBottom: 32,
              },
            ]}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
          />
          <Text
            style={[
              fonts.Title1,
              { marginStart: 32, marginBottom: 10, height: 26 },
            ]}
          >
            Price Range
          </Text>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 24,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{ marginHorizontal: 24, width: "35%" }}
              onPress={() => setMinModalVisible(true)}
            >
              <View
                style={{
                  paddingBottom: 10,
                  paddingTop: 10,
                  paddingHorizontal: 15,
                  width: "100%",
                  height: 40,
                  backgroundColor: "#F4F4F4",
                  borderRadius: 10,
                }}
              >
                <Text
                  style={[
                    fonts.body2,
                    {
                      color: "#707070",
                    },
                  ]}
                >
                  {min == "" ? "$" : min}
                </Text>

                <Text
                  style={{
                    fontFamily: "Rubik-Regular",
                    fontSize: 14,
                    position: "absolute",
                    right: 16,
                    bottom: 7,
                  }}
                >
                  min
                </Text>
              </View>
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: "Rubik-Medium",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: 18,
                lineHeight: 21,
                alignSelf: "center",
              }}
            >
              -
            </Text>
            <TouchableOpacity
              style={{ marginHorizontal: 24, width: "35%" }}
              onPress={() => setMaxModalVisible(true)}
            >
              <View
                style={{
                  paddingBottom: 10,
                  paddingTop: 10,
                  paddingHorizontal: 15,
                  width: "100%",
                  height: 40,
                  backgroundColor: "#F4F4F4",
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Rubik-Regular",
                    fontSize: 18,
                    color: "#707070",
                  }}
                >
                  {max == "" ? "$" : max}
                </Text>
                <Text
                  style={{
                    fontFamily: "Rubik-Regular",
                    fontSize: 14,
                    position: "absolute",
                    right: 16,
                    bottom: 7,
                  }}
                >
                  max
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <NegotiationModal
            modalVisible={minModalVisible}
            setModalVisible={setMinModalVisible}
            text={min}
            setText={setMin}
            screen={"NewRequestMin"}
            post={null}
            setHeight={null}
          />
          <NegotiationModal
            modalVisible={maxModalVisible}
            setModalVisible={setMaxModalVisible}
            text={max}
            setText={setMax}
            screen={"NewRequestMax"}
            post={null}
            setHeight={null}
          />
          <Text
            style={[
              fonts.Title1,
              { marginStart: 32, marginBottom: 8, height: 26 },
            ]}
          >
            Item Description
          </Text>
          <TextInput
            style={[
              fonts.body2,
              {
                paddingTop: 12,
                paddingBottom: 12,
                paddingHorizontal: 15,
                backgroundColor: "#F4F4F4",
                borderRadius: 10,
                marginHorizontal: 24,
                marginBottom: 32,
                minHeight: 100,
                textAlignVertical: "top",
                maxHeight: 160,
              },
            ]}
            placeholder={
              "enter item details..." +
              "\n" +
              "• Condition" +
              "\n" +
              "• Dimensions"
            }
            value={description}
            placeholderTextColor={"#707070"}
            onChangeText={(text) => {
              setDescription(text);
            }}
            multiline={true}
          />
        </View>
        <View style={styles.purpleButton}>
          <PurpleButton
            text={"Continue"}
            onPress={() => {
              postRequest();
            }}
            enabled={
              description.length > 0 &&
              title.length > 0 &&
              max.length > 1 &&
              min.length > 1 &&
              Number(max.substring(1)) > Number(min.substring(1))
            }
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  purpleButton: {
    marginTop: 30,
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    bottom: Layout.window.height * 0.05,
  },

  buttonContinue: {
    backgroundColor: "#9E70F6",
    paddingHorizontal: 60,
    paddingVertical: 16,
    borderRadius: 25,
    elevation: 2,
    width: "60%",
  },

  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
    margin: 0,
  },
});
