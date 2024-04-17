import React, { useState } from "react";

import {
  Dimensions,
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
const { width: screenWidth } = Dimensions.get("window");

import { useApiClient } from "../api/ApiClientProvider";
import { NegotiationModal } from "../components/chat/NegotiationModal";
import PurpleButton from "../components/PurpleButton";
import Layout from "../constants/Layout";
import { fonts } from "../globalStyle/globalFont";
import { getUserId } from "../utils/asychStorageFunctions";
import { makeToast } from "../utils/Toast";

export function NewRequestScreen({ navigation, route }) {
  const api = useApiClient();

  const [title, setTitle] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const [description, setDescription] = useState("");
  const [minModalVisible, setMinModalVisible] = useState(false);
  const [maxModalVisible, setMaxModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [userId, setUserId] = useState("");
  getUserId(setUserId);

  const postRequest = async () => {
    try {
      setIsLoading(true);
      const response = await api.post("/request/", {
        title: title,
        description: description,
        userId: userId,
      });
      setIsLoading(false);
      if (response.request) {
        makeToast({ message: "New request posted" });
        navigation.navigate("Root");
      } else {
        makeToast({ message: "Error posting request", type: "ERROR" });
      }
    } catch (e: unknown) {}
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
          <View>
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
            {title.length > 0 && (
              <Text style={styles.lengthLimit}>{title.length}/50</Text>
            )}
          </View>
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
            items={null}
          />
          <NegotiationModal
            modalVisible={maxModalVisible}
            setModalVisible={setMaxModalVisible}
            text={max}
            setText={setMax}
            screen={"NewRequestMax"}
            post={null}
            setHeight={null}
            items={null}
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
            numberOfLines={2}
            maxLength={500}
          />
          {description.length > 0 && (
            <Text style={styles.lengthLimit}>{description.length}/500</Text>
          )}
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
            isLoading={isLoading}
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
  lengthLimit: {
    alignSelf: "flex-end",
    top: -20,
    right: 24,
    fontSize: 12,
    fontFamily: "Rubik-Regular",
    color: "#707070",
  },
});
