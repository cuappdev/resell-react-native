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

export function NewPostDetail({ navigation }) {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  return (
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
            marginHorizontal: 24,
            marginBottom: 32,
          },
        ]}
        onChangeText={(text) => {}}
        onKeyPress={({ nativeEvent }) => {}}
        onContentSizeChange={(event) => {}}
      />

      <Text style={styles.smallText}>Price</Text>
      <TouchableOpacity
        style={{ marginStart: 24, width: 120 }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <TextInput
          style={[
            {
              paddingVertical: 10,
              paddingHorizontal: 10,
              width: 120,
              fontSize: 18,
              backgroundColor: "#F4F4F4",
              borderRadius: 10,
              marginBottom: 32,
              fontFamily: "Rubik-Regular",
            },
          ]}
          pointerEvents="none"
          showSoftInputOnFocus={false}
          placeholderTextColor={"#707070"}
          placeholder={"$"}
          value={text}
          onChangeText={(text) => {}}
          onKeyPress={({ nativeEvent }) => {}}
          onContentSizeChange={(event) => {}}
        />
      </TouchableOpacity>
      <NegotiationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={text}
        setText={setText}
        screen={"NewPost"}
        itemName={undefined}
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
          "enter item details..." + "\n" + "• Condition" + "\n" + "• Dimensions"
        }
        placeholderTextColor={"#707070"}
        onChangeText={(text) => {}}
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
        <Pressable
          style={[styles.buttonContinue]}
          onPress={() => {
            navigation.navigate("Root");
          }}
        >
          <Text style={styles.textStyle}>Continue</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
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
