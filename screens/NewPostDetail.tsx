import React, { useState } from "react";

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { ActivityIndicator } from "react-native-paper";
import { useApiClient } from "../api/ApiClientProvider";
import ButtonBanner from "../components/ButtonBanner";
import { NegotiationModal } from "../components/NegotiationModal";
import PurpleButton from "../components/PurpleButton";
import Layout from "../constants/Layout";
import { FILTER1 } from "../data/filter";
import { fonts } from "../globalStyle/globalFont";
import { makeToast } from "../utils/Toast";
import { getUserId } from "../utils/asychStorageFunctions";

export function NewPostDetail({ navigation, route }) {
  const { image } = route.params;
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const api = useApiClient();
  getUserId(setUserId);

  const postRequest = async () => {
    setIsLoading(true);
    const res = await api.post("/post/", {
      title: title,
      description: description,
      categories: [FILTER1[count].title],
      price: Number(price.substring(1)),
      original_price: Number(price.substring(1)),
      imagesBase64: image,
      userId: userId,
    });
    setIsLoading(false);

    if (res.post) {
      navigation.navigate("Root");
    } else {
      makeToast({
        message: "Error creating post, check your internet",
        type: "ERROR",
      });
    }
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
          {isLoading && <ActivityIndicator size={"large"} />}
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
