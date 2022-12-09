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

import ButtonBanner from "../components/ButtonBanner";
import { FILTER1 } from "../data/filter";
import { NegotiationModal } from "../components/NegotiationModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PurpleButton from "../components/PurpleButton";
import Layout from "../constants/Layout";
import { fonts } from "../globalStyle/globalFont";
import { makeToast } from "../utils/Toast";

export function NewPostDetail({ navigation, route }) {
  const { image } = route.params;
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
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
      categories: [FILTER1[count].title],
      price: Number(price.substring(1)),
      // created: Math.round(new Date().getTime() / 1000),
      imagesBase64: image,
      userId: userId,
    });
    console.log(Json);
    fetch("https://resell-dev.cornellappdev.com/api/post/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: Json,
    })
      .then(function (response) {
        if (!response.ok) {
          // let error = new Error(response.statusText);
          console.log("why", response.body);
        } else {
          makeToast("New listing posted");

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
              { marginStart: 24, marginBottom: 8, height: 26 },
            ]}
          >
            Title
          </Text>
          <TextInput
            style={[
              fonts.body2,
              {
                paddingVertical: 10,
                paddingHorizontal: 10,
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
              { marginStart: 24, marginBottom: 10, height: 26 },
            ]}
          >
            Price
          </Text>
          <TouchableOpacity
            style={{ marginHorizontal: 24, width: 120 }}
            onPress={() => setModalVisible(true)}
          >
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 10,
                width: 120,
                height: 40,
                backgroundColor: "#F4F4F4",
                borderRadius: 10,
                marginBottom: 32,
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
                {price == "" ? "$" : price}
              </Text>
            </View>
          </TouchableOpacity>

          <NegotiationModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            text={price}
            setText={setPrice}
            screen={"NewPost"}
            post={null}
            setHeight={null}
          />
          <Text
            style={[
              fonts.Title1,
              { marginStart: 24, marginBottom: 8, height: 26 },
            ]}
          >
            Item Description
          </Text>
          <TextInput
            style={[
              fonts.body2,
              {
                paddingVertical: 10,
                paddingHorizontal: 10,
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
          <Text
            style={[
              fonts.Title1,
              { marginStart: 24, marginBottom: 8, height: 26 },
            ]}
          >
            Select Categories
          </Text>
          <ButtonBanner count={count} setCount={setCount} data={FILTER1} />
        </View>
        <View style={styles.purpleButton}>
          <PurpleButton
            text={"Continue"}
            onPress={() => {
              postRequest();
            }}
            enabled={
              description.length > 0 && title.length > 0 && price.length > 1
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
});
