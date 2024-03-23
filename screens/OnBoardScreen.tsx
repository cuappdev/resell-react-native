import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import PurpleButton from "../components/PurpleButton";
import ToggleButton from "../components/ToggleButton";
import Colors from "../constants/Colors";
import { maxUsernameLength, pressedOpacity } from "../constants/Values";
import { fonts } from "../globalStyle/globalFont";

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
    if (!result.canceled) {
      console.log(result);
      setImage("data:image/jpeg;base64," + result["base64"]);
    }
  };
  const [isEditing, setIsEditing] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [agreedToEula, setAgreedToEula] = useState(false);
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
  const [isFirstRender, setIsFirstRender] = useState(true);
  // Check if username is valid
  useEffect(() => {
    if (username.trim().length === 0 && !isFirstRender) {
      setUsernameError("Username cannot be empty.");
    } else if (username.length > maxUsernameLength) {
      setUsernameError(`Must be ${maxUsernameLength} characters or fewer`);
    } else {
      setUsernameError("");
    }
    setIsFirstRender(false);
  }, [username]);
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
              <View
                style={{
                  marginTop: 30,
                  marginBottom: 10,
                  flexDirection: "row",
                }}
              >
                <Text style={styles.username}>Username</Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
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
                  style={[
                    fonts.body2,
                    {
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingHorizontal: 15,
                      backgroundColor: "#F4F4F4",
                      borderRadius: 10,
                      marginBottom: 8,
                      width: "100%",
                      height: 40,
                    },
                  ]}
                  placeholderTextColor={"#707070"}
                />
                {usernameError && (
                  <Text style={[fonts.subtitle, { color: Colors.errorState }]}>
                    {usernameError}
                  </Text>
                )}
              </View>
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
                style={[
                  fonts.body2,
                  {
                    paddingTop: 12,
                    paddingBottom: 12,
                    paddingHorizontal: 15,
                    backgroundColor: "#F4F4F4",
                    borderRadius: 10,
                    minHeight: 100,
                    textAlignVertical: "top",
                    maxHeight: 160,
                    width: "100%",
                    paddingVertical: 10,
                    fontSize: 18,
                    marginBottom: 24,
                  },
                ]}
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginStart: 24,
            }}
          >
            <ToggleButton
              isToggled={agreedToEula}
              setIsToggled={setAgreedToEula}
            />
            <View style={{ width: 16 }} />
            <Text style={fonts.Title4}>I agree to Resell’s </Text>
            <TouchableOpacity
              onPress={() => {
                // TODO
                console.log("Open EULA");
              }}
            >
              <Text
                style={[
                  fonts.Title4,
                  { color: Colors.linkBlue, textDecorationLine: "underline" },
                ]}
              >
                End User License Agreement
              </Text>
            </TouchableOpacity>
          </View>
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
              enabled={
                !Boolean(usernameError) &&
                username.trim().length > 0 &&
                agreedToEula
              }
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
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
  },

  profilePic: {
    height: 132,
    width: 132,
    marginTop: 30,
    borderRadius: 66,
  },
  username: {
    fontSize: 18,
    fontFamily: "Rubik-Medium",
  },

  bio: {
    marginBottom: 10,
    marginTop: 30,
    fontSize: 18,
    fontFamily: "Rubik-Medium",
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
