import React, { useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import BackButton from "../assets/svg-components/back_button";
import { menuBarTop } from "../constants/Layout";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { pressedOpacity } from "../constants/Values";
import { useHeaderHeight } from "@react-navigation/elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { json } from "stream/consumers";
import { ScrollView } from "react-native-gesture-handler";
import { platform } from "os";
import { auth } from "../config/firebase";

export default function EditProfileScreen({ navigation, route }) {
  const {
    initialRealname,
    initialUsername,
    initialBio,
    initialNetId,
    initialVenmo,
    initialImage,
  } = route.params;
  console.log(initialImage);
  const [image, setImage] = useState(initialImage);
  const [onEdit, setOnEdit] = useState(false);
  const [bio, setBio] = useState(initialBio);

  const [username, setUsername] = useState(initialUsername);
  console.log(image);
  const [venmo, setVenmo] = useState(initialVenmo);

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
  const [accessToken, setAccessToken] = useState("");
  const [invalidName, setInvalidName] = useState(false);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setOnEdit(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  AsyncStorage.getItem("accessToken", (errs, result) => {
    if (!errs) {
      if (result !== null) {
        setAccessToken(result);
      }
    }
  });

  const submit = async () => {
    console.log("ok");
    try {
      var Json;
      if (image.startsWith("https")) {
        Json = JSON.stringify({
          photoUrlBase64: "",
          username: username,
          venmoHandle: venmo,
          bio: bio,
        });
      } else {
        Json = JSON.stringify({
          photoUrlBase64: image,
          username: username,
          venmoHandle: venmo,
          bio: bio,
        });
      }

      // console.log(Json);
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/user/",
        {
          method: "POST",
          headers: {
            Authorization: accessToken,

            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: Json,
        }
      )
        .then(function (response) {
          // alert(JSON.stringify(response));
          console.log(response);
          navigation.goBack();
          return response.json();
        })
        .then(async function (data) {
          auth.currentUser
            .updateProfile({
              displayName: data.user.givenName + " " + data.user.familyName,
              photoURL: data.user.photoUrl,
            })
            .then(() => {
              // Profile updated!
              // ...
            })
            .catch((error) => {
              // An error occurred
              // ...
              alert(error);
            });
        })
        .catch((error) => {
          //alert(error.message);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setOnEdit(false);
        Keyboard.dismiss();
      }}
    >
      <KeyboardAvoidingView
        style={[
          styles.container,
          Platform.OS === "ios" ? { paddingTop: 40 } : undefined,
        ]}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {!onEdit && (
          <View
            style={{
              width: "100%",
              backgroundColor: "#FFFFFF",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <BackButton color="black" />
            </TouchableOpacity>
            <View style={styles.title}>
              <Text style={styles.titleText}>Edit Profile</Text>
            </View>
            <TouchableOpacity
              onPress={() => submit()}
              style={styles.headerButton}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}

        <View>
          <Image style={styles.profilePic} source={{ uri: image }} />
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

        <View style={{ width: "100%", marginTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 30,
              minHeight: 30,
            }}
          >
            <Text style={styles.text}>Name</Text>
            <Text style={styles.content}>{initialRealname}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 30,
              minHeight: 30,
            }}
          >
            <Text style={styles.text}>Netid</Text>
            <Text style={styles.content}>{initialNetId}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.text}>Username</Text>
              {invalidName && (
                <View
                  style={{
                    width: 16,
                    height: 16,
                    backgroundColor: "#FF0000",
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 3,
                    marginLeft: 4,
                  }}
                >
                  <Text style={{ color: "#FFFFFF", fontWeight: "500" }}>!</Text>
                </View>
              )}
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-end",
                width: "40%",
                marginEnd: 20,
              }}
            >
              <TextInput
                style={styles.text_input}
                onFocus={() => {
                  setOnEdit(false);
                }}
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  setInvalidName(false);
                }}
              />
              {invalidName && (
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Rubik-Regular",
                    color: "#FF0000",
                    marginTop: 4,
                  }}
                >
                  Name Unavailable
                </Text>
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            <Text style={styles.text}>Venmo Link</Text>
            <View
              style={{ flexDirection: "column", width: "40%", marginEnd: 20 }}
            >
              <TextInput
                onFocus={() => setOnEdit(false)}
                style={styles.text_input}
                value={venmo}
                onChangeText={(text) => setVenmo(text)}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text}>Bio</Text>
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-end",
                width: "70%",
                marginEnd: 20,
                marginBottom: 50,
              }}
            >
              <TextInput
                style={[
                  styles.text_input,
                  {
                    textAlign: "left",
                    textAlignVertical: "top",
                    maxHeight: 100,
                  },
                ]}
                onFocus={() => {
                  setOnEdit(true);
                }}
                numberOfLines={4}
                multiline={true}
                maxLength={200}
                value={bio}
                onChangeText={(text) => {
                  setBio(text);
                }}
              />
              {/* {false && (
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Rubik-Regular",
                  color: "#FF0000",
                  marginTop: 4,
                }}
              >
                Cannot be empty
              </Text>
            )} */}
              {bio.length > 0 && (
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Rubik-Regular",
                    color: "#707070",
                    marginTop: 4,
                  }}
                >
                  {bio.length}/200
                </Text>
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    marginBottom: 50,
  },
  backButton: {
    margin: 20,
    zIndex: 1,
    width: 20,
    height: 30,
  },
  title: {
    marginTop: 20,
    alignItems: "center",
  },
  titleText: {
    fontFamily: "Rubik-Medium",
    fontSize: 18,
  },
  headerButton: {
    margin: 20,
  },
  buttonText: {
    color: "#9E70F6",
    fontFamily: "Rubik-Medium",
    fontSize: 16,
  },
  feedbackInstructions: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    marginTop: menuBarTop + 50,
    marginHorizontal: 20,
    textAlign: "center",
  },
  feedbackText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    backgroundColor: "#F4F4F4",
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    height: 190,
    padding: 10,
    textAlignVertical: "top",
  },
  sectionTitle: {
    fontFamily: "Rubik-Medium",
    fontSize: 16,
    marginTop: 20,
    marginHorizontal: 20,
  },
  fab: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  chosenImage: {
    width: 300,
    height: 200,
    borderRadius: 20,
  },
  imageUploadWrapper: {
    paddingTop: 10,
    alignItems: "center",
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
  profilePic: {
    height: 132,
    width: 132,
    borderRadius: 66,
  },
  text: {
    fontSize: 18,
    marginStart: 20,
    fontFamily: "Rubik-Medium",
  },
  content: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: 18,
    marginEnd: 20,
  },
  text_input: {
    backgroundColor: "#F4F4F4",
    borderRadius: 10,
    padding: 10,
    minHeight: 40,
    fontSize: 18,
    fontFamily: "Rubik-Regular",
    width: "100%",
    textAlign: "right",
    paddingTop: 10,
  },
});
