import React, { useEffect, useRef, useState } from "react";
import Modal from "react-native-modal";

import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  TextInput,
  Platform,
  ListRenderItem,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
const { width: screenWidth } = Dimensions.get("window");
import * as ImagePicker from "expo-image-picker";

import { AntDesign, Feather } from "@expo/vector-icons";
import { pressedOpacity } from "../constants/Values";
import Carousel, {
  Pagination,
  ParallaxImage,
} from "react-native-snap-carousel";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";
import ButtonBanner from "../components/ButtonBanner";
import { FILTER1 } from "../data/filter";
import { NegotiationModal } from "../components/NegotiationModal";
import { json } from "stream/consumers";
import PurpleButton from "../components/PurpleButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

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
      if (result !== null) {
        setUserId(result);
      }
    }
  });
  const postRequest = () => {
    console.log(image.length);
    const Json = JSON.stringify({
      title: title,
      description: description,
      categories: [FILTER1[count].title],
      price: parseInt(price.substring(1)),
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
        // alert(JSON.stringify(response));

        if (!response.ok) {
          let error = new Error(response.statusText);
          throw error;
        } else {
          return response.json();
        }
      })
      .then(async function (data) {
        // console.log(data);
      })
      .catch((error) => {
        //alert(error.message);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          backgroundColor: "#ffffff",
          height: "100%",
          flexDirection: "column",
        }}
      >
        <Text style={styles.smallText}>Title</Text>
        <TextInput
          style={[
            {
              paddingVertical: 10,
              paddingHorizontal: 10,
              fontSize: 18,
              backgroundColor: "#F4F4F4",
              borderRadius: 10,
              height: 42,
              marginHorizontal: 24,
              marginBottom: 32,
            },
          ]}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
          }}
          onKeyPress={({ nativeEvent }) => {}}
          onContentSizeChange={(event) => {}}
        />

        <Text style={styles.smallText}>Price</Text>
        <TouchableOpacity
          style={{ width: 120 }}
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
              marginHorizontal: 24,
              marginBottom: 24,
              elevation: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "Rubik-Regular",
                fontSize: 18,
                color: "#707070",
              }}
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
        />
        <Text style={styles.smallText}>Item Description</Text>
        <TextInput
          style={[
            {
              paddingVertical: 10,
              paddingHorizontal: 10,
              fontSize: 18,
              backgroundColor: "#F4F4F4",
              borderRadius: 10,
              marginHorizontal: 24,
              marginBottom: 32,
              minHeight: 100,
              textAlignVertical: "top",
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
          onKeyPress={({ nativeEvent }) => {}}
          onContentSizeChange={(event) => {}}
          multiline={true}
        />
        <Text style={styles.smallText}>Select Categories</Text>
        <ButtonBanner count={count} setCount={setCount} data={FILTER1} />
        <KeyboardAvoidingView
          style={{
            width: "100%",
            alignItems: "center",
            position: "absolute",
            bottom: "5%",
          }}
        >
          <PurpleButton
            text={"Continue"}
            onPress={() => {
              navigation.navigate("Root");
              postRequest();
            }}
            enabled={
              description.length > 0 && title.length > 0 && price.length > 1
            }
          />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  noResultView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultHeader: {
    fontFamily: "Rubik-Medium",
    fontSize: 18,
    marginBottom: 16,
  },
  noResultSubHeader: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#707070",
    flexShrink: 0,
    width: "70%",
    fontWeight: "400",
  },
  roundButton1: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    elevation: 10,
    shadowOpacity: 0.2,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 3 },
    backgroundColor: "white",
  },
  smallText: {
    fontFamily: "Rubik-Medium",
    fontSize: 18,
    marginStart: 32,
    marginBottom: 8,
    height: 26,
  },
  buttonContinue: {
    backgroundColor: "#9E70F6",
    paddingHorizontal: 60,
    paddingVertical: 16,
    borderRadius: 25,
    elevation: 2,
    width: "60%",
  },
  textStyle: {
    fontFamily: "Rubik-Medium",
    fontSize: 18,
    color: "white",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
    margin: 0,
  },
  imageContainer: {
    flex: 1,
    // marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
});
