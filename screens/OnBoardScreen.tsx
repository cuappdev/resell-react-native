import { Feather } from "@expo/vector-icons";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PurpleButton from "../components/PurpleButton";
import { pressedOpacity } from "../constants/Values";

export default function OnBoardScreen({ navigation }) {
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.cancelled) {
      console.log(result);
      setImage("data:image/jpeg;base64," + result["base64"]);
    }
  };
  const [isEditing, setIsEditing] = useState(false);
  const storePermission = async () => {
    try {
      await AsyncStorage.setItem("PhotoPermission", "true");
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    AsyncStorage.getItem("PhotoPermission", (errs, result) => {
      if (!errs) {
        if (result == null) {
          (async () => {
            if (Platform.OS !== "web") {
              const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== "granted") {
                alert("Sorry, we need gallary permissions to make this work!");
              } else {
                storePermission();
              }
            }
          })();
        }
      }
    });
  }, []);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsEditing(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsEditing(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const scroll = useRef<ScrollView | null>(null);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <ScrollView
          style={{ height: "100%" }}
          ref={(ref) => {
            scroll.current = ref;
          }}
        >
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View>
              <Image
                style={styles.profilePic}
                source={
                  image === ""
                    ? require("../assets/images/empty_profile.png")
                    : { uri: image }
                }
              />
              <TouchableOpacity
                activeOpacity={pressedOpacity}
                style={styles.roundButton1}
                onPress={() => {
                  pickImage();
                }}
              >
                <Feather name="edit-2" size={18} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{ width: "100%" }}>
              <Text style={styles.username}>
                {username.length > 0 ? "Username" : "Username*"}
              </Text>
              <TextInput
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  if (scroll.current != null) {
                    scroll.current.scrollToEnd({
                      animated: true,
                    });
                  }
                }}
                style={styles.username_input}
                placeholderTextColor={"#707070"}
              />
              <Text style={styles.bio}>Bio</Text>
              <TextInput
                value={bio}
                onChangeText={(text) => {
                  setBio(text);
                  if (scroll.current != null) {
                    scroll.current.scrollToEnd({
                      animated: true,
                    });
                  }
                }}
                style={styles.bio_input}
                placeholderTextColor={"#707070"}
                numberOfLines={4}
                multiline={true}
                maxLength={200}
              />
              {bio.length > 0 && (
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Rubik-Regular",
                      color: "#707070",
                      marginTop: 4,
                      marginRight: 10,
                    }}
                  >
                    {bio.length}/200
                  </Text>
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        {!isEditing && (
          <View style={styles.purpleButton}>
            <PurpleButton
              text={"Continue"}
              onPress={() => {
                navigation.navigate("Venmo", {
                  image: image,
                  username: username,
                  bio: bio,
                });
              }}
              enabled={username.length > 0}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  roundButton1: {
    width: 32,
    height: 32,
    position: "absolute",
    bottom: 0,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    elevation: 10,
    shadowOpacity: 0.2,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 3 },
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    minHeight: 500,
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  titleText: {
    fontFamily: "Roboto-Medium",
    fontSize: 18,
    marginTop: 20,
  },
  profilePic: {
    height: 132,
    width: 132,
    marginTop: 30,
    borderRadius: 66,
  },
  username: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 18,
    marginStart: 10,
    fontFamily: "Rubik-Medium",
  },
  username_input: {
    backgroundColor: "#F4F4F4",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 10,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 18,
  },

  bio: {
    marginBottom: 10,
    marginTop: 30,
    marginStart: 10,
    fontSize: 18,
    fontFamily: "Rubik-Medium",
  },
  bio_input: {
    backgroundColor: "#F4F4F4",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 10,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 18,
    minHeight: 100,
    textAlignVertical: "top",
  },
  purpleButton: {
    marginTop: 30,
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    bottom: "5%",
  },
});
